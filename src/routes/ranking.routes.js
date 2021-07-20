const { Router } = require('express');

const RankingController = require('../controllers/RankingController');
const ensureAuthenticated = require('../middlewares/ensureAuthenticated');

const rakingRouter = Router();

rakingRouter.get(
  '/ranking/:level',
  ensureAuthenticated,
  RankingController.index,
);
module.exports = rakingRouter;
