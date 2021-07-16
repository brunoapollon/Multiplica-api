const Score = require('../models/Score');
module.exports = {
  async store(request, response) {
    const { score } = request.body;
    const { enrollment } = request;
    if (!score) {
      return response.status(400).json({ error: 'Validation fails' });
    }
    const scoreCreated = await Score.create({
      score,
      user_enrollment: enrollment,
    });
    return response.status(200).json(scoreCreated);
  },
  async index(request, response) {},
  async show(request, response) {},
  async update(request, response) {},
  async delete(request, response) {},
};
