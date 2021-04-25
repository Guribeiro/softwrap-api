import { inject, injectable } from 'tsyringe';
import Admin from '@modules/admin/infra/typeorm/entities/Admin';
import IAdminsRepository from '@modules/admin/infra/repositories/IAdminsRepository';
import AppError from '@shared/errors/AppError';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

interface Request {
  name: string;
  email: string;
  password: string;
}

@injectable()
class CreateAdminService {
  constructor(
    @inject('AdminsRepository')
    private adminsRepository: IAdminsRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) { }

  public async execute({ name, email, password }: Request): Promise<Admin> {
    const findAdmin = await this.adminsRepository.findByEmail(email);

    if (findAdmin) {
      throw new AppError('Email is already been used by another admin');
    }

    const hashedPassword = await this.hashProvider.generateHash(password)

    const admin = await this.adminsRepository.create({
      name,
      email,
      password: hashedPassword,
    });
    return admin;
  }
}


export default CreateAdminService;
