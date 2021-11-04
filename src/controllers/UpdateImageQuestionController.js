const fs = require('fs');
const Question = require('../models/Question');
const File = require('../models/File');
const path = require('path');
const aws = require('aws-sdk');

const uploadConfig = require('../config/uploadConfig');

module.exports = {
  async update(request, response) {
    const { question_id } = request.params;
    const { file } = request;

    const findedQuestion = await Question.findByPk(question_id, {
      include: [{ model: File, as: 'file' }],
    });

    if (!findedQuestion) {
      fs.promises.unlink(path.resolve(uploadConfig.dest, file.filename));
      return response.status(404).json({ error: 'question not found' });
    }

    if (findedQuestion.file) {
      if (process.env.STORAGE_TYPE === 'local')
        fs.promises.unlink(
          path.resolve(uploadConfig.dest, findedQuestion.file.name),
        );
      else {
        const S3 = new aws.S3();

        S3.deleteObject({
          Bucket: process.env.BUCKET_NAME,
          Key: findedQuestion.file.name,
        }).promise();
      }
    }

    let url = `${process.env._URL_API_}/${file.filename}`;

    if (file.location) url = file.location;

    const fileQuestion = await File.create({
      name: file.key ? file.key : file.filename,
      url,
    });

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
