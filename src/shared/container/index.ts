import { container } from 'tsyringe';

import '@modules/admin/providers';
import '@shared/container/providers';

import IAdminsRepository from '@modules/admin/infra/repositories/IAdminsRepository';
import AdminsRepository from '@modules/admin/infra/typeorm/repositories/AdminsRepository';

import IAdminsTokenRepository from '@modules/admin/infra/repositories/IAdminsTokenRepository';
import AdminTokensRepository from '@modules/admin/infra/typeorm/repositories/AdminTokensRepository';

import ICustomersRepository from '@modules/customer/infra/repositories/ICustomersRepository';
import CustomersRepository from '@modules/customer/infra/typeorm/repositories/CustomersRepository';

container.registerSingleton<IAdminsRepository>(
  'AdminsRepository',
  AdminsRepository
)

container.registerSingleton<IAdminsTokenRepository>(
  'AdminTokensRepository',
  AdminTokensRepository
)

container.registerSingleton<ICustomersRepository>(
  'CustomersRepository',
  CustomersRepository
)

