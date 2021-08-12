const fs = require('fs');
const Question = require('../models/Question');
const File = require('../models/File');
const path = require('path');

const uploadConfig = require('../config/uploadConfig');

module.exports = {
  async update(request, response) {
    const { question_id } = request.params;
    const { file } = request;
    const findedQuestion = await Question.findByPk(question_id);

    if (!findedQuestion) {
      fs.promises.unlink(path.resolve(uploadConfig.dest, file.filename));
      return response.status(404).json({ error: 'question not found' });
    }

    if (findedQuestion.file) {
      fs.promises.unlink(path.resolve(uploadConfig.dest, findedUser.file.name));
    }

    const url = `${process.env._URL_API_}/${file.filename}`;
    const fileQuestion = await File.create({ name: file.filename, url });
    await Question.update(
      { file_id: fileQuestion.id },
      { where: { id: question_id } },
    );

    if (findedQuestion.file) {
      await File.destroy({ where: { id: findedQuestion.file.id } });
    }

    return response
      .status(200)
      .json({ messgae: 'image question update successful' });
  },
};
