import SessionUserService from '@modules/admin/services/SessionUserService';
import {Request, Response} from 'express';
import { container } from 'tsyringe';

export default class SessionsController {
  public async create(request:Request, response:Response):Promise<Response>{
    try {
      const { email, password } = request.body;

      const sessionUserService = container.resolve(SessionUserService);

      const { admin, token } = await sessionUserService.execute({
        email,
        password
      })

      return response.json({admin, token})
    } catch (error) {
      return response.json({ error: error.message })
    }
  }
}
