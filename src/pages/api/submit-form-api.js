// This is your test secret API key.
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// const calculateOrderAmount = (items) => {
//    Replace this constant with a calculation of the order's amount
//    Calculate the order total on the server to prevent
//    people from directly manipulating the amount on the client
//   return 1400;
// };

export default async function handler(req, res) {
  const { items } = req.body;
  // Create a submitIntent with the order amount and currency
  //  const submitIntent = await stripe.submitIntents.create({
    // amount: calculateOrderAmount(items),
    // currency: "eur",
    
  //   automatic_send_items: {
  //     enabled: true,
  //   },
  //  });



   res.send({
  //   clientSecret: submitIntent.client_secret,
   });

};