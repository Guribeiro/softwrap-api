import { getRepository ,Repository} from 'typeorm';
import Customer from '@modules/customer/infra/typeorm/entities/Customer';

import ICustomersRepository from '@modules/customer/infra/repositories/ICustomersRepository';
import ICreateCustomerDTO from '@modules/customer/dtos/ICreateCustomerDTO';
import IListCustomersDTO from '@modules/customer/dtos/IListCustomersDTO';

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

  public async index({take, page}:IListCustomersDTO ):Promise<Customer[]>{
    const customers = await this.ormRepository.find({take, skip: take * (page - 1)});

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
