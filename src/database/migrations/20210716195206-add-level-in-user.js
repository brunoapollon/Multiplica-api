'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('users', 'level', Sequelize.INTEGER, {
      after: 'password',
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropColumn('users', 'level');
  },
};
