import { Router } from 'express';
import AdminsController from '../controllers/AdminsController';
import { celebrate, Segments, Joi } from 'celebrate';

const adminRouter = Router()

const adminsController = new AdminsController();

adminRouter.post('/',  celebrate({
  [Segments.BODY]: {
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  },
}), adminsController.create);

export default adminRouter;
