import { container } from 'tsyringe';

import IAdminsRepository from '@modules/admin/infra/repositories/IAdminsRepository';
import AdminsRepository from '@modules/admin/infra/typeorm/repositories/AdminsRepository';

import ICustomersRepository from '@modules/customer/infra/repositories/ICustomersRepository';
import CustomersRepository from '@modules/customer/infra/typeorm/repositories/CustomersRepository';

container.registerSingleton<ICustomersRepository>(
  'CustomersRepository',
  CustomersRepository
)

container.registerSingleton<IAdminsRepository>(
  'AdminsRepository',
  AdminsRepository
)

