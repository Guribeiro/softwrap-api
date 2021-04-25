import { injectable, inject } from 'tsyringe';
import Customer from '@modules/customer/infra/typeorm/entities/Customer';
import AppError from '@shared/errors/AppError';
import ICustomersRepository from '../infra/repositories/ICustomersRepository';
import IAdminsRepository from '@modules/admin/infra/repositories/IAdminsRepository';

interface Request {
  admin_id: string;
  customer_id: string;
  name: string;
  age: number;
  marital_status: string;
  cpf: string;
  city: string;
  state: string;
}

interface IUpdateCustomerFields{
  name: string;
  age: number;
  marital_status: string;
  cpf: string;
  city: string;
  state: string;
}

@injectable()
class UpdateCustomerService {
  constructor(
    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository,

    @inject('AdminsRepository')
    private adminsRepository: IAdminsRepository,
  ) { }

  public async execute({ admin_id, customer_id, name, age, marital_status, cpf, city, state }: Request): Promise<Customer> {

    const admin = await this.adminsRepository.findById(admin_id);

    if(!admin) throw new AppError('you do not have permission to do it');

    const customer = await this.customersRepository.findById(customer_id);

    if(!customer) throw new AppError('user does not exist');

    const findCustomerWithSameCpf = await this.customersRepository.findByCpf(cpf);

    if (findCustomerWithSameCpf && findCustomerWithSameCpf.id !== customer_id ) {
      throw new AppError('cpf is already registered');
    }

    Object.assign<Customer, IUpdateCustomerFields>(customer, {
      name,
      age,
      marital_status,
      cpf,
      city,
      state
    });

    return this.customersRepository.save(customer);

  }
}

export default UpdateCustomerService;
