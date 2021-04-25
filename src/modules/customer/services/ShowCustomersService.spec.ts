import FakeCustomersRepository from '../infra/repositories/fakes/FakeCustomersRepository';
import ShowCustomerService from './ShowCustomerService';
import AppError from '@shared/errors/AppError';

let fakeCustomersRepository: FakeCustomersRepository;
let showCustomerService: ShowCustomerService;

describe('CreateCustomer', () => {
  beforeEach(() => {
    fakeCustomersRepository = new FakeCustomersRepository();

    showCustomerService = new ShowCustomerService(
      fakeCustomersRepository
    );
  })

  it('should be able to create a new customer', async () => {

    const customer = await fakeCustomersRepository.create({
      name: 'customer-name',
      age: 24,
      marital_status: 'single',
      cpf: '99999999999',
      city: 'city',
      state: 'state'
    });

    const findCustomer = await showCustomerService.execute({
     id: customer.id
    });

    expect(findCustomer).toEqual(customer);
    expect(findCustomer.id).toBe(customer.id);
  });

  it('should not be able to search for a user by a nonexistent id', async () =>{
    await expect(
      showCustomerService.execute({
        id: 'invalid-id'
      }),
    ).rejects.toBeInstanceOf(AppError);
  })
})
