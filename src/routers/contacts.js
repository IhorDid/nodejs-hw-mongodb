import { Router } from 'express';
import {
  createContactController,
  deleteContactController,
  getContactByIdController,
  getContactsController,
  patchContactController,
} from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const contactsRouter = Router();

contactsRouter.get('/contacts', ctrlWrapper(getContactsController));
contactsRouter.get(
  '/contacts/:contactId',
  ctrlWrapper(getContactByIdController),
);
contactsRouter.post('/contacts', ctrlWrapper(createContactController));
contactsRouter.patch(
  '/contacts/:contactId',
  ctrlWrapper(patchContactController),
);
contactsRouter.delete(
  '/contacts/:contactId',
  ctrlWrapper(deleteContactController),
);

export { contactsRouter };