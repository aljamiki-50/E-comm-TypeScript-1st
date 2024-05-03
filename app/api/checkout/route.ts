import { NextResponse } from "next/server"
// @ts-ignore
import { validateCartItems } from "use-shopping-cart/utilities"


import { inventory } from "@/config/inventory"
import { stripe } from "@/lib/stripe"
import Stripe from "stripe"
import { Session } from "inspector"
import next from "next"

export async function POST(request: Request) {


    //  requesting the origin headers to have a redirect in case of success or failure submission 
    const origin = request.headers.get('origin')

    // console.log(origin)

    const cartdetails = await request.json()

    // we importing the validateCartitems and passing inventory and cartdetails within it to check weather the items price exists 

    const lineitems = validateCartItems(inventory, cartdetails)

    // console.log("the line items", lineitems)

    const session = await stripe.checkout.sessions.create({
        submit_type: "pay",
        mode: "payment",
        payment_method_types: ["card"],
        line_items: lineitems,
        shipping_address_collection: {
            allowed_countries: ["US", "CA", "GB", "FR"],
        },
        shipping_options: [
            {
                shipping_rate: "shr_1PAtfLHz6EU8sF2Sqvo0NnCW"
            },
        ],
        billing_address_collection: "auto",
        success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${origin}/cart`

    })


    // console.log("hey how is the way", session)


    return NextResponse.json(session)

}

