import nodemailer, { Transporter } from 'nodemailer';
import { inject, injectable } from 'tsyringe';
import ISendEmailProviderDTO from '../dtos/ISendEmailProviderDTO';
import IMailProvider from '../models/IMailProvider';
import IMailTemplateProvider from '../../EmailTemplateProvider/models/IEmailTemplateProvider';


@injectable()
export default class EtherealMailProvider implements IMailProvider {
  private client: Transporter;

  constructor(
    @inject('MailTemplateProvider')
    private mailTemplateProvider: IMailTemplateProvider,
  ) {
    nodemailer.createTestAccount().then(account => {
      const transporter = nodemailer.createTransport({
        host: account.smtp.host,
        port: account.smtp.port,
        secure: account.smtp.secure,
        auth: {
          user: account.user,
          pass: account.pass
        },
      });

      this.client = transporter;
    })
  }

  public async sendMail({from, to, subject, templateData}: ISendEmailProviderDTO): Promise<void> {
    const message = await this.client.sendMail({
      from: {
        name: from?.name || 'Equipe Sofwrap',
        address: from?.email || 'softwrap@contato.com'
      },
      to: {
        name: to.name,
        address: to.email
      },
      subject,
      html: await this.mailTemplateProvider.parse(templateData),
    });

    console.log('Message sent: %s', message.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message));
  }

}
