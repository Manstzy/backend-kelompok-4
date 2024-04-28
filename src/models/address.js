const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class address extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      address.belongsTo(models.users, {
        foreignKey: 'user_id',
        onDelete: 'CASCADE',
      });
    }
  }
  address.init(
    {
      first_name: DataTypes.STRING,
      last_name: DataTypes.STRING,
      contry: DataTypes.STRING,
      province_city: DataTypes.STRING,
      complete_address: DataTypes.STRING,
      user_id: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'address',
    },
  );
  return address;
};
