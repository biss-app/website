import Stripe from 'stripe';

if(!process.env.STRIPE_SECRET_KEY) {
  throw new Error("La clé secrète Stripe (STRIPE_SECRET_KEY) n'est pas configurée.");
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export default stripe;