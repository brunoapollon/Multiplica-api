const { Model, DataTypes } = require('sequelize');

class Quizz extends Model {
  static init(sequelize) {
    super.init(
      {
        title: DataTypes.STRING,
        subject_id: DataTypes.INTEGER,
      },
      { sequelize },
    );
  }
  static associate(models) {
    this.belongsTo(models.Subject, {
      foreignKey: 'subject_id',
      as: 'subject',
    });
  }
}

module.exports = Quizz;
