const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {
      // define association here
    }
  }
  Product.init({
    sku: DataTypes.STRING,
    description: DataTypes.STRING,
    price: DataTypes.INTEGER,
    stock: DataTypes.INTEGER,
    weight: DataTypes.INTEGER,
    createdAt: DataTypes.INTEGER, // Corrected field name
    category_id: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Product', // Corrected model name (capitalized)
  });
  return Product;
};
