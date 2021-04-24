import AdminToken from '../typeorm/entities/AdminToken';

export default interface IAdminTokenRepository {
  generate(admin_id: string): Promise<AdminToken>;
  findByToken(token: string): Promise<AdminToken | undefined>;
}
