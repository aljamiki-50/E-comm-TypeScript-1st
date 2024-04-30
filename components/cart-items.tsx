"use client"

import Image from "next/image"
import Link from "next/link"
import { urlForImage } from "@/sanity/lib/image"
import { Clock, X } from "lucide-react"
import { formatCurrencyString, useShoppingCart } from "use-shopping-cart"
import { Product } from "use-shopping-cart/core"

import { shimmer, toBase64 } from "@/lib/image"
import { getSizeName } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import { CartItemsEmpty } from "@/components/cart-items-empty"

export function CartItems() {
  const { cartDetails, removeItem, setItemQuantity } = useShoppingCart();
  const { toast } = useToast();



  const cartitems = Object.entries(cartDetails!).map(([_, product]) => product);
  const skutest = Object.entries(cartDetails!).map(([_, product]) => console.log("here are product has some ", product));

  //  console.log("the cart details is " , cartDetails)



  if (cartitems.length === 0) return <CartItemsEmpty />


  function removeCartItem(product: Product) {
    removeItem(product.id)
    toast({
      title: `${product.name} removed from cart`,
      description: "Product removed from cart successfully",
      variant: "destructive",

    })
  }

  return (
    <ul
      role="list"
      className="divide-y divide-gray-200 border-y border-gray-200 dark:divide-gray-500 dark:border-gray-500"
    >
      {cartitems.map((product, productIdx) => (
        <li key={product.id} className="flex py-6 sm:py-10">
          <div className="shrink-0">
            <Image
              src={product.image!}
              alt={"alt"}
              width={225}
              height={280}
              className="h-24 w-24 rounded-md border-2 border-gray-200 object-cover object-center dark:border-gray-800 sm:h-48 sm:w-48"
            />
          </div>

          <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
            <div className="relative justify-between pr-9 sm:flex sm:gap-x-6 sm:pr-0">
              <div>
                <div className="flex justify-between">
                  <h3 className="text-sm">
                    <Link href={`/products/${product?.sku}`} className="font-medium">
                      {product.name}
                    </Link>
                  </h3>
                </div>
                <p className="mt-1 text-sm font-medium">{formatCurrencyString({ value: product.price, currency: product.currency })}</p>
                <p className="mt-1 text-sm font-medium">
                  Size: {/* @ts-ignore */}
                  <strong>{getSizeName(product.product_data?.size)}</strong>
                  {/* <strong>{product.product_data?.slug}</strong> */}
                </p>
              </div>

              <div className="mt-4 sm:mt-0 sm:pr-9">
                <label htmlFor={`quantity-${productIdx}`} className="sr-only">
                  Quantity, {product.name}
                </label>
                <Input
                  id={`quantity-${productIdx}`}
                  name={`quantity-${productIdx}`}
                  type="number"
                  className="w-16"
                  min={1}
                  max={10}
                  value={product.quantity}
                  onChange={(e) => setItemQuantity(product.id, Number(e.target.value))}
                />
                <div className="absolute right-0 top-0">
                  <Button
                    variant="ghost"
                    type="button"
                    onClick={() => removeCartItem(product)
                    }
                    className="-mr-2 inline-flex p-2"
                  >
                    <span className="sr-only">Remove</span>
                    <X className="h-5 w-5" aria-hidden="true" />
                  </Button>
                </div>
              </div>
            </div>

            <p className="mt-4 flex space-x-2 text-sm">
              <Clock className="h-5 w-5 shrink-0" aria-hidden="true" />
              <span>Ships in 1 week</span>
            </p>
          </div>
        </li>
      ))}
    </ul>
  )
}
function objecetEntries(cartDetails: import("use-shopping-cart/core").CartDetails | undefined): any {
  throw new Error("Function not implemented.")
}

