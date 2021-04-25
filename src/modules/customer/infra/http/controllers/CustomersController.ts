import CreateCustomerService from '@modules/customer/services/CreateCustomerService';
import ListCustomersService from '@modules/customer/services/ListCustomersService';
import ShowCustomerService from '@modules/customer/services/ShowCustomerService';
import UpdateCustomerService from '@modules/customer/services/UpdateCustomerService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class CustomersController {
  public async create(request: Request, response: Response): Promise<Response> {
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

  public async index(request: Request, response: Response): Promise<Response> {
    try {
      const listCustomersService = container.resolve(ListCustomersService);

      const customers = await listCustomersService.execute();

      return response.status(200).json(customers);
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }

  public async show(request: Request, response: Response): Promise<Response> {
    try {
      const { id } = request.params;

      const showCustomerService = container.resolve(ShowCustomerService);

      const customer = await showCustomerService.execute({
        id,
      });

      return response.json(customer);
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }

  public async update(request: Request, response: Response): Promise<Response> {
    try {
      const { id } = request.user;

      const {customer_id} = request.params;

      const {name, age, marital_status, cpf, city, state} = request.body;

      const updateCustomerService = container.resolve(UpdateCustomerService);

      const customer = await updateCustomerService.execute({
        admin_id: id,
        customer_id,
        name,
        age,
        marital_status,
        cpf,
        city,
        state
      });

      return response.json(customer);
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }
}
