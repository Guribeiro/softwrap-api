import FakeCustomersRepository from '../infra/repositories/fakes/FakeCustomersRepository';
import ListCustomersService from './ListCustomersService';
import AppError from '@shared/errors/AppError';

let fakeCustomersRepository: FakeCustomersRepository;
let listCustomersService: ListCustomersService;

describe('CreateCustomer', () => {
  beforeEach(() => {
    fakeCustomersRepository = new FakeCustomersRepository();

    listCustomersService = new ListCustomersService(
      fakeCustomersRepository
    );
  })

  it('should be able to create a new customer', async () => {

    const first_customer = await fakeCustomersRepository.create({
      name: 'first-customer-name',
      age: 24,
      marital_status: 'single',
      cpf: '99999999999',
      city: 'city',
      state: 'state'
    });

    const second_customer = await fakeCustomersRepository.create({
      name: 'second-customer-name',
      age: 24,
      marital_status: 'single',
      cpf: '88888888888',
      city: 'city',
      state: 'state'
    });

    const customers = await listCustomersService.execute({
      page: 1,
      take: 2
    });

    expect(customers).toEqual([first_customer, second_customer]);

  });
})
