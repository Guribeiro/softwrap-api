import CreateAdminService from '@modules/admin/services/CreateAdminService';
import {Request, Response} from 'express';
import { container } from 'tsyringe';

export default class AdminsController {
  public async create(request: Request, response:Response):Promise<Response>{
    try {
      const { name, email, password } = request.body;

      const createAdminService = container.resolve(CreateAdminService);

      const admin = await createAdminService.execute({
        name,
        email,
        password
      })

      return response.json(admin)
    } catch (error) {
      return response.status(400).json({error: error.message})
    }
  }
}
