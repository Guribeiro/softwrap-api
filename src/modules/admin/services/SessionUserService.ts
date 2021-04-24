import { sign } from 'jsonwebtoken';
import { compare } from 'bcryptjs';
import { injectable, inject } from 'tsyringe';
import Admin from '@modules/admin/infra/typeorm/entities/Admin';
import AuthConfig from '@config/auth';
import AppError from '@shared/errors/AppError';
import IAdminsRepository from '@modules/admin/infra/repositories/IAdminsRepository';

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
    private adminsRepository: IAdminsRepository
  ) { }

  public async execute({ email, password }: Request): Promise<Response> {

    const admin = await this.adminsRepository.findByEmail(email);

    if (!admin) throw new AppError('invalid credentials');

    const matchedPassword = await compare(password, admin.password);

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
