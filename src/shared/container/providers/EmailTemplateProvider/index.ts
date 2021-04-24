import { container } from 'tsyringe';

import IMailTemplateProvider from './models/IEmailTemplateProvider';
import HandlebarsEmailTemplateProvider from './implementations/HandleBarsEmailTemplateProvider';

const providers = {
  handlebars: HandlebarsEmailTemplateProvider,
};

container.registerSingleton<IMailTemplateProvider>(
  'MailTemplateProvider',
  providers.handlebars,
);
