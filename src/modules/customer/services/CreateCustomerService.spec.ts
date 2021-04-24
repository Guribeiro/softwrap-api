import FakeCustomersRepository from '../infra/repositories/fakes/FakeCustomersRepository';
import CreateCustomerService from './CreateCustomerService';
import AppError from '@shared/errors/AppError';

let fakeCustomersRepository: FakeCustomersRepository;
let createCustomerService: CreateCustomerService;

describe('CreateCustomer', () => {
  beforeEach(() => {
    fakeCustomersRepository = new FakeCustomersRepository();

    createCustomerService = new CreateCustomerService(
      fakeCustomersRepository
    );
  })

  it('should be able to create a new customer', async () => {
    const customer = await createCustomerService.execute({
      name: 'customer-name',
      age: 24,
      marital_status: 'single',
      cpf: '99999999999',
      city: 'city',
      state: 'state'
    })

    expect(customer).toHaveProperty('id')
  });

  it('should not be able to create a admin with cpf already registered', async () => {
    const customer = await fakeCustomersRepository.create({
      name: 'customer-name',
      age: 24,
      marital_status: 'single',
      cpf: '99999999999',
      city: 'city',
      state: 'state'
    });

    await expect(
      createCustomerService.execute({
        name: 'customer-name',
        age: 24,
        marital_status: 'single',
        cpf: customer.cpf,
        city: 'city',
        state: 'state'
      }),
    ).rejects.toBeInstanceOf(AppError);
  })
})
