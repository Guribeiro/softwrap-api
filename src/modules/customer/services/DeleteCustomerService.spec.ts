import FakeCustomersRepository from '../infra/repositories/fakes/FakeCustomersRepository';
import FakeAdminsRepository from '@modules/admin/infra/repositories/fakes/FakeAdminsRepository';
import DeleteCustomerService from './DeleteCustomerService';
import AppError from '@shared/errors/AppError';

let fakeCustomersRepository: FakeCustomersRepository;
let deleteCustomerService: DeleteCustomerService;
let fakeAdminsRepository: FakeAdminsRepository;

describe('DeleteCustomer', () => {
  beforeEach(() => {
    fakeCustomersRepository = new FakeCustomersRepository();
    fakeAdminsRepository = new FakeAdminsRepository();

    deleteCustomerService = new DeleteCustomerService(
      fakeCustomersRepository,
      fakeAdminsRepository
    );
  })

  it('should be able to delete a customer', async () => {

    const deleteCustomer = jest.spyOn(fakeCustomersRepository, 'delete');

    const admin = await fakeAdminsRepository.create({
      name: 'Admin-name',
      email: 'admin@gmail.com',
      password: 'admin-password'
    });

    const customer = await fakeCustomersRepository.create({
      name: 'customer-name',
      age: 24,
      marital_status: 'single',
      cpf: '99999999999',
      city: 'city',
      state: 'state'
    });
    await deleteCustomerService.execute({
      admin_id: admin.id,
      customer_id: customer.id
    });

    expect(deleteCustomer).toHaveBeenCalledWith(customer);
  });
})
