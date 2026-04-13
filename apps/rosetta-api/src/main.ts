import { createRosettaApiServer } from './lib/rosetta-api.js';

const server = createRosettaApiServer();

server.listen(3040, '127.0.0.1', () => {
  console.log('rosetta-api listening on http://127.0.0.1:3040');
});
