import { injectable, inject } from 'tsyringe';
import Customer from '@modules/customer/infra/typeorm/entities/Customer';
import AppError from '@shared/errors/AppError';
import ICustomersRepository from '../infra/repositories/ICustomersRepository';

interface Request {
  name: string;
  age: number;
  marital_status: string;
  cpf: string;
  city: string;
  state: string;
}

@injectable()
class CreateCustomerService {
  constructor(
    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository
  ) { }

  public async execute({ name, age, marital_status, cpf, city, state }: Request): Promise<Customer> {

    const findCustomer = await this.customersRepository.findByCpf(cpf);

    if (findCustomer) throw new AppError('cpf is already registered');

    const customer = await this.customersRepository.create({
      name,
      age,
      marital_status,
      cpf,
      city,
      state
    });

    return customer

  }
}

export default CreateCustomerService;
