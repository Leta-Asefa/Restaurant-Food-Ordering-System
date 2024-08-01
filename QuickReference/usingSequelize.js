const { Op } = require('sequelize');

exports.getAllUsers = async (req, res) => {
  try {
    const users = await req.db.User.findAll({ where:{username:{[Op.like]:`%${req.params.substring}%`}}, attributes:['username','skills','email'] });
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAUser = async (req, res) => {
  
  try {
    const users = await req.db.User.findAll( { where: { id: req.params.id } , attributes:['username','skills','email'] });
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.createUser = async (req, res) => {
  try {
    const user = await req.db.User.create(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};