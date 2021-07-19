const { Model, DataTypes } = require('sequelize');

class Score extends Model {
  static init(sequelize) {
    super.init(
      {
        score: DataTypes.INTEGER,
        user_enrollment: DataTypes.INTEGER,
      },
      { sequelize },
    );
  }
  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_enrollment', as: 'users' });
  }
}

module.exports = Score;
