module.exports = (sequelize, DataTypes) => {
    const Menu = sequelize.define('Menu', {
      englishName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      amharicName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
  
    });
  
    return Menu;
  };
  