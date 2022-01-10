require('dotenv/config');

const express = require('express');
const path = require('path');

const handleErrors = require('./middlewares/handleErrors');
const uploadConfig = require('./config/uploadConfig');
require('./database');

const routes = require('./index.routes');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/files', express.static(uploadConfig.dest));

app.use(routes);
app.use(handleErrors);

app.listen(3333, () => {
  console.log('sever started on port 3333 👨‍💻');
});
