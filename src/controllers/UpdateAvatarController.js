const fs = require('fs');
const User = require('../models/User');
const File = require('../models/File');
const path = require('path');

const uploadConfig = require('../config/uploadConfig');

module.exports = {
  async update(request, response) {
    const { enrollment, file } = request;

    const findedUser = await User.findByPk(enrollment, {
      include: [{ model: File, as: 'file' }],
    });
    console.log(findedUser.file.name);
    if (findedUser.file) {
      fs.promises.unlink(path.resolve(uploadConfig.dest, findedUser.file.name));
    }

    const url = `${process.env._URL_API_}/${file.filename}`;
    const filecreated = await File.create({ name: file.filename, url });

    await User.update({ avatar_id: filecreated.id }, { where: { enrollment } });
    await File.destroy({ where: { id: findedUser.file.id } });

    return response.status(200).json({ messgae: 'avatar update successful' });
  },
};
