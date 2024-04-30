"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { formatCurrencyString, useShoppingCart } from "use-shopping-cart"

import { SanityProduct } from "@/config/inventory"
import { getSizeName } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"

interface Props {
  product: SanityProduct
  // prdoduct:{

  // }
}

export function ProductInfo({ product }: Props) {
  const [selectedsize, setSelectedsize] = useState(product.sizes[0])
  const [sku, setSku] = useState("")
  const { addItem, cartDetails, incrementItem } = useShoppingCart()
  const isInCart = !!cartDetails?.[product._id]
  const { toast } = useToast()

  function addToCart(e: any) {
    const item = {
      ...product,
      product_data: {
        size: selectedsize,
        slug: sku,
      },
    }

    //  console.log("the item been added to cart is: ", item);

    isInCart ? incrementItem(item?._id) : addItem(item)
    toast({
      title: `${item.name} (${getSizeName(selectedsize)}) "added to cart!"`,
      description: "Product added to cart successfully",
      action: (
        <Link href="/cart">
          <Button variant={"link"} className=" gap-x-2 whitespace-nowrap">
            <span>open Cart</span>
            <ArrowRight className="h-5 w-5 text-gray-500" />
          </Button>
        </Link>
      ),
    })
  }

  return (
    <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
      <h1 className="text-3xl font-bold tracking-tight">{product.name}</h1>

      <div className="mt-3">
        <h2 className="sr-only">{product.description}</h2>
        <p className="text-3xl tracking-tight">
          {formatCurrencyString({
            value: product.price,
            currency: product.currency,
          })}
        </p>
      </div>

      <div className="mt-6">
        <h3 className="sr-only">Description</h3>
        <div className="space-y-6 text-base">{product.description}</div>
      </div>

      <div className="mt-4">
        {/* <p>{product.sku}</p> */}
        <p>
          Size: <strong>{getSizeName(selectedsize)}</strong>
        </p>
        {product.sizes.map((size) => (
          <Button
            onClick={() => setSelectedsize(size)}
            key={size}
            variant={selectedsize === size ? "default" : "outline"}
            className="mr-2 mt-4"
          >
            {getSizeName(size)}
          </Button>
        ))}
      </div>

      <form className="mt-6">
        <div className="mt-4 flex">
          <Button
            onClick={(e) => {
              setSku(product.sku)
              console.log("the sku is  ", sku)
              addToCart(e)
            }}
            type="button"
            className="w-full bg-violet-600 py-6 text-base font-medium text-white hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-violet-500"
          >
            Add to cart
          </Button>
        </div>
      </form>
    </div>
  )
}
