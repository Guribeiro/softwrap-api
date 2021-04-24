import { Router } from 'express';
import AdminsController from '../controllers/AdminsController';

const adminRouter = Router()

const adminsController = new AdminsController();

adminRouter.post('/', adminsController.create);

export default adminRouter;
