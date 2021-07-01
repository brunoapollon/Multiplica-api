const UserType = require('../models/UserType');

module.exports = {
  async store(request, response) {
    const { name } = request.body;
    const userTypeCreated = await UserType.create({
      name,
    });
    return response.status(200).json(userTypeCreated);
  },
};
