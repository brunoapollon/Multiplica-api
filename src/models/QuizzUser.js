const { Model, DataTypes } = require('sequelize');

class UserQuizz extends Model {
  static init(sequelize) {
    super.init(
      {
        quizz_id: DataTypes.INTEGER,
        user_enrollment: DataTypes.INTEGER,
        score: DataTypes.INTEGER,
      },
      { sequelize },
    );
  }
  static associate(models) {
    this.belongsTo(models.Quizz, {
      foreignKey: 'quizz_id',
      as: 'quizz',
    });
    this.belongsTo(models.User, {
      foreignKey: 'user_enrollment',
      as: 'user',
    });
  }
}
module.exports = UserQuizz;
