const Score = require('../models/Score');
const User = require('../models/User');

module.exports = {
  async index(request, response) {
    const { level } = request.params;
    const ranking = await Score.findAll({
      include: [{ model: User, as: 'user', attributes: ['name', 'level'] }],
      where: { '$user.level$': level },
    });
    return response.status(200).json(ranking);
  },
};
