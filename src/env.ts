import path from 'path';
import dotenv from 'dotenv';
import dotenvExpand from 'dotenv-expand';

export default module.exports = (file: string = '.env') => {
  dotenvExpand(
    dotenv.config({
      path: path.join(
        __dirname,
        '..',
        __dirname.includes('dist/') ? '..' : '',
        file
      )
    })
  );
};
