import { env } from './env.js';
import { saveFileToCloudinary } from './saveFileToCloudinary.js';
import { saveFileToLocalMachine } from './saveFileToLocalMachine.js';

const saveFile = async (file) => {
  let url;

  if (env('IS_CLOUDINARY_ENABLED') === 'true') {
    url = await saveFileToCloudinary(file);
  } else {
    url = await saveFileToLocalMachine(file);
  }
  return url;
};
export { saveFile };
