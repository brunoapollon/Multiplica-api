const Question = require('../models/Question');
const User = require('../models/User');
const Yup = require('yup');

module.exports = {
  async store(request, response) {
    const {
      title,
      description,
      option_a,
      option_b,
      option_c,
      option_d,
      option_e,
      correct_answer,
      score,
      level,
      file_id,
      subject_id,
    } = request.body;
    const { enrollment } = request;
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      description: Yup.string().required(),
      option_a: Yup.string().required(),
      option_b: Yup.string().required(),
      option_c: Yup.string().required(),
      option_d: Yup.string().required(),
      option_e: Yup.string().required(),
      correct_answer: Yup.string().required(),
      score: Yup.number().required(),
      level: Yup.number().required(),
      file_id: Yup.number(),
      subject_id: Yup.number().required(),
    });
    if (!(await schema.isValid(request.body))) {
      return response.status(400).json({ error: 'Validation fails' });
    }
    const question = await Question.create({
      title,
      description,
      a: option_a,
      b: option_b,
      c: option_c,
      d: option_d,
      e: option_e,
      correct_answer,
      score,
      level,
      file_id,
      subject_id,
      user_enrollment: enrollment,
    });
    return response.status(200).json(question);
  },
  async show(request, response) {
    const { question_id } = request.params;
    const { enrollment } = request;
    if (!question_id) {
      return response
        .status(400)
        .json({ message: 'question id is obligatory' });
    }
    const question = await Question.findByPk(question_id);
    if (!question) {
      return response.status(404).json({ message: 'question does not exists' });
    }
    const user = await User.findByPk(enrollment);
    let questionReturn;
    if (user.type_user_id != 1) {
      return response.status(200).json(question);
    }
    questionReturn = {
      title: question.title,
      description: question.description,
      a: question.a,
      b: question.b,
      c: question.c,
      d: question.d,
      e: question.e,
      score: question.score,
      level: question.level,
      file_id: question.file_id,
      subject_id: question.subject_id,
      user_enrollment: question.user_enrollment,
      created_at: question.createdAt,
      updated_at: question.updatedAt,
    };
    return response.status(200).json(questionReturn);
  },
  async index(request, response) {
    const { subject_id, level } = request.params;
    if (!subject_id || !level) {
      return response.status(400).json({ message: 'missing filter params' });
    }
    const questions = await Question.findAll({
      where: { subject_id, level },
    });
    return response.status(200).json(questions);
  },
  async update(request, response) {
    const {
      title,
      description,
      option_a,
      option_b,
      option_c,
      option_d,
      option_e,
      correct_answer,
      score,
      level,
      file_id,
      subject_id,
    } = request.body;
    const { question_id } = request.params;
    const schema = Yup.object().shape({
      title: Yup.string(),
      description: Yup.string(),
      option_a: Yup.string(),
      option_b: Yup.string(),
      option_c: Yup.string(),
      option_d: Yup.string(),
      option_e: Yup.string(),
      correct_answer: Yup.string(),
      score: Yup.number(),
      level: Yup.number(),
      file_id: Yup.number(),
      subject_id: Yup.number(),
    });
    if (!(await schema.isValid(request.body))) {
      return response.status(400).json({ error: 'Validation fails' });
    }
    const question = await Question.update(
      {
        title,
        description,
        a: option_a,
        b: option_b,
        c: option_c,
        d: option_d,
        e: option_e,
        correct_answer,
        score,
        level,
        file_id,
        subject_id,
      },
      { where: { id: question_id } },
    );
    return response
      .status(200)
      .json({ message: 'question update successfull' });
  },
  async delete(request, response) {
    const { question_id } = request.params;
    const questionFind = await Question.findByPk(question_id);
    if (!questionFind) {
      return response.status(404).json({ message: 'question does not exists' });
    }
    await Question.destroy({ where: { id: question_id } });
    return response
      .status(200)
      .json({ message: 'question delete successfull' });
  },
};
