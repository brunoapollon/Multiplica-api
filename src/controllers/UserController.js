const User = require('../models/User');
const { hash } = require('bcryptjs');
const Yup = require('yup');

module.exports = {
  async store(request, response) {
    const { enrollment, name, email, password, type_user_id, avatar_id } =
      request.body;

    const schema = Yup.object().shape({
      enrollment: Yup.number().required(),
      name: Yup.string().required(),
      email: Yup.string().required(),
      password: Yup.string().required(),
      type_user_id: Yup.number().required(),
    });

    if (!(await schema.isValid(request.body))) {
      return response.status(400).json({ error: 'Validation fails' });
    }

    const userExists = await User.findByPk(enrollment);

    if (userExists) {
      return response.status(400).json({ error: 'user already exists' });
    }

    const passwordEncoded = await hash(password, 8);
    const userCreated = await User.create({
      enrollment,
      name,
      email,
      password: passwordEncoded,
      type_user_id,
      avatar_id,
    });
    const userReturn = {
      enrollment: userCreated.enrollment,
      name: userCreated.name,
      email: userCreated.email,
      type_user_id: userCreated.type_user_id,
      avatar_id: userCreated.avatar_id,
    };
    return response.status(200).json(userReturn);
  },
  async index(request, response) {
    const users = await User.findAll();
    const usersReturn = users.map(user => {
      const userMap = {
        enrollment: user.enrollment,
        name: user.name,
        email: user.email,
        type_user_id: user.type_user_id,
        avatar_id: user.avatar_id,
      };
      return userMap;
    });
    return response.status(200).json(usersReturn);
  },
  async show(request, response) {
    const { enrollment } = request.params;
    const userFind = await User.findByPk(enrollment);
    if (!userFind) {
      return response.status(404).json({ err: 'User not found' });
    }
    const userReturn = {
      enrollment: userFind.enrollment,
      name: userFind.name,
      email: userFind.email,
      type_user_id: userFind.type_user_id,
      avatar_id: userFind.avatar_id,
    };
    return response.status(200).json(userReturn);
  },
  async update(request, response) {
    const { enrollment } = request.params;
    const { name, email, type_user_id, avatar_id } = request.body;

    const userExists = await User.findByPk(enrollment);

    if (!userExists) {
      return response.status(400).json({ error: 'user does not exists' });
    }

    await User.update(
      {
        name,
        email,
        type_user_id,
        avatar_id,
      },
      { where: { enrollment } },
    );
    return response.status(200).json({ messgae: 'user update successful' });
  },
};
