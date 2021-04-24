import Customer from '@modules/customer/infra/typeorm/entities/Customer';
import ICreateCustomersDTO from '@modules/customer/dtos/ICreateCustomerDTO';

export default interface ICustomersRepository{
  create(data:ICreateCustomersDTO):Promise<Customer>;
  findByCpf(cpf: string):Promise<Customer | undefined>;
  findById(id: string):Promise<Customer | undefined>;
  save(customer: Customer):Promise<Customer>;
  delete(customer: Customer):Promise<void>;
  index():Promise<Customer[]>
}
