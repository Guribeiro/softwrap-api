import { inject, injectable } from 'tsyringe';
import Admin from '@modules/admin/infra/typeorm/entities/Admin';
import IAdminsRepository from '@modules/admin/infra/repositories/IAdminsRepository';
import AppError from '@shared/errors/AppError';
import { hash } from 'bcryptjs';

interface Request {
  name: string;
  email: string;
  password: string;
}

@injectable()
class CreateAdminService {
  constructor(
    @inject('AdminsRepository')
    private adminsRepository: IAdminsRepository
  ) { }

  public async execute({ name, email, password }: Request): Promise<Admin> {
    const findAdmin = await this.adminsRepository.findByEmail(email);

    if (findAdmin) {
      throw new AppError('Email is already been used by another admin');
    }

    const hashedPassword = await hash(password, 8);

    const admin = await this.adminsRepository.create({
      name,
      email,
      password: hashedPassword,
    });
    return admin;
  }
}


export default CreateAdminService;
