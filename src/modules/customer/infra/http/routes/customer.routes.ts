import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import CustomersController from '../controllers/CustomersController';

const customerRouter = Router();

import ensureAuthenticated from '@modules/admin/infra/http/middlewares/ensureAuthenticated';

const customersController = new CustomersController();

customerRouter.post('/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      age: Joi.number().required(),
      marital_status: Joi.string().required(),
      cpf: Joi.string().required(),
      city: Joi.string().required(),
      state: Joi.string().required(),
    }
  }),
  ensureAuthenticated, customersController.create);

customerRouter.get('/', ensureAuthenticated, customersController.index);

customerRouter.get('/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required()
    }
  }),
  ensureAuthenticated, customersController.show);

customerRouter.put('/:customer_id',
  celebrate({
    [Segments.PARAMS]: {
      customer_id:Joi.string().uuid().required()
    }
  }), ensureAuthenticated, customersController.update);

export default customerRouter;
