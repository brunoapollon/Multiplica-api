const Question = require('../models/Question');
const Quizz = require('../models/Quizz');
const QuizzQuestion = require('../models/QuizzQuestion');
const QuizzUser = require('../models/QuizzUser');
const Score = require('../models/Score');

module.exports = {
  async store(request, response) {
    const { enrollment } = request;
    const { quizz_id } = request.params;
    const { arrayAnswers } = request.body;
    let scoreQuizz = 0;
    const findQuizz = await Quizz.findByPk(quizz_id);
    if (!findQuizz) {
      return response.status(404).json({ error: 'quizz not found' });
    }
    const findQuestionsQuizz = await QuizzQuestion.findAll({
      include: [
        {
          model: Question,
          as: 'question',
        },
      ],
      where: { quizz_id },
    });
    for (let index = 0; index < findQuestionsQuizz.length; index++) {
      if (
        findQuestionsQuizz[index].question.correct_answer ===
        arrayAnswers[index]
      ) {
        scoreQuizz += findQuestionsQuizz[index].question.score;
      }
    }
    const scoreCurrent = await Score.findOne({
      where: { user_enrollment: enrollment },
    });
    scoreQuizz += scoreCurrent.dataValues.score;
    await QuizzUser.create({
      user_enrollment: enrollment,
      quizz_id,
      score: scoreQuizz,
    });
    await Score.update(
      { score: scoreQuizz },
      { where: { user_enrollment: enrollment } },
    );
    return response.status(200).json({ scoreQuizz });
  },
};
