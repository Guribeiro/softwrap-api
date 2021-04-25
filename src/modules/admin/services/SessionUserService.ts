import { sign } from 'jsonwebtoken';
import { injectable, inject } from 'tsyringe';
import Admin from '@modules/admin/infra/typeorm/entities/Admin';
import AuthConfig from '@config/auth';
import AppError from '@shared/errors/AppError';
import IAdminsRepository from '@modules/admin/infra/repositories/IAdminsRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

interface Request {
  email: string;
  password: string;
}

interface Response {
  admin: Admin;
  token: string;
}

@injectable()
class SessionUserService {
  constructor(
    @inject('AdminsRepository')
    private adminsRepository: IAdminsRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) { }

  public async execute({ email, password }: Request): Promise<Response> {

    const admin = await this.adminsRepository.findByEmail(email);

    if (!admin) throw new AppError('invalid credentials');

    const matchedPassword = await this.hashProvider.compareHash(
      password,
      admin.password
    )

    if (!matchedPassword) throw new AppError('invalid credentials');

    const { secret, expiresIn } = AuthConfig.jwt;

    const token = sign({}, secret, {
      subject: admin.id,
      expiresIn
    });

    return {
      admin,
      token
    }
  }
}

export default SessionUserService;
