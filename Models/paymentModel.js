module.exports = (sequelize, DataTypes) => {
    const Payment = sequelize.define('Payment', {
        payorName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        payorPhone: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [4, 13] // Phone number must be between 4 and 13 characters
            }
        },
        amount: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
            validate: {
                min: 0
            }
        },
        currency: {
            type: DataTypes.ENUM,
            values: ['ETB', 'USD'],
            allowNull: false
        },
        orderId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Orders', // Assuming you have an Orders model
                key: 'id'
            }
        }
    }, {
        indexes: [
            {
                fields: ['createdAt']
            }
        ]
    });

    Payment.associate = (models) => {
        Payment.belongsTo(models.Order, { foreignKey: 'orderId' });
    };

    return Payment;
};
