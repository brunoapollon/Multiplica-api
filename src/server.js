require('dotenv/config');
const express = require('express');
const handleErrors = require('./middlewares/handleErrors');
require('./database');
const routes = require('./index.routes');

const app = express();
app.use(express.json());

app.use(routes);
app.use(handleErrors);

app.listen(3333, () => {
  console.log('sever started on port 3333 👨‍💻');
});
