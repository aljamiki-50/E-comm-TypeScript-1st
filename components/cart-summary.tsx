"use client"

import { useState } from "react"
import { Loader2 } from "lucide-react"
import { formatCurrencyString, useShoppingCart } from "use-shopping-cart"

import { Button } from "@/components/ui/button"
import { redirect } from "next/dist/server/api-utils"
import { loadStripe, Stripe } from '@stripe/stripe-js';

export function CartSummary() {
  const {
    formattedTotalPrice,
    totalPrice,
    cartDetails,
    cartCount,
    redirectToCheckout,
  } = useShoppingCart()
  const shippingamount = cartCount! > 0 ? 500 : 0
  const totalamount = totalPrice! + shippingamount

  const [isloading, setIsLoading] = useState(false)
  const isDisabled = isloading || cartCount === 0

  const stripePromise: Promise<Stripe | null> = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!
  )


  // console.log(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY)

  async function onCheckout() {
    setIsLoading(true)
    const Stripe = await stripePromise
    //  console.log("here the stripe ", Stripe)
    const response = await fetch("/api/checkout", {
      method: "POST",
      body: JSON.stringify(cartDetails),
    })

    const data = await response.json()
    if (cartCount) {
      try {
        const result = await Stripe?.redirectToCheckout({ sessionId: data.id })

        if (result?.error) {
          console.error(result.error)
        }
      } catch (error) {
        console.error(error)
      }
    }
  }

  return (
    <section
      aria-labelledby="summary-heading"
      className="mt-16 rounded-lg border-2 border-gray-200 bg-gray-50 px-4 py-6 shadow-md dark:border-gray-900 dark:bg-black sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8"
    >
      <h2 id="summary-heading" className="text-lg font-medium">
        Order summary
      </h2>

      <dl className="mt-6 space-y-4">
        <div className="flex items-center justify-between">
          <dt className="text-sm">{formattedTotalPrice}</dt>
          <dd className="text-sm font-medium">Subtotal Amount</dd>
        </div>
        <div className="flex items-center justify-between border-t border-gray-200 pt-4 dark:border-gray-600">
          <dt className="flex items-center text-sm">
            <span>Shipping estimate</span>
          </dt>
          <dd className="text-sm font-medium">
            {formatCurrencyString({ value: shippingamount, currency: "usd" })}
          </dd>
        </div>
        <div className="flex items-center justify-between border-t border-gray-200 pt-4 dark:border-gray-600">
          <dt className="text-base font-medium">Order total</dt>
          <dd className="text-base font-medium">
            {formatCurrencyString({ value: totalamount, currency: "usd" })}
          </dd>
        </div>
      </dl>

      <div className="mt-6">
        <Button onClick={onCheckout} disabled={isDisabled} className="w-full">
          {isloading && <Loader2 />}
          {isloading ? "Loading..." : "Checkout"}
        </Button>
      </div>
    </section>
  )
}
