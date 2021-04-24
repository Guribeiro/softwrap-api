import { inject, injectable } from 'tsyringe';
import { isAfter, addHours } from 'date-fns';
import Admin from '@modules/admin/infra/typeorm/entities/Admin';
import IAdminsRepository from '@modules/admin/infra/repositories/IAdminsRepository';
import AppError from '@shared/errors/AppError';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';
import IAdminTokenRepository from '../infra/repositories/IAdminsTokenRepository';

interface Request {
  token: string;
  password: string;
}

@injectable()
class ResetPasswordService {
  constructor(
    @inject('AdminsRepository')
    private adminsRepository: IAdminsRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,

    @inject('AdminTokensRepository')
    private adminTokenRepository: IAdminTokenRepository,
  ) { }

  public async execute({ token,  password }: Request): Promise<Admin> {

    const adminToken = await this.adminTokenRepository.findByToken(token);

    if(!adminToken) throw new AppError('user token does not exist');

    const admin = await this.adminsRepository.findById(adminToken.admin_id);

    if(!admin) throw new AppError('user Admin not found');

    const compareDate = addHours(adminToken.created_at, 2);

    if (isAfter(Date.now(), compareDate)) {
      throw new AppError('token expired');
    }

    admin.password = await this.hashProvider.generateHash(password);
    await this.adminsRepository.save(admin);

    return admin;
  }
}


export default ResetPasswordService;
