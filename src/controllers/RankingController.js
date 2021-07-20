const Score = require('../models/Score');
const User = require('../models/User');
const { index } = require('./SubjectController');

module.exports = {
  async index(request, response) {
    const { level } = request.params;
    const ranking = await Score.findAll({
      include: [{ model: User, as: 'user', attributes: ['name', 'level'] }],
      where: { '$user.level$': level },
    });
    return response.status(200).json(ranking);
  },
  async show(request, response) {
    const { enrollment } = request;
    const userScore = await Score.findOne({
      where: { user_enrollment: enrollment },
    });
    return response.status(200).json(userScore);
  },
};
