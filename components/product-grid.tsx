"use client"

import Image from "next/image"
import Link from "next/link"
import { XCircle } from "lucide-react"
import { formatCurrencyString } from "use-shopping-cart"

import { SanityProduct } from "@/config/inventory"
import { shimmer, toBase64 } from "@/lib/image"

interface Props {
  products: {
    id: string;
    sku: string;
    name: string;
    description: string;
    price: number;
    image: string;
    images: string[];
    sizes: string[];
    categories: string[];
    colors: string[];
    currency: string;
  }[];
}
interface InventoryProduct {
  id: string
  name: string
  image: string
  images: string[]
  categories: string[]
  sizes: string[]
  colors: string[]
  price: number
  currency: string
  description: string
  sku: string
  currencyFormat: string
  slug: string
}

export function ProductGrid({ products }: Props) {
  console.log("here the product we lookging for", products)
  if (products.length === 0) {
    return (
      <div className="mx-auto grid h-40 w-full place-items-center rounded-md border-2 border-dashed bg-gray-50 py-10 text-center dark:bg-gray-900">
        <div>
          <XCircle className="mx-auto h-10 w-10 text-gray-500 dark:text-gray-200" />
          <h1 className="mt-2 text-xl font-bold tracking-tight text-gray-500 dark:text-gray-200 sm:text-2xl">
            No products found
          </h1>
        </div>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-3 lg:col-span-3 lg:gap-x-8">
      {products.map((product) => (

        <Link key={product.id} href={`/products/${product.sku}`} className="group text-sm">
          <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg border-2 border-gray-200 bg-gray-100 group-hover:opacity-75 dark:border-gray-800">
            <Image
              src={product.image}
              // src={urlForImage(product.image).url()}
              alt={product.name}
              width={225}
              height={280}
              className="h-full w-full object-cover object-center"
              placeholder="blur"
              blurDataURL={`data:image/svg+xml;base64,${toBase64(
                shimmer(700, 475)
              )}`}
            />
          </div>
          <h3 className="mt-4 font-medium">{product.name}</h3>
          {/* Format currecy coming from the shopping cart helper  */}
          <p className="mt-2 font-medium">{formatCurrencyString({
            value: product.price,
            currency: "GBP",
          })}</p>
        </Link>
      ))}

    </div>
  )
}
