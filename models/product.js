module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define('Product', {
      productname: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      price: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      status: {
        allowNull: false,
        type: DataTypes.STRING,
      }
    }, {
      freezeTableName: true,
      underscored: true
    });
    return Product;
  };
  