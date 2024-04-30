import { client } from "@/sanity/lib/client"
import { groq } from "next-sanity"
// import styled from 'styled-components';
import { retry } from 'get-it/middleware';


import { SanityProduct } from "@/config/inventory"
import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { ProductFilters } from "@/components/product-filters"
import { ProductGrid } from "@/components/product-grid"
import { ProductSort } from "@/components/product-sort"
import { seedSanityData } from "@/lib/seed"

interface Props {
  filter?: any
  searchParams: {
    price: string
    date: string
    category: string
    color: string[]
    size: string
    search?: string
  }


  products: SanityProduct[]
}



async function GetProducts(Price: any) {
  // console.log(" oh really ", Price)

  const result = await fetch("http://localhost:4000/products")
  // create an await resole as we fetching from our local api here so we could wait for the data to be fetched
  await new Promise((resolve) => setTimeout(resolve, 3000));

  const Products = await result.json()



  const sortedProducts = Products.sort((a: any, b: any) => {
    if (Price === "asc") {
      return a.price - b.price
    } else if (Price === "desc") {
      return b.price - a.price
    } else {
      return 0
    }
  })

  return sortedProducts

}


export default async function Page(params: Props) {
  const { search = "", price = "", date = "desc", category = "", color = "", size = "" } = params.searchParams

  // console.log("oh really ", size)





  const Price = price ? price : date ? date : " "

  const products = await GetProducts(`${Price}`)



  const sorted = products.filter((product: any) => {


    if (search) {
      if (color) {
        return product.name.toLowerCase().includes(search.toLowerCase()) && product.colors == `${color}`

      }
      return (
        product.name.toLowerCase().includes(search.toLowerCase()) || product.name.toLowerCase() == `${search.toLowerCase()}` ||
        product.description.toLowerCase().includes(search.toLowerCase()) || product.description.toLowerCase() == `${search.toLowerCase()}` ||
        product.categories.includes(search.toLowerCase()) || product.categories == `${search.toLowerCase()}` ||
        product.colors.includes(search.toLowerCase())
      );


    }


    if (category) {
      return product.categories == `${category}`
      if (color) {
        return product.categories == `${category}` && product.colors == `${color}`
      } else if (size) {
        return product.categories == `${category}` && product.colors == `${color}` && product.size == `${size}`;
      }
      return (
        product.categories == `${category}`
      );
    } else {
      return true;
    }
  });

  // console.log("her is the ",sorted)
  // console.log("her is the products ",products)










  // const one = products.find((product: any) => product.categories == `${category}`)

  // console.log("here the one been chooosed ", one)
  // console.log(category)


  // console.log(Products)




  return (
    <div>
      <div className="px-4 pt-20 text-center">
        <h1 className="uppercase text-4xl font-extrabold tracking-normal">
          {siteConfig.name}
        </h1>
        <p className="mx-auto mt-4 max-w-3xl text-base">
          {siteConfig.description}
        </p>
      </div>
      <div>
        <main className="mx-auto max-w-6xl px-6">
          <div className="flex items-center justify-between border-b border-gray-200 pb-4 pt-24 dark:border-gray-800">
            <h1 className="text-xl font-bold tracking-tight sm:text-2xl">
              {products.length} product {products.length === 1 ? "" : "s"}
            </h1>
            <ProductSort />
          </div>

          <section aria-labelledby="products-heading" className="pb-24 pt-6">
            <h2 id="products-heading" className="sr-only">
              Products
            </h2>
            <div
              className={cn(
                "grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4",
                products?.length === 0
                  ? "lg:grid-cols-4"
                  : "lg:grid-cols-[1fr_3fr]"
              )}
            >
              <div className="hidden lg:block">
                <ProductFilters />
              </div>
              <div className="">
                < ProductGrid products={sorted} />

              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}
function elseif(arg0: boolean) {
  throw new Error("Function not implemented.");
}

