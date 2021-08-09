const Quizz = require('../models/Quizz');
const Question = require('../models/Question');
const QuizzQuestion = require('../models/QuizzQuestion');

module.exports = {
  async store(request, response) {
    const { quizz_id } = request.params;
    const { questionsArray } = request.body;
    const quizzFind = await Quizz.findByPk(quizz_id);
    if (!quizzFind) {
      return response.status(404).json({ error: 'quizz does not exist' });
    }
    questionsArray.forEach(async question_id => {
      const questionFind = await Question.findByPk(question_id);
      if (questionFind) {
        await QuizzQuestion.create({ question_id, quizz_id });
      }
    });
    return response.status(200).json({ message: 'quizz created sucessfull' });
  },
};
