import { getRepository, Repository } from 'typeorm';

import AdminToken from '@modules/admin/infra/typeorm/entities/AdminToken';
import IAdminsTokenRepository from '@modules/admin/infra/repositories/IAdminsTokenRepository';

class AdminTokensRepository implements IAdminsTokenRepository {
  private ormRepository: Repository<AdminToken>;

  constructor() {
    this.ormRepository = getRepository(AdminToken);
  }

  public async findByToken(token: string): Promise<AdminToken | undefined> {
    const adminToken = await this.ormRepository.findOne({ where: { token } });
    return adminToken;
  }

  public async generate(admin_id: string): Promise<AdminToken> {
    const userToken = this.ormRepository.create({
      admin_id,
    });

    await this.ormRepository.save(userToken);

    return userToken;
  }
}

export default AdminTokensRepository;
