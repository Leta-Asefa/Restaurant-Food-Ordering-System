const { Op } = require('sequelize');

exports.getAll = async (req, res) => {
    try {
        const order = await req.db.Order.findAll();
        res.status(200).json(order);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getAllById = async (req, res) => {

    try {
        const order = await req.db.Order.findAll({ where: { id: req.params.id } });
        res.status(200).json(order);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getAllByStatus = async (req, res) => {

    try {
        const order = await req.db.Order.findAll({ where: { status: req.params.status } });
        res.status(200).json(order);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getAllByPhone = async (req, res) => {


    try {
        const order = await req.db.Order.findAll({ where: { customerPhone: req.params.phone } });
        res.status(200).json(order);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getAllByDate = async (req, res) => {
    const { date } = req.params;

    try {
        const orders = await req.db.Order.findAll({
            where: {
                createdAt: {
                    [Op.gte]: new Date(date), // Start of the date
                    [Op.lt]: new Date(new Date(date).setDate(new Date(date).getDate() + 1)) // End of the date
                }
            },
            order: [['createdAt', 'ASC']] // Sort by createdAt in ascending order
        });
        res.status(200).json(orders);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


exports.add = async (req, res) => {
    try {
        const order = await req.db.Order.create(req.body);
        res.status(201).json(order);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};



exports.updateById = async (req, res) => {
    const { updatedOrders } = req.body;
    const id = req.params.id;

    // Check if the orders field is provided
    if (!updatedOrders) {
        return res.status(400).send('Orders field is required');
    }

    try {
        const [affectedRows] = await req.db.Order.update(
            { orders: updatedOrders },  // Update only the orders column
            {
                where: {
                    id: id
                }
            }
        );

        if (affectedRows === 0) {
            // No rows were updated
            res.status(404).send('Order not found');
        } else {
            res.send('Order updated successfully');
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};






