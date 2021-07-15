const { Model, DataTypes } = require('sequelize');

class Subject extends Model {
  static init(sequelize) {
    super.init(
      {
        name: DataTypes.STRING,
      },
      { sequelize },
    );
  }
}

module.exports = Subject;
