import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import dotenv from 'dotenv';
import { getAllContacts, getContactsById } from './services/contacts.js';

dotenv.config();
const PORT = Number(process.env.PORT);

const setupServer = () => {
  const app = express();
  app.use(cors());
  app.use(
    pino({
      transport: {
        target: 'pino-http',
      },
    }),
  );
  app.use(express.json());
  app.use((req, res, next) => {
    res.status(404).json({
      message: 'Not found',
    });
  });

  app.get('/contacts', async (req, res) => {
    const contacts = await getAllContacts();
    res.status(200).json({
      message: 'Successfully found contacts!',
      data: contacts,
    });
  });

  app.get('/contacts/:contactId', async (req, res, next) => {
    const { contactId } = req.params;
    const contact = await getContactsById(contactId);
    res.status(200).json({
      message: `Successfully found contact with id ${contactId}!`,
      data: contact,
    });

    if (!contact) {
      res.status(404).json({
        message: 'Contact  not found',
      });
    }
  });

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

export { setupServer };
