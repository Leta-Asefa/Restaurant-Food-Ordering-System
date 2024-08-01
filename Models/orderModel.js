module.exports = (sequelize, DataTypes) => {
    const Order = sequelize.define('Order', {
      customerPhone: {
        type: DataTypes.STRING,
        allowNull: false
      },
      orders: {
        type: DataTypes.JSON,
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING,
        default:'pending'
      },
      totalPrice: {
        type: DataTypes.INTEGER, // Storing skills as JSON object
        allowNull: false
      },
      tx_ref: {
        type: DataTypes.STRING
      }
  
    });
  
    return Order;
  };
  