import { SMTP } from '../constants/index.js';
import { env } from './env.js';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: env(SMTP.SMTP_HOST),
  port: Number(env(SMTP.SMTP_PORT)),
  auth: {
    user: env(SMTP.SMTP_USER),
    pass: env(SMTP.SMTP_PASSWORD),
  },
});

const sendEmail = async (options) => {
  return await transporter.sendMail(options);
};

export { sendEmail };
