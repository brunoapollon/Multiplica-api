const { Router } = require('express');
const userRouter = require('./routes/Users.routes');
const userTypesRouter = require('./routes/UserTypes.routes');

const routes = Router();

routes.use(userRouter);
routes.use(userTypesRouter);

module.exports = routes;
