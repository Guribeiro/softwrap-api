import FakeCustomersRepository from '../infra/repositories/fakes/FakeCustomersRepository';
import FakeAdminsRepository from '@modules/admin/infra/repositories/fakes/FakeAdminsRepository';
import UpdateCustomerService from './UpdateCustomerService';
import AppError from '@shared/errors/AppError';

let fakeCustomersRepository: FakeCustomersRepository;
let updateCustomerService: UpdateCustomerService;
let fakeAdminsRepository: FakeAdminsRepository;

describe('CreateCustomer', () => {
  beforeEach(() => {
    fakeCustomersRepository = new FakeCustomersRepository();
    fakeAdminsRepository = new FakeAdminsRepository();

    updateCustomerService = new UpdateCustomerService(
      fakeCustomersRepository,
      fakeAdminsRepository
    );
  })

  it('should be able to create a new customer', async () => {

    const admin = await fakeAdminsRepository.create({
      name: 'Admin-name',
      email: 'admin@gmail.com',
      password: 'admin-password'
    });

    const customer = await fakeCustomersRepository.create({
      name: 'customer-name',
      age: 24,
      marital_status: 'married',
      cpf: '11111111111',
      city: 'city',
      state: 'state'
    });

    const updatedCustomer = await updateCustomerService.execute({
      admin_id: admin.id,
      customer_id: customer.id,
      name: 'customer-name-updated',
      age: 25,
      marital_status: 'single',
      cpf: '99999999999',
      city: 'city-updated',
      state: 'state-updated'
    })

    expect(updatedCustomer.id).toBe(customer.id);
    expect(updatedCustomer.name).toBe('customer-name-updated');
    expect(updatedCustomer.age).toBe(25);
    expect(updatedCustomer.marital_status).toBe('single');
    expect(updatedCustomer.cpf).toBe('99999999999');
    expect(updatedCustomer.city).toBe('city-updated');
    expect(updatedCustomer.state).toBe('state-updated');
  });

  it('should not be able to update cpf to an already been used one', async () => {
    const admin = await fakeAdminsRepository.create({
      name: 'Admin-name',
      email: 'admin@gmail.com',
      password: 'admin-password'
    });

    const first_customer = await fakeCustomersRepository.create({
      name: 'first_customer-name',
      age: 24,
      marital_status: 'married',
      cpf: '11111111111',
      city: 'city',
      state: 'state'
    });

    const second_customer = await fakeCustomersRepository.create({
      name: 'first_customer-name',
      age: 24,
      marital_status: 'married',
      cpf: '22222222222',
      city: 'city',
      state: 'state'
    });

    await expect(
      updateCustomerService.execute({
        admin_id: admin.id,
        customer_id: second_customer.id,
        name: 'first_customer-name',
        age: 24,
        marital_status: 'married',
        cpf: first_customer.cpf,
        city: 'city',
        state: 'state'
      }),
    ).rejects.toBeInstanceOf(AppError);

  })

  it('should not be able to update a nonexistent customer', async () => {
    const admin = await fakeAdminsRepository.create({
      name: 'Admin-name',
      email: 'admin@gmail.com',
      password: 'admin-password'
    });
    await expect(
      updateCustomerService.execute({
        admin_id: admin.id,
        customer_id: 'invalid-customer-id',
        name: 'customer-name-updated',
        age: 25,
        marital_status: 'single',
        cpf: '99999999999',
        city: 'city-updated',
        state: 'state-updated'
      }),
    ).rejects.toBeInstanceOf(AppError);
  })

})
