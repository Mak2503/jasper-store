/* eslint-disable @next/next/no-img-element */
import { ProductProvider } from "@lib/context/product-context"
import { useIntersection } from "@lib/hooks/use-in-view"
import { Product } from "@medusajs/medusa"
import ProductTabs from "@modules/products/components/product-tabs"
import RelatedProducts from "@modules/products/components/related-products"
import ProductInfo from "@modules/products/templates/product-info"
import Image from "next/image"
import React, { useRef } from "react"
import ImageGallery from "../components/image-gallary"
import MobileActions from "../components/mobile-actions"

type ProductTemplateProps = {
  product: Product
}

const ProductTemplate: React.FC<ProductTemplateProps> = ({ product }) => {
  const info = useRef<HTMLDivElement>(null)

  const inView = useIntersection(info, "0px")

  return (
    <ProductProvider product={product}>
      <div className="flex flex-col small:flex-row small:items-start relative">
        <div className="flex flex-col px-8 mt-6 gap-y-8 w-full h-80 max-h-96">
          <img
            style={{ height: "100%" }}
            className="rounded-xl"
            src={product.thumbnail || ""}
            alt={product.thumbnail || ""}
          />
        </div>
        <div
          className="small:sticky small:top-20 w-full small:py-0 small:max-w-[344px] medium:max-w-[400px] flex flex-col gap-y-12"
          ref={info}
        >
          <ProductInfo product={product} />
          {/* <ProductTabs product={product} /> */}
        </div>
      </div>
      {/* <div className="content-container my-16 px-6 small:px-8 small:my-32">
        <RelatedProducts product={product} />
      </div> */}
      <MobileActions product={product} show={!inView} />
    </ProductProvider>
  )
}

export default ProductTemplate
