const QuizzUser = require('../models/QuizzUser');

module.exports = {
  async show(request, response) {
    const { quizz_user_id } = request.params;
    const quizzUserFind = await QuizzUser.findByPk(quizz_user_id);
    if (!quizzUserFind) {
      return response.status(404).json({ error: 'quizz not found' });
    }
    return response.status(200).json(quizzUserFind);
  },
  async index(request, response) {
    const { enrollment } = request;
    const quizzUserFind = await QuizzUser.findAll({
      where: { user_enrollment: enrollment },
    });
    if (!quizzUserFind) {
      return response.status(404).json({ error: 'quizz not found' });
    }
    return response.status(200).json(quizzUserFind);
  },
};
