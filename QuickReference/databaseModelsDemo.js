module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          len: [3, 50]  // Ensures username length is between 3 and 50 characters
        }
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true  // Ensures the email field contains a valid email address
        }
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [8, 100]  // Ensures password length is between 8 and 100 characters
        }
      },
      age: {
        type: DataTypes.INTEGER,
        allowNull: true,
        validate: {
          min: 0  // Age must be a non-negative number
        }
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true  // Default value is true
      },
      birthDate: {
        type: DataTypes.DATE,
        allowNull: true
      },
      profilePicture: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          isUrl: true  // Ensures the profilePicture field contains a valid URL
        }
      }
    }, {
      // Model options
      tableName: 'users',  // Custom table name
      timestamps: true,    // Enables createdAt and updatedAt timestamps
      paranoid: true       // Enables soft deletes (deletedAt timestamp)
    });
  
    return User;
  };
  