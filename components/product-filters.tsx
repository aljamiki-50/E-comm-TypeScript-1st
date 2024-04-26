"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"


import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Checkbox } from "@/components/ui/checkbox"
import { log } from "console"

const filters = [
  {
    id: "category",
    name: "Category",
    options: [
      { value: "bags", label: "Bags" },
      { value: "belts", label: "Belts" },
      { value: "gloves", label: "Gloves" },
      { value: "scarves", label: "Scarves" },
      { value: "wallets", label: "Wallets" },
    ],
  },
  {
    id: "size",
    name: "Size",
    options: [
      { value: "xs", label: "X-Small" },
      { value: "s", label: "Small" },
      { value: "m", label: "Medium" },
      { value: "l", label: "Large" },
      { value: "xl", label: "X-Large" },
      { value: "one-size", label: "One Size" },
    ],
  },
  {
    id: "color",
    name: "Color",
    options: [
      { value: "black", label: "Black" },
      { value: "blue", label: "Blue" },
      { value: "brown", label: "Brown" },
      { value: "green", label: "Green" },
      { value: "yellow", label: "Yellow" },
    ],
  },
]

export function ProductFilters() {
  // getting The search Param to be later Manipulated
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()
  // so here we trying forward to keep an eye within our param url if it  has any of checkbox in a url so we would let the box still be checked out 
  const searchvalues = Array.from(searchParams)

  // console.log("here the search param is ", )

  // console.log("The current route name is:", pathname);
  // console.log("the search param is ", Array.from(searchParams.values()))
  return (
    <form className="sticky top-20">
      <h3 className=" sr-only">Categories</h3>

      {filters.map((section, i) => (
        <Accordion key={i} type="single" collapsible>
          <AccordionItem value={`item-${i}`}>
            <AccordionTrigger>
              <span>
                {section.name}
                <span className="ml-1 text-xs font-extrabold uppercase text-gray-400 right-3 ring-red-400">
                  {searchParams.get(section.id) ? `(${searchParams.get(section.id)})` : " "}
                </span> 
              </span>
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4">
                {section.options.map((option, optionidx) => (
                  <div
                    key={option.value}
                    className="flex items-center space-x-2"
                  >
                    <Checkbox
                      id={`filter-${section.id} - ${optionidx}`}
                      // we used the checked here also which evalutes true to hook  the  key value from the url in case refresh happened that our box still remains ticked 
                      // we destruct key and value because searchParams.values() returns an array of key value pairs
                      checked={searchvalues.some(
                        ([key, values]) => key === section.id && values === option.value
                      )}


                      onClick={(event) => {
                        //  event.preventDefault()
                        const params = new URLSearchParams(searchParams)
                        const checked = event.currentTarget.dataset.state === "checked"

                        checked ? params.delete(section.id) : params.set(section.id, option.value)
                        router.push(pathname + "?" + params.toString())

                        // console.log(checked)
                        // console.log("here the params one ", Array.from(params.keys()))
                        //  console.log(event.currentTarget.dataset.state)
                        // console.log(event.currentTarget)
                      }}
                    />
                    <label
                      htmlFor={`filter-${section.id} - ${optionidx}`}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {option.label}
                    </label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      ))}
    </form>
  )
}
function arrayfrom(arg0: IterableIterator<string>): any {
  throw new Error("Function not implemented.")
}

