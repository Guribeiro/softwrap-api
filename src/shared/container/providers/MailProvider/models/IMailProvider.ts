import ISendEmailProviderDTO from "../dtos/ISendEmailProviderDTO";

export default interface IMailProvider{
  sendMail(data: ISendEmailProviderDTO):Promise<void>;
}
