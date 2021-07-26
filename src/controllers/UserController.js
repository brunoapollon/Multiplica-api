const User = require('../models/User');
const Score = require('../models/Score');
const { hash } = require('bcryptjs');
const Yup = require('yup');

module.exports = {
  async store(request, response) {
    const {
      enrollment,
      name,
      email,
      password,
      level = 1,
      type_user_id,
      avatar_id,
    } = request.body;

    const schema = Yup.object().shape({
      enrollment: Yup.number().required(),
      name: Yup.string().required(),
      email: Yup.string().required(),
      password: Yup.string().required(),
      level: Yup.number(),
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

    let userCreated, userReturn;

    if (type_user_id === 1) {
      userCreated = await User.create({
        enrollment,
        name,
        email,
        password: passwordEncoded,
        level,
        type_user_id,
        avatar_id,
      });

      await Score.create({
        score: 0,
        user_enrollment: enrollment,
      });

      userReturn = {
        enrollment: userCreated.enrollment,
        name: userCreated.name,
        email: userCreated.email,
        level: userCreated.level,
        type_user_id: userCreated.type_user_id,
        avatar_id: userCreated.avatar_id,
      };
    } else {
      userCreated = await User.create({
        enrollment,
        name,
        email,
        password: passwordEncoded,
        type_user_id,
        avatar_id,
      });

      userReturn = {
        enrollment: userCreated.enrollment,
        name: userCreated.name,
        email: userCreated.email,
        type_user_id: userCreated.type_user_id,
        avatar_id: userCreated.avatar_id,
      };
    }

    return response.status(200).json(userReturn);
  },
  async index(request, response) {
    const users = await User.findAll();
    let userMap;
    const usersReturn = users.map(user => {
      if (user.type_user_id === 1) {
        userMap = {
          enrollment: user.enrollment,
          name: user.name,
          email: user.email,
          level: user.level,
          type_user_id: user.type_user_id,
          avatar_id: user.avatar_id,
        };
      } else {
        userMap = {
          enrollment: user.enrollment,
          name: user.name,
          email: user.email,
          type_user_id: user.type_user_id,
          avatar_id: user.avatar_id,
        };
      }
      return userMap;
    });
    return response.status(200).json(usersReturn);
  },
  async show(request, response) {
    const { enrollment } = request;
    const userFind = await User.findByPk(enrollment);
    if (!userFind) {
      return response.status(404).json({ err: 'User not found' });
    }
    let userReturn;
    if (userFind.type_user_id === 1) {
      userReturn = {
        enrollment: userFind.enrollment,
        name: userFind.name,
        email: userFind.email,
        level: userFind.level,
        type_user_id: userFind.type_user_id,
        avatar_id: userFind.avatar_id,
      };
    } else {
      userReturn = {
        enrollment: userFind.enrollment,
        name: userFind.name,
        email: userFind.email,
        type_user_id: userFind.type_user_id,
        avatar_id: userFind.avatar_id,
      };
    }
    return response.status(200).json(userReturn);
  },
  async update(request, response) {
    const { enrollment } = request;
    const { name, email, level, type_user_id, avatar_id } = request.body;

    const schema = Yup.object().shape({
      enrollment: Yup.number(),
      name: Yup.string(),
      email: Yup.string(),
      password: Yup.string(),
      level: Yup.number(),
      type_user_id: Yup.number(),
    });

    if (!(await schema.isValid(request.body))) {
      return response.status(400).json({ error: 'Validation fails' });
    }

    const userExists = await User.findByPk(enrollment);

    if (!userExists) {
      return response.status(400).json({ error: 'user does not exists' });
    }

    if (userExists.type_user_id === 1) {
      await User.update(
        {
          name,
          email,
          level,
          type_user_id,
          avatar_id,
        },
        { where: { enrollment } },
      );
    } else {
      await User.update(
        {
          name,
          email,
          type_user_id,
          avatar_id,
        },
        { where: { enrollment } },
      );
    }

    return response.status(200).json({ message: 'user updated successful' });
  },
  async delete(request, response) {
    const { enrollment } = request;
    User.destroy({ where: { enrollment } });
    return response.status(200).json({ message: 'user deleted successful' });
  },
};
