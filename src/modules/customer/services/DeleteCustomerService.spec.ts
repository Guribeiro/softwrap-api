import FakeCustomersRepository from '../infra/repositories/fakes/FakeCustomersRepository';
import DeleteCustomerService from './DeleteCustomerService';
import AppError from '@shared/errors/AppError';

let fakeCustomersRepository: FakeCustomersRepository;
let deleteCustomerService: DeleteCustomerService;

describe('DeleteCustomer', () => {
  beforeEach(() => {
    fakeCustomersRepository = new FakeCustomersRepository();

    deleteCustomerService = new DeleteCustomerService(
      fakeCustomersRepository
    );
  })

  it('should be able to delete a customer', async () => {

    const deleteCustomer = jest.spyOn(fakeCustomersRepository, 'delete');

    const customer = await fakeCustomersRepository.create({
      name: 'customer-name',
      age: 24,
      marital_status: 'single',
      cpf: '99999999999',
      city: 'city',
      state: 'state'
    });
    await deleteCustomerService.execute(customer);

    expect(deleteCustomer).toHaveBeenCalledWith(customer);
  });
})
