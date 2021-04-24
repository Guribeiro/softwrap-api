import {getRepository, Repository} from 'typeorm';
import Admin from '@modules/admin/infra/typeorm/entities/Admin';
import IAdminsRepository from '@modules/admin/infra/repositories/IAdminsRepository';

import ICreateAdminDTO from '../../../dtos/ICreateAdminDTO';

class AdminsRepository implements IAdminsRepository{

  private ormRepository: Repository<Admin>;
  constructor(){
    this.ormRepository = getRepository(Admin);
  }

  public async findByEmail(email: string): Promise<Admin | undefined>{
    const admin = await this.ormRepository.findOne({where: {email}})

    return admin;
  }

  public async create({name, email, password}:ICreateAdminDTO):Promise<Admin>{
    const admin = this.ormRepository.create({
      name,
      email,
      password
    });

    await this.ormRepository.save(admin);

    return admin;
  }
}

export default AdminsRepository;
