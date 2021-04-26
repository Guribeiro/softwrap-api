import { inject, injectable } from 'tsyringe';
import path from 'path';

import IAdminsRepository from '@modules/admin/infra/repositories/IAdminsRepository';
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import AppError from '@shared/errors/AppError';
import IAdminTokenRepository from '../infra/repositories/IAdminsTokenRepository';

interface Request{
  email: string
}

@injectable()
class SendForgotPasswordEmail{
  constructor(
    @inject('AdminsRepository')
    private adminsRepository: IAdminsRepository,

    @inject('MailProvider')
    private mailProvider: IMailProvider,

    @inject('AdminTokensRepository')
    private adminTokenRepository: IAdminTokenRepository,
  ) { }

  public async execute({email}:Request):Promise<void>{

    const admin = await this.adminsRepository.findByEmail(email);

    if(!admin) throw new AppError('user does not exist');

    const {token} = await this.adminTokenRepository.generate(admin.id);

    const forgotEmailPasswordTemplate = path.resolve(
      __dirname,
      '..',
      'views',
      'forgot_password.hbs',
    );

    await this.mailProvider.sendMail({
      to: {
        name: admin.name,
        email: admin.email
      },
      subject: '[Softwrap] - Recuperação de senha',
      templateData: {
        file: forgotEmailPasswordTemplate,
        variables: {
          name: admin.name,
          link: `${process.env.APP_WEB_URL}/reset-password?token=${token}`
        }
      }

    });
  }
}


export default SendForgotPasswordEmail;
