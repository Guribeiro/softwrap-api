import Admin from '@modules/admin/infra/typeorm/entities/Admin';

import ICreateAdminDTO from '../../dtos/ICreateAdminDTO';

export default interface IAdminRepository{
  findByEmail(email: string):Promise<Admin | undefined>;
  create(data: ICreateAdminDTO):Promise<Admin>;
  findById(id: string):Promise<Admin | undefined>;
  save(admin: Admin):Promise<Admin>;
}
