const { Model, DataTypes } = require('sequelize');

class Question extends Model {
  static init(sequelize) {
    super.init(
      {
        title: DataTypes.STRING,
        descripton: DataTypes.STRING,
        a: DataTypes.STRING,
        b: DataTypes.STRING,
        c: DataTypes.STRING,
        d: DataTypes.STRING,
        e: DataTypes.STRING,
        correct_answer: DataTypes.STRING,
        score: DataTypes.INTEGER,
        level: DataTypes.INTEGER,
        file_id: DataTypes.INTEGER,
        user_enrollment: DataTypes.INTEGER,
        subject_id: DataTypes.INTEGER,
      },
      { sequelize },
    );
  }
  static associate(models) {
    this.belongsTo(models.File, { foreignKey: 'avatar_id', as: 'files' });
    this.belongsTo(models.User, { foreignKey: 'user_enrollment', as: 'user' });
    this.belongsTo(models.Subject, { foreignKey: 'subject_id', as: 'subject' });
  }
}

module.exports = Question;
