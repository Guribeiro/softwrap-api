import { Router } from 'express';
import CustomersController from '../controllers/CustomersController';
const customerRouter = Router();

const customersController = new CustomersController();

customerRouter.post('/', customersController.create);


// customerRouter.get('/', async (request, response) => {
//   try {
//     const customersRepository = getCustomRepository(CustomersRepository);
//     const customers = await customersRepository.index();

//     return response.json(customers);
//   } catch (error) {
//     return response.json({ error: error.message })
//   }
// })

export default customerRouter;
