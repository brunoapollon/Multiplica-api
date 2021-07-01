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
    delete userCreated.password;
    return response.status(200).json(userCreated);
  },
};
