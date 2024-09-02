import { Router } from 'express';
import { contactsRouter } from './contacts.js';
import { authRouter } from './auth.js';

const rootRoute = Router();

rootRoute.use('/contacts', contactsRouter);
rootRoute.use('/auth', authRouter);

export { rootRoute };
