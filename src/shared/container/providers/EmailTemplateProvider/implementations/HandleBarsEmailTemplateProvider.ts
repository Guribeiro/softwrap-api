import handlebars from 'handlebars';
import fs from 'fs';
import IEmailTemplateProvider from '../models/IEmailTemplateProvider';
import IEmailTemplateProviderDTO from '../dtos/IEmailTemplateProviderDTO';

export default class HandlebarsEmailTemplateProvider
  implements IEmailTemplateProvider {
  public async parse({
    file,
    variables,
  }: IEmailTemplateProviderDTO): Promise<string> {
    const templateFileContent = await fs.promises.readFile(file, {
      encoding: 'utf-8',
    });
    const parseTemplate = handlebars.compile(templateFileContent);
    return parseTemplate(variables);
  }
}
