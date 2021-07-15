module.exports = {
  jwt: {
    secret: process.env._SECRET_JWT_,
    expiresIn: '1d',
  },
};
