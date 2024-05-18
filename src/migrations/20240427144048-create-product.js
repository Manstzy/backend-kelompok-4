module.exports = {
  async up(queryInterface, Sequelize) {
    // Create the products table
    await queryInterface.createTable('products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      sku: {
        type: Sequelize.STRING,
      },
      description: {
        type: Sequelize.STRING,
      },
      price: {
<<<<<<< HEAD
        type: Sequelize.INTEGER
=======
        type: Sequelize.INTEGER,
>>>>>>> 16665ab2b7b47be5ea3ffcde7dbc33fb56eebae0
      },
      stock: {
        type: Sequelize.INTEGER,
      },
      weight: {
        type: Sequelize.INTEGER,
      },
<<<<<<< HEAD
      createdAt: {
        allowNull: true,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
=======
      create_at: {
        type: Sequelize.INTEGER,
>>>>>>> 16665ab2b7b47be5ea3ffcde7dbc33fb56eebae0
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
<<<<<<< HEAD
          model: 'categories',  // Name of the referenced table
          key: 'id'  // Primary key of the referenced table
        },
        onUpdate: 'CASCADE', // Cascade on update
        onDelete: 'SET NULL' // Set null on delete
      }
=======
          model: 'categories',
          key: 'id',
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
>>>>>>> 16665ab2b7b47be5ea3ffcde7dbc33fb56eebae0
    });

    // Add an index on category_id for faster queries
    await queryInterface.addIndex('products', ['category_id']);
  },
<<<<<<< HEAD

  async down(queryInterface, Sequelize) {
    // Drop the products table
    await queryInterface.dropTable('products');
  }
=======
  async down(queryInterface) {
    await queryInterface.dropTable('products');
  },
>>>>>>> 16665ab2b7b47be5ea3ffcde7dbc33fb56eebae0
};
