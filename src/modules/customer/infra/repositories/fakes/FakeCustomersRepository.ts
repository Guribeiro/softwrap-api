import {v4} from 'uuid';
import Customer from '@modules/customer/infra/typeorm/entities/Customer';

import ICustomersRepository from '@modules/customer/infra/repositories/ICustomersRepository';
import ICreateCustomerDTO from '@modules/customer/dtos/ICreateCustomerDTO';

interface CreateCustomerFakeDTO{
  id: string;
  name: string;
  age: number;
  marital_status: string;
  cpf: string;
  city: string;
  state: string;
}

class CustomersRepository implements ICustomersRepository{

  private customers:Customer[] = [];

  public async create({name, age, marital_status, cpf, city, state}: ICreateCustomerDTO): Promise<Customer> {
    const customer = new Customer();

    Object.assign<Customer, CreateCustomerFakeDTO>(customer, {
      id: v4(),
      name,
      age,
      marital_status,
      cpf,
      city,
      state
    })

    this.customers.push(customer);
    return customer;
  }

  public async index():Promise<Customer[]>{
    return this.customers;
  }

  public async findByCpf(cpf: string):Promise<Customer | undefined>{
    const customer = this.customers.find(c => c.cpf === cpf);
    return customer
  }

  public async findById(id: string):Promise<Customer | undefined>{
    const customer = this.customers.find(c => c.id === id);
    return customer
  }

  public async save(customer: Customer): Promise<Customer> {
    const findIndex = this.customers.findIndex(findCustomer => findCustomer.id === customer.id);

    this.customers[findIndex] = customer;

    return customer;
  }

  public async delete(customer:Customer):Promise<void>{
    const findIndex = this.customers.findIndex(
      findCustomer => findCustomer === customer,
    );

    this.customers.splice(findIndex, 1);
  }

}

export default CustomersRepository;
