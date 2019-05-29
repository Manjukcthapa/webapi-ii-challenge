const express = require('express');
const router = require('./routes')
const server = express();

server.use(express.json());
server.use('/api', router)

server.listen(5000, () =>
  console.log('Server running on http://localhost:5000')
);



