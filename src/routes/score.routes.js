const { Router } = require('express');

const ScoreController = require('../controllers/ScoreController');
const ensureAuthenticated = require('../middlewares/ensureAuthenticated');

const scoreRouter = Router();

scoreRouter.get('/scores/me', ensureAuthenticated, ScoreController.show);
scoreRouter.put(
  '/scores/moreScore',
  ensureAuthenticated,
  ScoreController.update,
);
module.exports = scoreRouter;
