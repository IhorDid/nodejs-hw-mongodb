import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  loginUser,
  logoutUser,
  refreshSessionUser,
  registerUser,
} from '../controllers/auth.js';
import { validateBody } from '../middlewares/validateBody.js';
import { loginUserSchema, registerUserSchema } from '../validation/auth.js';

const authRouter = Router();
authRouter.post(
  '/register',
  validateBody(registerUserSchema),
  ctrlWrapper(registerUser),
);
authRouter.post(
  '/login',
  validateBody(loginUserSchema),
  ctrlWrapper(loginUser),
);
authRouter.post('/refresh', ctrlWrapper(refreshSessionUser));
authRouter.post('/logout', ctrlWrapper(logoutUser));

export { authRouter };
