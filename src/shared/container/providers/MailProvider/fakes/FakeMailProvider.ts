import IMailProvider from '../models/IMailProvider';
import ISendEmailProviderDTO from '../dtos/ISendEmailProviderDTO';



export default class FakeMailProvider implements IMailProvider{
  private messages:ISendEmailProviderDTO[] = [];

  public async sendMail(message:ISendEmailProviderDTO): Promise<void>{
    this.messages.push(message);
  }

}
