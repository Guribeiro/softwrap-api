import CreateCustomerService from '@modules/customer/services/CreateCustomerService';
import {Request, Response} from 'express';
import { container } from 'tsyringe';

export default class CustomersController {
  public async create(request:Request, response: Response):Promise<Response>{
    try {
      const { name, age, marital_status, cpf, city, state } = request.body;

      const createCustomerService = container.resolve(CreateCustomerService);

      const customer = await createCustomerService.execute({
        name,
        age,
        marital_status,
        cpf,
        city,
        state
      })

      return response.json(customer)
    } catch (error) {
      return response.json({ error: error.message })
    }
  }
}
