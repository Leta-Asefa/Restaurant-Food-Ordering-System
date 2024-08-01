const { Op } = require('sequelize');
const { Chapa } = require('chapa-nodejs');
const chapa = new Chapa({
    secretKey: process.env.CHAPA_SECRET_KEY
});


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

exports.getPaymentPage = async (req, res) => {
    const response =await generateTransactionReference(req.body)
    if (response.status === 'success') {
        
        res.status(201).json({ checkout_url: response.data.checkout_url });
    } else {
        res.status(400).json({ error: "make sure that you entered all the required fields " });
    }

};



const generateTransactionReference = async (paymentInfo) => {
    const tx_ref = await chapa.generateTransactionReference();
   
    const response = await chapa.initialize({
        first_name: paymentInfo.firstName,
        last_name: paymentInfo.lastName,
        email: paymentInfo.email,
        currency: paymentInfo.currency,
        amount: paymentInfo.amount,
        tx_ref: tx_ref,
        callback_url: 'https://www.google.com/',
        return_url: 'https://www.facebook.com/',
        customization: {
            title: 'Food Ordering',
            description: 'Payment for the order food',
        },
    });
    response.tx_ref=tx_ref
    return response


}

const verify = async () => {
    const response = await chapa.verify({
        tx_ref: 'TX-GWR92HLIUWYBV1L',
    });

    console.log(response)
}


