import SendForgotPasswordEmail from '@modules/admin/services/SendForgotPasswordEmail';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class SendForgotPasswordEmailController {
  public async create(request: Request, response: Response): Promise<Response> {
    try {
      const { email } = request.body;

      const sendForgotPasswordEmail = container.resolve(SendForgotPasswordEmail);

      await sendForgotPasswordEmail.execute({
        email,
      })

      return response.status(204).json();
    } catch (error) {
      return response.status(400).json({ error: error.message })
    }
  }
}
