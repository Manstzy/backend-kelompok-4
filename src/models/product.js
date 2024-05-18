const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {
      // Define association with Category model
      Product.belongsTo(models.category, { foreignKey: 'id' });
      Product.hasMany(models.product_image, { foreignKey: 'product_id' });
      Product.hasMany(models.cart, { foreignKey: 'product_id' });
      Product.hasMany(models.whishlist, { foreignKey: 'product_id' });
    }
  }
  Product.init(
    {
      sku: DataTypes.STRING,
      description: DataTypes.STRING,
      price: DataTypes.INTEGER,
      stock: DataTypes.INTEGER,
      weight: DataTypes.INTEGER,
      category_id: DataTypes.INTEGER, 
    },
    {
      sequelize,
      modelName: 'Product',
    }
  );
  return Product;
};
