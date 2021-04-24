import FakeAdminsRepository from '../infra/repositories/fakes/FakeAdminsRepository';
import CreateAdminService from './CreateAdminService';
import AppError from '@shared/errors/AppError';

let fakeAdminsRepository: FakeAdminsRepository;
let createAdminService: CreateAdminService;

describe('CreateAdmin', () =>{
    beforeEach(() =>{
      fakeAdminsRepository= new FakeAdminsRepository();

      createAdminService = new CreateAdminService(
        fakeAdminsRepository
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
