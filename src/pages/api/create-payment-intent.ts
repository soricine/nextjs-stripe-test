import { NextApiRequest, NextApiResponse } from "next";
import { ItemId } from "../../types";
import { calculateOrderAmount } from "../../utils/calculateOrderAmount";

type Payload = {
  items: ItemId[];
};

type ClientSecretResponse = {
  clientSecret: string;
};

// This is your test secret API key.
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const payload: Payload = await req.body;
  const { items } = payload;

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(items),
    currency: "eur",
    // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
    automatic_payment_methods: {
      enabled: true,
    },
  });

  const response: ClientSecretResponse = {
    clientSecret: paymentIntent.client_secret,
  };
  res.json(response);
}
