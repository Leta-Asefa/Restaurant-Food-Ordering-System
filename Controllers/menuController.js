const { Op } = require('sequelize');

exports.getAll = async (req, res) => {
    try {
        const menu = await req.db.Menu.findAll();
        res.status(200).json(menu);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getAllById = async (req, res) => {

    try {
        const menu = await req.db.Menu.findAll({ where: { id: req.params.id } });
        res.status(200).json(menu);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getAllBySubstring = async (req, res) => {

     
    try {
        const menu = await req.db.Menu.findAll({ where: { englishName: { [Op.like]: `%${req.params.substring}%` } } });
        res.status(200).json(menu);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.add = async (req, res) => {
    try {
        const menu = await req.db.Menu.create(req.body);
        res.status(201).json(menu);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.updateById = async (req, res) => {
    const { updateData } = req.body;
    // {  the json updateData should be sent in this format
    //     "updateData":{
    //         "englishName":"Beef",
    //         "amharicName":"የበሬ ስጋ",
    //         "price":400
    //     }
    // }
    const id = req.params.id

    try {
        const menu = await req.db.Menu.update(updateData, {
            where: {
                id: id
            }
        });

        if (menu[0] === 0) {
            // No rows were updated
            res.status(404).send('Menu item not found');
        } else {
            res.send('Menu item updated successfully');
        }

    } catch (error) {
        res.status(400).json({ error: error.message });
    }

};
