import {Router} from 'express';

import ensureAuthenticated from '@modules/admin/infra/http/middlewares/ensureAuthenticated';

import customerRouter from '@modules/customer/infra/http/routes/customer.routes';
import sessionRouter from '@modules/admin/infra/http/routes/sessions.routes';
import adminRouter from '@modules/admin/infra/http/routes/admin.routes';
import passwordRouter from '@modules/admin/infra/http/routes/password.routes';

const routes = Router();

routes.use('/customers', ensureAuthenticated, customerRouter);
routes.use('/password', passwordRouter);
routes.use('/sessions', sessionRouter);
routes.use('/', adminRouter);

export default routes;
