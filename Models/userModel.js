module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8, 8]  // Ensures password length is 8 characters
      }
    },
    skills: {
      type: DataTypes.JSON, // Storing skills as JSON object
      allowNull: true
    }

  });

  return User;
};
