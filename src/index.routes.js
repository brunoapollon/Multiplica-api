const { Router } = require('express');
const userRouter = require('./routes/Users.routes');
const userAuth = require('./routes/userAuthentication.routes');
const userTypesRouter = require('./routes/UserTypes.routes');

const routes = Router();

routes.use(userRouter);
routes.use(userTypesRouter);
routes.use(userAuth);

module.exports = routes;
