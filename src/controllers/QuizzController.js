const Quizz = require('../models/Quizz');
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
};
