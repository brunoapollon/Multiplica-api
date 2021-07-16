const { Model, DataTypes } = require('sequelize');

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        enrollment: { primaryKey: true, type: DataTypes.INTEGER },
        name: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        level: DataTypes.INTEGER,
        type_user_id: DataTypes.INTEGER,
        avatar_id: DataTypes.INTEGER,
      },
      { sequelize },
    );
  }
  static associate(models) {
    this.belongsTo(models.UserType, {
      foreignKey: 'type_user_id',
      as: 'user_types',
    });
    this.belongsTo(models.File, { foreignKey: 'avatar_id', as: 'files' });
  }
}

module.exports = User;
