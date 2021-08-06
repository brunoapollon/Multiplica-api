const Quizz = require('../models/Quizz');
const QuizzQuestion = require('../models/QuizzQuestion');
const Question = require('../models/Question');
const Subject = require('../models/Subject');
const Yup = require('yup');

module.exports = {
  async store(request, response) {
    const { subject_id } = request.params;
    const { title } = request.body;
    const schema = Yup.object().shape({
      subject_id: Yup.string().required(),
      title: Yup.string().required(),
    });
    if (!(await schema.isValid({ subject_id, title }))) {
      return response.status(400).json({ error: "Validation fails'" });
    }
    const subjectFind = await Subject.findByPk(subject_id);
    if (!subjectFind) {
      return response.status(404).json({ error: 'subject not found' });
    }
    const quizz = await Quizz.create({ subject_id, title });
    return response.status(200).json(quizz);
  },
  async show(request, response) {
    const { quizz_id } = request.params;
    let quizzReturn = {
      id: '',
      title: '',
      subject_id: 0,
      questions: [],
      createdAt: '',
      updatedAt: '',
    };
    const findQuizz = await Quizz.findByPk(quizz_id);
    if (!findQuizz) {
      return response.status(404).json({ error: 'quizz not found' });
    }
    const findQuestions = await QuizzQuestion.findAll({
      include: [
        {
          model: Question,
          as: 'question',
        },
      ],
      where: { quizz_id },
    });
    quizzReturn = {
      id: findQuizz.id,
      title: findQuizz.title,
      subject_id: findQuizz.subject_,
      questions: findQuestions,
      createdAt: findQuizz.createdAt,
      updatedAt: findQuizz.updatedAt,
    };
    return response.status(200).json(quizzReturn);
  },
  async index(request, response) {
    const quizz = await Quizz.findAll({
      include: { model: Subject, as: 'subject' },
    });
    return response.status(200).json(quizz);
  },
};
