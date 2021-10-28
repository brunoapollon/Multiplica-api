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

    if (findedUser.file) {
      fs.promises.unlink(path.resolve(uploadConfig.dest, findedUser.file.name));
    }

    let url = `${process.env._URL_API_}/${file.filename}`;

    console.log(file.location);

    if (file.location) url = file.location;

    const filecreated = await File.create({
      name: file.key ? file.key : file.filename,
      url,
    });

    await User.update({ avatar_id: filecreated.id }, { where: { enrollment } });

    if (findedUser.file) {
      await File.destroy({ where: { id: findedUser.file.id } });
    }

    return response.status(200).json({ messgae: 'avatar update successful' });
  },
};
