import fs from 'fs';
import path from 'path';
import {
  fileURLToPath
} from 'url';

const __filename = fileURLToPath(
  import.meta.url);
const __dirname = path.dirname(__filename);

const source = path.join(__dirname, 'config', 'nginx.conf');
const destination = path.join(__dirname, 'dist', 'nginx.conf');

fs.copyFile(source, destination, (err) => {
  if (err) {
    console.error('Error copying nginx.conf:', err);
  } else {
    console.log('nginx.conf copied to dist folder.');
  }
});