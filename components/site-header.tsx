"use client"

import Link from "next/link"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { Edit, ShoppingBag } from "lucide-react"
import { useShoppingCart } from "use-shopping-cart"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MainNav } from "@/components/main-nav"
import { ThemeToggle } from "@/components/theme-toggle"
import { log } from "util"
import React from "react"

export function SiteHeader() {

  const { cartCount } = useShoppingCart()
  const pathname = usePathname()
  const router = useRouter()
  const searchParams = useSearchParams()
  const DefaultSearchValue = searchParams.get('search') || ''

  //  console.log("it s the default search value:- ", DefaultSearchValue)


  function onsubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    console.log("it s the event been consoled:- ", event.currentTarget.search.value)
    // so the formData here is acting or create key value object for our search query 
    const formData = new FormData(event.currentTarget)
    const searchQuery = formData.get('search')
    router.replace(`/?search=${searchQuery}`)

    console.log("let me log the search query here ", searchQuery)

    // console.log("her the form data mate", Array.from(formData.entries()))
  }

  if (pathname.startsWith("/studio")) {
    return null
  }

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between space-x-4 px-6 sm:space-x-0">
        <MainNav />
        <form
          onSubmit={onsubmit}
          className="hidden items-center lg:inline-flex">
          <Input
            id="search"
            name="search"
            type="search"
            autoComplete="off"
            placeholder="Search products..."
            defaultValue={DefaultSearchValue}
            className="h-9 lg:w-[300px]"
          />
        </form>
        <div className="flex items-center space-x-1">
          <Link href="/cart">
            <Button as="button" size="sm" variant="ghost">
              <ShoppingBag className="h-5 w-5" />
              <span className="ml-2 text-sm font-bold">{cartCount}</span>
              <span className="sr-only">Cart</span>
            </Button>
          </Link>
          <ThemeToggle />
          {process.env.NODE_ENV === "development" && (
            <Link href={"/studio"}>
              <Button as="button" size="sm" variant="ghost">
                <Edit className="h-5 w-5" />
              </Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  )
}
