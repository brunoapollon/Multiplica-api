const express = require('express');
require('./database');
const routes = require('./index.routes');

const app = express();
app.use(express.json());

app.use(routes);

app.listen(3333, () => {
  console.log('sever started on port 3333 👨‍💻');
});
