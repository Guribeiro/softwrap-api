import IEmailTemplateProviderDTO from '../dtos/IEmailTemplateProviderDTO';

export default interface IEmailTemplateProvider {
  parse(data: IEmailTemplateProviderDTO): Promise<string>;
}
