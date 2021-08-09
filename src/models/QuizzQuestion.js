const { Model, DataTypes } = require('sequelize');

class QuizzQuestion extends Model {
  static init(sequelize) {
    super.init(
      {
        quizz_id: DataTypes.INTEGER,
        question_id: DataTypes.INTEGER,
      },
      { sequelize },
    );
  }
  static associate(models) {
    this.belongsTo(models.Quizz, {
      foreignKey: 'quizz_id',
      as: 'quizz',
    });
    this.belongsTo(models.Question, {
      foreignKey: 'question_id',
      as: 'question',
    });
  }
}

module.exports = QuizzQuestion;
