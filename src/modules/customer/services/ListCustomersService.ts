import { injectable, inject } from 'tsyringe';
import Customer from '@modules/customer/infra/typeorm/entities/Customer';
import AppError from '@shared/errors/AppError';
import ICustomersRepository from '../infra/repositories/ICustomersRepository';


interface Request{
  take: number;
  page: number;
}

@injectable()
class ListCustomersService {
  constructor(
    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository
  ) { }

  public async execute({take, page}:Request): Promise<Customer[]> {
    const customers = await this.customersRepository.index({
      take,
      page
    });
    return customers;

  }
}

export default ListCustomersService;
