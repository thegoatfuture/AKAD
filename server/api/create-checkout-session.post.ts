import Stripe from 'stripe'
import { readBody } from 'h3'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  
  const stripe = new Stripe(config.stripeSecretKey as string, {
    apiVersion: '2024-04-10',
  })

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
    success_url: `${config.public.baseUrl || 'http://localhost:3000'}/facturation`,
    cancel_url: `${config.public.baseUrl || 'http://localhost:3000'}/premium`,
  })

  return { url: session.url }
})