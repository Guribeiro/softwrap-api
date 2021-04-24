import { Router } from 'express';
import ResetPasswordController from '../controllers/ResetPasswordController';
import SendForgotPasswordEmailController from '../controllers/SendForgotPasswordEmailController';

const passwordRouter = Router()

const resetPasswordController = new ResetPasswordController();
const sendForgotPasswordEmailController = new SendForgotPasswordEmailController();

passwordRouter.post('/forgot', sendForgotPasswordEmailController.create);
passwordRouter.post('/reset', resetPasswordController.create);

export default passwordRouter;
