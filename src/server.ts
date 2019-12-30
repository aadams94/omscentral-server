require('./env')();

import { Server } from 'http';
import { app } from './app';
import { logger } from './components';

app.boot((error?: Error) => {
  if (error) {
    throw error;
  }

  const server: Server = app.get('server');
  const port: number = app.get('port');

  server.listen(port, () => {
    logger.info(`Listening on port ${port}...`);
    logger.info('Press CTRL-C to stop.');
  });
});
