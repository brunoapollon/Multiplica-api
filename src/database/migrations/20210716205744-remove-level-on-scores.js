'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.removeColumn('scores', 'level');
  },

  down: async (queryInterface, Sequelize) => {},
};
