import { Image as MedusaImage } from "@medusajs/medusa"
import Image from "next/image"
import { useRef } from "react"

type ImageGalleryProps = {
  image: string | null
}

const ImageGallery = ({ image }: ImageGalleryProps) => {
  const imageRefs = useRef<(HTMLDivElement | null)[]>([])

  const handleScrollTo = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest",
      })
    }
  }

  return (
    <div className="flex items-start relative">
      <div className="hidden small:flex flex-col gap-y-4 sticky top-20">
        {/* {image.map((image, index) => { */}
        <button className="h-14 w-12 relative border border-white">
          {/* <span className="sr-only">Go to image {index + 1}</span> */}
          <Image
            src={image ? image : ""}
            layout="fill"
            objectFit="cover"
            className="absolute inset-0"
            alt="Thumbnail"
          />
        </button>
        {/* })} */}
      </div>
      <div className="flex flex-col flex-1 small:mx-16 gap-y-4">
        {/* {image.map((image, index) => { */}
        <div
          ref={(image) => imageRefs.current.push(image)}
          className="relative aspect-[29/34] w-full"
        >
          <Image
            src={image ? image : ""}
            layout="fill"
            objectFit="cover"
            className="absolute inset-0"
            alt={`Product image`}
          />
        </div>
        {/* })} */}
      </div>
    </div>
  )
}

export default ImageGallery
