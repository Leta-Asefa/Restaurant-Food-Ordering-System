const { Chapa } = require('chapa-nodejs');



const chapa = new Chapa({
    secretKey: 'CHASECK_TEST-JUSxqEFFUhqX8iGieDxpL15w4YQ7Hemc'
});


const generateTransactionReference = async () => {
    const tx_ref = await chapa.generateTransactionReference();
   
    console.log(tx_ref)
   
    const response = await chapa.initialize({
        first_name: 'Abebe',
        last_name: 'Teka',
        email: 'abe@gmail.com',
        currency: 'ETB',
        amount: '200',
        tx_ref: tx_ref,
        callback_url: 'https://www.google.com/',
        return_url: 'https://www.facebook.com/',
        customization: {
            title: 'Test Title',
            description: 'Test Description',
        },
    });

    console.log(response)




}



const verify = async () => {
    const response = await chapa.verify({
        tx_ref: 'TX-GWR92HLIUWYBV1L',
    });

    console.log(response)
}

generateTransactionReference()
verify()




















