import ResetPasswordService from '@modules/admin/services/ResetPasswordService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class ResetPasswordServiceController {
  public async create(request: Request, response: Response): Promise<Response> {
    try {
      const { token, password } = request.body;

      const resetPasswordService = container.resolve(ResetPasswordService);

      const admin = await resetPasswordService.execute({
        token,
        password
      })

      return response.status(204).json(admin);
    } catch (error) {
      return response.status(400).json({ error: error.message })
    }
  }
}
