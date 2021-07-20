const { update } = require('../models/Score');
const Score = require('../models/Score');
const User = require('../models/User');

module.exports = {
  async show(request, response) {
    const { enrollment } = request;
    const userScore = await Score.findOne({
      include: [{ model: User, as: 'user', attributes: ['name', 'level'] }],
      where: { user_enrollment: enrollment },
    });
    return response.status(200).json(userScore);
  },
  async update(request, response) {
    const { enrollment } = request;
    let { moreScore } = request.body;
    console.log(moreScore);
    const userScore = await Score.findOne({
      where: { user_enrollment: enrollment },
    });
    moreScore += userScore.score;
    await Score.update(
      { score: moreScore },
      { where: { user_enrollment: enrollment } },
    );
    return response.status(200).json({ message: 'update score successful' });
  },
};
