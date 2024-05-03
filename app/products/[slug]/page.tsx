

import { SanityProduct } from "@/config/inventory"
import { ProductGallery } from "@/components/product-gallery"
import { ProductInfo } from "@/components/product-info"
import { Params } from "next/dist/shared/lib/router/utils/route-matcher"

interface Props {
  params: {
    slug?: string
    sku?: string
  }

}
async function GetCertainProduct(slug: string): Promise<any> {
  const results = await fetch("http://localhost:4000/products");
  const data = await results.json();
  const product = data.find((product: { sku: string }) => product.sku === slug);
  return product;
}


async function Page({ params }: { params: { slug: string } }) {
  const { slug } = params

  // console.log("the slug", slug)
  // yet not sure whichy of methods The corrected but i  do use them both yet

  const product = await GetCertainProduct(slug)

  // const certain = Products.find((product: { sku: string }) => product.sku === slug)
  // console.log("here the all products", certain)

  return (
    <main className="mx-auto max-w-5xl sm:px-6 sm:pt-16 lg:px-8">
      <div className="mx-auto max-w-2xl lg:max-w-none">
        {/* Product */}
        <div className="pb-20 lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-12">
          <ProductGallery product={product} />
          <ProductInfo product={product} />
        </div>
      </div>
    </main>
  )
}

export default Page; 
