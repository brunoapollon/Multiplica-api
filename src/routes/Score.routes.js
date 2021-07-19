const { Router } = require('express');

const ScoreController = require('../controllers/ScoreController');
const ensureAuthenticated = require('../middlewares/ensureAuthenticated');

const scoreRouter = Router();

scoreRouter.post('/users/scores', ensureAuthenticated, ScoreController.store);

module.exports = scoreRouter;
