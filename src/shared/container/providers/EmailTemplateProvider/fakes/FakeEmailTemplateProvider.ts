import IEmailTemplateProvider from '../models/IEmailTemplateProvider';

export default class FakeEmailTemplateProvider
  implements IEmailTemplateProvider {
  public async parse(): Promise<string> {
    return 'template content';
  }
}
