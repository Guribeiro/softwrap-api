import IMailTemplateProviderDTO from '@shared/container/providers/EmailTemplateProvider/dtos/IEmailTemplateProviderDTO';

interface IMailContact {
  name: string;
  email: string;
}

export default interface ISendEmailProviderDTO {
  to: IMailContact;
  from?: IMailContact;
  subject: string;
  templateData: IMailTemplateProviderDTO;
}
