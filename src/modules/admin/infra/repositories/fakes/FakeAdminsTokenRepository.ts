import { v4 } from 'uuid';

import AdminToken from '@modules/admin/infra/typeorm/entities/AdminToken';
import IAdminTokenRepository from '@modules/admin/infra/repositories/IAdminsTokenRepository';

interface ICreateAdminTokenFakeDTO {
  id: string;
  token: string;
  admin_id: string;
  created_at: Date;
  updated_at: Date;
}

class FakeAdminTokenRepository implements IAdminTokenRepository {
  private adminTokens: AdminToken[] = [];

  public async generate(admin_id: string): Promise<AdminToken> {
    const adminToken = new AdminToken();

    Object.assign<AdminToken, ICreateAdminTokenFakeDTO>(adminToken, {
      id: v4(),
      token: v4(),
      admin_id,
      created_at: new Date(),
      updated_at: new Date(),
    });

    this.adminTokens.push(adminToken);

    return adminToken;
  }

  public async findByToken(token: string): Promise<AdminToken | undefined> {
    const admin = this.adminTokens.find(adminToken => adminToken.token === token);

    return admin;
  }
}

export default FakeAdminTokenRepository;
