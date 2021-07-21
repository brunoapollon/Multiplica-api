const Question = require('../models/Question');
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
};
