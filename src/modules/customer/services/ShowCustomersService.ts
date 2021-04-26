import { injectable, inject } from 'tsyringe';
import Customer from '@modules/customer/infra/typeorm/entities/Customer';
import AppError from '@shared/errors/AppError';
import ICustomersRepository from '../infra/repositories/ICustomersRepository';

interface Request {
  id: string;
}


@injectable()
class ShowCustomerService {
  constructor(
    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository
  ) { }

  public async execute({ id }: Request): Promise<Customer> {
    const customer = await this.customersRepository.findById(id);

    if(!customer) throw new AppError('user does not exist');

    return customer;
  }
}

export default ShowCustomerService;
