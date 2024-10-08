import path from 'node:path';

const SORT_ORDER = {
  ASC: 'asc',
  DESC: 'desc',
};

const FIFTEEN_MINUTES = 15 * 60 * 1000;
const THIRTY_DAY = 30 * 24 * 60 * 60 * 1000;

const SMTP = {
  SMTP_HOST: 'SMTP_HOST',
  SMTP_PORT: 'SMTP_PORT',
  SMTP_USER: 'SMTP_USER',
  SMTP_PASSWORD: 'SMTP_PASSWORD',
  SMTP_FROM: 'SMTP_FROM',
};

const TEMP_UPLOAD_DIR = path.join(process.cwd(), 'temp');
const UPLOAD_DIR = path.join(process.cwd(), 'uploads');

const CLOUDINARY = {
  CLOUD_NAME: 'CLOUD_NAME',
  API_KEY: 'API_KEY',
  API_SECRET: 'API_SECRET',
};

const SWAGGER_PATH = path.join(process.cwd(), 'docs', 'swagger.json');

export {
  SORT_ORDER,
  FIFTEEN_MINUTES,
  THIRTY_DAY,
  SMTP,
  TEMP_UPLOAD_DIR,
  UPLOAD_DIR,
  CLOUDINARY,
  SWAGGER_PATH,
};
