const { Model, DataTypes } = require('sequelize');

class UserType extends Model {
  static init(sequelize) {
    super.init(
      {
        name: DataTypes.STRING,
      },
      { sequelize },
    );
  }
}

module.exports = UserType;
