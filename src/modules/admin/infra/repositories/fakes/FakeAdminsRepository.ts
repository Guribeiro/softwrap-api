import {v4} from 'uuid';
import Admin from '@modules/admin/infra/typeorm/entities/Admin';
import IAdminsRepository from '@modules/admin/infra/repositories/IAdminsRepository';

import ICreateAdminDTO from '../../../dtos/ICreateAdminDTO';

interface ICreateAdminFakeDTO{
  id: string;
  name: string;
  email: string;
  password: string;
}

class AdminsRepository implements IAdminsRepository{
  private admins: Admin[] = [];

  public async findByEmail(email: string): Promise<Admin | undefined>{
    const findAdmin = this.admins.find(admin => admin.email === email);
    return findAdmin;
  }

  public async create({name, email, password}:ICreateAdminDTO):Promise<Admin>{
    const admin = new Admin();

    Object.assign<Admin,ICreateAdminFakeDTO>(admin, {
      id: v4(),
      name,
      email,
      password
    })

    this.admins.push(admin);

    return admin;
  }
}

export default AdminsRepository;
