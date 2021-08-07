'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('user_quizzs', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      user_enrollment: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'users', key: 'enrollment' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      quizz_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'quizzs', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      score: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('user_quizzs');
  },
};
