import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2024-04-10',
})

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
          currency: 'eur',
          product_data: { name: 'AKAD Premium Subscription' },
          unit_amount: 2999,
        },
        quantity: 1,
      },
    ],
    success_url: `${process.env.BASE_URL || 'http://localhost:3000'}/facturation`,
    cancel_url: `${process.env.BASE_URL || 'http://localhost:3000'}/premium`,
  })

  return { url: session.url }
})
