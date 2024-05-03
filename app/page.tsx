import { siteConfig } from "@/config/site"
import { ProductFilters } from "@/components/product-filters"
import { ProductGrid } from "@/components/product-grid"
// import { GetProducts } from "@/lib/api"
import { ProductSort } from "@/components/product-sort"
import { use } from "react"

// interface props {
//   filter?: any
//   slug?: string;
//   searchParams: {
//     price: string
//     date: string
//     category: string
//     color: string[] | string
//     size: string
//     search?: string
//   }
//   products: any[]
// }

interface props {
  searchParams: {
    price: string
    date: string
    category: string
    color: string[] | string
    size: string
    search?: string
  }
}


const API_URL = 'http://localhost:4000' || process.env.NEXT_PUBLIC_API_URL;



async function GetProducts(Price: any): Promise<any[]> {
  console.log("the API URL is: ", API_URL)


  await new Promise((resolve) => setTimeout(resolve, 3000)); // Simulating a delay for demonstration purposes
  const result = await fetch(`${API_URL}/products`);
  await new Promise((resolve) => setTimeout(resolve, 3000)); // Simulating a delay for demonstration purposes

  const Products = await result.json();


  const sortedProducts = Products.sort((a: any, b: any) => {
    if (Price === "asc") {
      return a.price - b.price;
    } else if (Price === "desc") {
      return b.price - a.price;
    } else {
      return 0;
    }
  });



  return sortedProducts;
}




async function Home({ searchParams }: props): Promise<JSX.Element> {
  const { search = "", price = "", date = "desc", category = "", color = "", size = "" } = searchParams

  const Price = price ? price : date ? date : " "

  const products = await GetProducts(Price)

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

  // console.log("the sorted products", sorted)


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
            {/* You need to implement ProductSort component */}
            <ProductSort />
          </div>

          <section aria-labelledby="products-heading" className="pb-24 pt-6">
            <h2 id="products-heading" className="sr-only">
              Products
            </h2>
            <div
              className={`${products?.length === 0 ? "lg:grid-cols-4" : "lg:grid-cols-[1fr_3fr]"}  grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4`}
            >
              <div className="hidden lg:block">
                {/* You need to implement ProductFilters component */}
                <ProductFilters />
              </div>
              <div className="">
                < ProductGrid products={sorted} />
              </div>
            </div>
          </section>
        </main>
      </div>
    </div >
  )
}
export default Home;
