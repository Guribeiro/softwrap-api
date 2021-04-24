import { getRepository ,Repository} from 'typeorm';
import Customer from '@modules/customer/infra/typeorm/entities/Customer';

import ICustomersRepository from '@modules/customer/infra/repositories/ICustomersRepository';
import ICreateCustomerDTO from '@modules/customer/dtos/ICreateCustomerDTO';

class CustomersRepository implements ICustomersRepository{
  private ormRepository: Repository<Customer>
  constructor(){
    this.ormRepository = getRepository(Customer);
  }
  public async create({name, age, marital_status, cpf, city, state}: ICreateCustomerDTO): Promise<Customer> {
    const customer = this.ormRepository.create({
      name,
      age,
      marital_status,
      cpf,
      city,
      state
    });

    await this.ormRepository.save(customer);

    return customer;
  }

  public async index():Promise<Customer[]>{
    const customers = await this.ormRepository.find();

    return customers;
  }

  public async findByCpf(cpf: string):Promise<Customer | undefined>{
    const customer = await this.ormRepository.findOne({where: {cpf}})

    return customer
  }

  public async findById(id: string):Promise<Customer | undefined>{
    const customer = await this.ormRepository.findOne({where: {id}})

    return customer
  }

  public async save(customer: Customer): Promise<Customer> {
    return this.ormRepository.save(customer);
  }

  public async delete(customer:Customer):Promise<void>{
    await this.ormRepository.remove(customer);
  }

}

export default CustomersRepository;
