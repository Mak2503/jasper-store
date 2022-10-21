import clsx from "clsx"
import Link from "next/link"
import { ProductPreviewType } from "types/global"
import Thumbnail from "../thumbnail"

const ProductPreview = ({
  title,
  handle,
  id,
  thumbnail,
  price,
}: ProductPreviewType) => {
  return (
    <Link href={`/products/${id}`}>
      <a>
        <div>
          <Thumbnail thumbnail={thumbnail} size="full" />
          <div className="text-base-regular mt-2 flex justify-between items-start">
            <div className="flex flex-col">
              <span className="font-semibold">{title}</span>
              <span className="text-xs">{handle}</span>
            </div>
            <div className="flex items-center gap-x-2">
              {price ? (
                <>
                  {price.price_type === "sale" && (
                    <span className="line-through text-rose-500">
                      {price.original_price}
                    </span>
                  )}
                  <span
                    className={clsx("font-semibold", {
                      "text-rose-500": price.price_type === "sale",
                    })}
                  >
                    {price.calculated_price}
                  </span>
                </>
              ) : (
                <div className="w-20 h-6 animate-pulse bg-gray-100"></div>
              )}
            </div>
          </div>
        </div>
      </a>
    </Link>
  )
}

export default ProductPreview
