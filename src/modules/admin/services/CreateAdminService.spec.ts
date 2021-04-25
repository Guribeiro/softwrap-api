import FakeAdminsRepository from '../infra/repositories/fakes/FakeAdminsRepository';
import CreateAdminService from './CreateAdminService';
import AppError from '@shared/errors/AppError';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

let fakeAdminsRepository: FakeAdminsRepository;
let createAdminService: CreateAdminService;
let hashProvider: FakeHashProvider;

describe('CreateAdmin', () =>{
    beforeEach(() =>{
      fakeAdminsRepository= new FakeAdminsRepository();
      hashProvider = new FakeHashProvider();

      createAdminService = new CreateAdminService(
        fakeAdminsRepository,
        hashProvider
      );
    })

    it('should be able to create a new Admin user', async () =>{
      const admin = await createAdminService.execute({
        name: 'Admin-name',
        email: 'admin@gmail.com',
        password: 'admin-password'
      });

      expect(admin).toHaveProperty('id')
    });

    it('should not be able to create a admin with email already registered', async () =>{
      const admin = await fakeAdminsRepository.create({
        name: 'Admin-name',
        email: 'admin@gmail.com',
        password: 'admin-password'
      });

      await expect(
        createAdminService.execute({
          name: 'admin-name',
          email: 'admin@gmail.com',
          password: 'admin-password'
        }),
      ).rejects.toBeInstanceOf(AppError);
    })
})
