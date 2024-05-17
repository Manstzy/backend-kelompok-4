'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Create the products table
    await queryInterface.createTable('products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      sku: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      price: {
        type: Sequelize.INTEGER
      },
      stock: {
        type: Sequelize.INTEGER
      },
      weight: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: true,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: true,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      // Define the foreign key for category_id
      category_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'categories',  // Name of the referenced table
          key: 'id'  // Primary key of the referenced table
        },
        onUpdate: 'CASCADE', // Cascade on update
        onDelete: 'SET NULL' // Set null on delete
      }
    });

    // Add an index on category_id for faster queries
    await queryInterface.addIndex('products', ['category_id']);
  },

  async down(queryInterface, Sequelize) {
    // Drop the products table
    await queryInterface.dropTable('products');
  }
};
