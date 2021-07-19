const { Router } = require('express');
const userRouter = require('./routes/User.routes');
const userAuth = require('./routes/userAuthentication.routes');
const subjectRouter = require('./routes/Subject.routes');
const userTypesRouter = require('./routes/UserTypes.routes');

const routes = Router();

routes.use(userRouter);
routes.use(userTypesRouter);
routes.use(userAuth);
routes.use(subjectRouter);

module.exports = routes;
