import { useProductActions } from "@lib/context/product-context"
import useProductPrice from "@lib/hooks/use-product-price"
import Button from "@modules/common/components/button"
import OptionSelect from "@modules/products/components/option-select"
import clsx from "clsx"
import Link from "next/link"
import React, { useMemo } from "react"
import { Product } from "types/medusa"

type ProductActionsProps = {
  product: Product
}

const ProductActions: React.FC<ProductActionsProps> = ({ product }) => {
  const { updateOptions, addToCart, options, inStock, variant } =
    useProductActions()

  const price = useProductPrice({ id: product.id, variantId: variant?.id })

  const selectedPrice = useMemo(() => {
    const { variantPrice, cheapestPrice } = price

    return variantPrice || cheapestPrice || null
  }, [price])

  return (
    <div className="flex justify-between bg-white px-8 py-2 mt-8 rounded-t-3xl">
      {/* {product.collection && (
        <Link href={`/collections/${product.collection.id}`}>
          <a className="text-small-regular text-gray-700">
            {product.collection.title}
          </a>
        </Link>
      )} */}
      <div>
        <h3 className="text-base">{product.title}</h3>
        <p className="text-xs text-gray-500">{product.subtitle}</p>
        <div className="mb-4 mt-2">
          {selectedPrice ? (
            <div className="flex flex-col text-gray-700">
              <span
                className={clsx("text-xl-semi", {
                  "text-rose-600": selectedPrice.price_type === "sale",
                })}
              >
                {selectedPrice.calculated_price}
              </span>
              {selectedPrice.price_type === "sale" && (
                <>
                  <p>
                    <span className="text-gray-500">Original: </span>
                    <span className="line-through">
                      {selectedPrice.original_price}
                    </span>
                  </p>
                  <span className="text-rose-600">
                    -{selectedPrice.percentage_diff}%
                  </span>
                </>
              )}
            </div>
          ) : (
            <div></div>
          )}
        </div>
      </div>
      <div>
        {product.variants.length > 1 && (
          <div className="flex flex-col mb-3">
            {product.options.map((option) => {
              return (
                <div key={option.id}>
                  <OptionSelect
                    option={option}
                    current={options[option.id]}
                    updateOption={updateOptions}
                    title={option.title}
                  />
                </div>
              )
            })}
          </div>
        )}
        <Button onClick={addToCart} className="rounded-2xl">
          {!inStock ? "Out of stock" : "Add to Cart"}
        </Button>
      </div>
    </div>
  )
}

export default ProductActions
