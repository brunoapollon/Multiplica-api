const { Model, DataTypes } = require('sequelize');

class File extends Model {
  static init(sequelize) {
    super.init(
      {
        name: DataTypes.STRING,
        url: DataTypes.STRING,
      },
      { sequelize },
    );
  }
}

module.exports = File;
