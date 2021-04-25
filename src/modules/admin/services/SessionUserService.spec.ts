import FakeAdminsRepository from '../infra/repositories/fakes/FakeAdminsRepository';
import SessionUserService from './SessionUserService';
import AppError from '@shared/errors/AppError';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

let fakeAdminsRepository: FakeAdminsRepository;
let sessionUserService: SessionUserService;
let hashProvider: FakeHashProvider;

describe('SessionUser', () =>{
  beforeEach(() =>{
    fakeAdminsRepository= new FakeAdminsRepository();
    hashProvider = new FakeHashProvider();

    sessionUserService = new SessionUserService(
      fakeAdminsRepository,
      hashProvider
    );
  })

  it('should be able to create a session', async () => {
    const admin = await fakeAdminsRepository.create({
      name: 'user-name',
      email: 'user@email.com',
      password: 'password',
    });

    const response = await sessionUserService.execute({
      email: 'user@email.com',
      password: 'password',
    });

    expect(response).toHaveProperty('token');
    expect(response.admin).toEqual(admin);
  });

  it('should not be able to create a session with a non existing user', async () => {
    await expect(
      sessionUserService.execute({
        email: 'invalid-email',
        password: 'invalid-password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a session with invalid credentials', async () => {
    const admin = await fakeAdminsRepository.create({
      email: 'admin@gmail.com',
      name: 'admin-name',
      password: 'password',
    });

    await expect(
      sessionUserService.execute({
        email: admin.email,
        password: 'invalid-password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
