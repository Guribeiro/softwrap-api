import { injectable, inject } from 'tsyringe';
import Customer from '@modules/customer/infra/typeorm/entities/Customer';
import AppError from '@shared/errors/AppError';
import ICustomersRepository from '../infra/repositories/ICustomersRepository';
import IAdminsRepository from '@modules/admin/infra/repositories/IAdminsRepository';

interface Request {
  admin_id: string;
  customer_id: string;
}

@injectable()
class DeleteCustomerService {
  constructor(
    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository,

    @inject('AdminsRepository')
    private adminsRepository: IAdminsRepository,
  ) { }

  public async execute({ admin_id, customer_id }: Request): Promise<void> {

    const admin = await this.adminsRepository.findById(admin_id);

    if(!admin) throw new AppError('you do not have permission to delete a customer')

    const customer = await this.customersRepository.findById(customer_id);

    if (!customer) throw new AppError('customer does not exist');

    await this.customersRepository.delete(customer);
  }
}

export default DeleteCustomerService;
