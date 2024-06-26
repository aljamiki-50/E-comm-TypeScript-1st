// **Client-side component**
"use client"

import { useState } from "react"
import Image from "next/image"

import { SanityProduct } from "@/config/inventory"
import { shimmer, toBase64 } from "@/lib/image"

interface Props {
  product: {
    images: string[]
  }


}

export function ProductGallery({ product }: Props) {
  console.log("the gallerey one here ", product)
  const [selectedImage, setselectedImage] = useState(0)
  return (
    <div className="flex flex-col-reverse">
      {/* Image Grid */}
      <div className="mx-auto mt-6 hidden w-full max-w-2xl sm:block lg:max-w-none">
        <ul className="grid grid-cols-4 gap-6">
          {
            product.images.map((image, index) => (
              <div
                key={index}
                onClick={() => setselectedImage(index)}
                className="relative flex h-24 cursor-pointer items-center justify-center rounded-md bg-white text-sm font-medium uppercase hover:bg-gray-50"
              >
                <span className="absolute inset-0 overflow-hidden rounded-md">
                  <Image
                    src={image}
                    width={600}
                    height={750}
                    alt=""
                    className="h-full w-full object-cover object-center"
                  />
                </span>
                {index == selectedImage && (
                  <span
                    className="pointer-events-none absolute inset-0 rounded-md ring-4 ring-indigo-500 ring-offset-2"
                    aria-hidden="true"
                  />
                )}

              </div>
            ))}
        </ul>
      </div>

      {/* Main Image */}
      <div className="aspect-h-1 aspect-w-1 w-full ">
        <Image
          priority
          src={product.images[selectedImage]}
          alt={`alt`}
          width={600}
          height={750}
          className="h-full w-full border-2 border-gray-200 object-cover object-center shadow-sm dark:border-gray-800 sm:rounded-lg"
        />
      </div>
    </div>
  )
}