interface ITemplateVariables {
  [key: string]: string;
}

export default interface IEmailTemplateProviderDTO {
  file: string;
  variables: ITemplateVariables;
}
