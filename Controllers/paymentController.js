const { Op } = require('sequelize');

exports.getAll = async (req, res) => {
    try {
        const payment= await req.db.Payment.findAll();
        res.status(200).json(payment);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getAllById = async (req, res) => {

    try {
        const payment= await req.db.Payment.findAll({ where: { id: req.params.id } });
        res.status(200).json(payment);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getAllByDate = async (req, res) => {
    const { date } = req.params;

    try {
        const orders = await req.db.Payment.findAll({
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
        const payment= await req.db.Payment.create(req.body);
        res.status(201).json(payment);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.pay = async (req, res) => {
   
};



