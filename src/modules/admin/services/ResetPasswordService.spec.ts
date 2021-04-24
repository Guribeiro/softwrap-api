import FakeAdminsRepository from '../infra/repositories/fakes/FakeAdminsRepository';
import ResetPasswordService from './ResetPasswordService';
import AppError from '@shared/errors/AppError';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeAdminTokenRepository from '../infra/repositories/fakes/FakeAdminsTokenRepository';

let resetPasswordService: ResetPasswordService;

let fakeAdminsRepository: FakeAdminsRepository;
let fakeHashProvider: FakeHashProvider;
let fakeAdminTokenRepository: FakeAdminTokenRepository;

describe('ResetPassword', () =>{
    beforeEach(() =>{
      fakeAdminsRepository= new FakeAdminsRepository();
      fakeHashProvider = new FakeHashProvider();
      fakeAdminTokenRepository = new FakeAdminTokenRepository();

      resetPasswordService = new ResetPasswordService(
        fakeAdminsRepository,
        fakeHashProvider,
        fakeAdminTokenRepository
      );
    })

    it('should be able to reset the password', async () => {
      const admin = await fakeAdminsRepository.create({
        name: 'John Doe',
        email: 'john@gmail.com',
        password: '12345678',
      });

      const { token } = await fakeAdminTokenRepository.generate(admin.id);

      const generateHash = jest.spyOn(fakeHashProvider, 'generateHash');

      await resetPasswordService.execute({
        password: '123123',
        token,
      });

      const updatedUser = await fakeAdminsRepository.findById(admin.id);

      expect(generateHash).toHaveBeenCalledWith('123123');
      expect(updatedUser?.password).toBe('123123');
    });

    it('should not be able to reset the password with non-existing token', async () => {
      await expect(
        resetPasswordService.execute({
          password: '123123',
          token: 'non-existing-token',
        }),
      ).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to reset password with invalid admin user id', async () =>{
      const {token} = await fakeAdminTokenRepository.generate('invalid-id');
      await expect(
        resetPasswordService.execute({
          password: '123123',
          token,
        }),
      ).rejects.toBeInstanceOf(AppError);
    })

    it('should not be able to reset the password in 2 hours since the last reset', async () => {
      const user = await fakeAdminsRepository.create({
        name: 'user-name',
        email: 'admin@gmail.com',
        password: '12345678',
      });

      const { token } = await fakeAdminTokenRepository.generate(user.id);

      jest.spyOn(Date, 'now').mockImplementationOnce(() => {
        const customDate = new Date();

        return customDate.setHours(customDate.getHours() + 3);
      });
      await expect(
        resetPasswordService.execute({
          password: '123123',
          token,
        }),
      ).rejects.toBeInstanceOf(AppError);
    });

})
