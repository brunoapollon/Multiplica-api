'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('questions', 'descripton');
    await queryInterface.addColumn(
      'questions',
      'description',
      Sequelize.STRING,
      {
        after: 'title',
      },
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('questions', 'description');
    await queryInterface.addColumn(
      'questions',
      'descripton',
      Sequelize.STRING,
      {
        after: 'title',
      },
    );
  },
};
