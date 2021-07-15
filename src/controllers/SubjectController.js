const Subject = require('../models/Subject');

module.exports = {
  async store(request, response) {
    const { name } = request.body;
    const subjects = await Subject.findAll();
    subjects.map(sub => {
      sub.name = sub.name.toUpperCase();
      return sub;
    });
    const subjectFind = subjects.filter(subFind => {
      if (subFind.name === name.toUpperCase()) {
        return subFind;
      }
    });
    if (subjectFind.length > 0) {
      return response.status(400).json({ err: 'subject already exists' });
    }
    const subject = await Subject.create({
      name,
    });
    return response.status(200).json(subject);
  },
  async index(request, response) {
    const allSubjects = await Subject.findAll();
    return response.status(200).json(allSubjects);
  },
  async show(request, response) {
    const { subject_id } = request.params;
    const subject = await Subject.findByPk(subject_id);
    if (!subject) {
      return response.status(400).json({ err: 'subject does not exist' });
    }
    return response.status(200).json(subject);
  },
  async update(request, response) {
    const { subject_id } = request.params;
    const { newName } = request.body;
    const subject = await Subject.findByPk(subject_id);
    if (!subject) {
      return response.status(400).json({ err: 'subject does not exist' });
    }
    await Subject.update({ name: newName }, { where: { id: subject_id } });
    subject.name = newName;
    return response.status(200).json(subject);
  },
  async delete(request, response) {
    const { subject_id } = request.params;
    const subject = await Subject.findByPk(subject_id);
    if (!subject) {
      return response.status(400).json({ err: 'subject does not exist' });
    }
    await Subject.destroy({ where: { id: subject_id } });
    return response.status(200).json({ message: 'subject deleted successful' });
  },
};
