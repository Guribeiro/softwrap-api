import FakeAdminsRepository from '../infra/repositories/fakes/FakeAdminsRepository';
import SendForgotPasswordEmail from './SendForgotPasswordEmail';
import AppError from '@shared/errors/AppError';
import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import FakeAdminTokenRepository from '../infra/repositories/fakes/FakeAdminsTokenRepository';

let fakeAdminsRepository: FakeAdminsRepository;
let fakeMailProvider: FakeMailProvider;
let fakeAdminTokenRepository : FakeAdminTokenRepository;

let sendForgotPasswordEmail: SendForgotPasswordEmail;

describe('CreateAdmin', () =>{
    beforeEach(() =>{
      fakeAdminsRepository= new FakeAdminsRepository();
      fakeMailProvider = new FakeMailProvider();
      fakeAdminTokenRepository = new FakeAdminTokenRepository();

      sendForgotPasswordEmail = new SendForgotPasswordEmail(
        fakeAdminsRepository,
        fakeMailProvider,
        fakeAdminTokenRepository,
      );
    })

    it('should be send an forgot email', async () =>{

      const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

      const admin = await fakeAdminsRepository.create({
        name: 'user-name',
        email: 'admin@gmail.com',
        password: 'password',
      })

      await sendForgotPasswordEmail.execute({
        email: admin.email
      })

      expect(sendMail).toHaveBeenCalled();
    });

    it('should not be able to send an email to a nonexiste admin user', async () =>{
      await expect(
        sendForgotPasswordEmail.execute({
          email: 'invalid-email'
        }),
      ).rejects.toBeInstanceOf(AppError);
    })
    it('should generate a forgot admin password token', async () =>{
     const generate = jest.spyOn(fakeAdminTokenRepository, 'generate');

    const admin = await fakeAdminsRepository.create({
      name: 'admin-name',
      email: 'admin@gmail.com',
      password: 'password',
    });

    await fakeAdminTokenRepository.generate(admin.id);

    expect(generate).toHaveBeenCalledWith(admin.id);
    })

})
