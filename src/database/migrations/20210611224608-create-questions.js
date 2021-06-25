'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) =>
    await queryInterface.createTable('questions', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      descripton: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      a: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      b: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      c: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      d: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      e: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      correct_answer: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      score: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      level: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      file_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'files', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      user_enrollment: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'users', key: 'enrollment' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      subject_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'subjects', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    }),

  down: async (queryInterface, Sequelize) =>
    await queryInterface.dropTable('questions'),
};
