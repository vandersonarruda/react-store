'use client'

import Image from 'next/image'
import { useState } from 'react'

interface ProductImagesProps {
  name: string
  imageUrls: string[]
}

const ProductImages = ({ imageUrls, name }: ProductImagesProps) => {
  const [currentImage, setCurrentImage] = useState(imageUrls[0])

  const handleImageClick = (imageUrl: string) => {
    setCurrentImage(imageUrl)
  }

  return (
    <div>
      <div className="flex h-[380px] w-full items-center justify-center bg-accent">
        <Image
          src={currentImage}
          alt={name}
          height={0}
          width={0}
          sizes="100vw"
          // className="h-auto max-h-[70%] w-auto max-w-[80%]"
          className="aspect-auto max-h-[80%] w-full max-w-[80%]"
          style={{
            objectFit: 'contain',
          }}
        />
      </div>

      {/* <div className="mt-4 grid grid-cols-4 gap-4 px-4"> */}
      <div className="mt-4 flex flex-row gap-4 px-4">
        {imageUrls.map((imageUrl) => (
          <button
            key={imageUrl}
            className={`flex h-[100px] w-[100px] items-center justify-center rounded-lg border-2 bg-accent transition
            ${
              imageUrl === currentImage &&
              'border-2 border-solid border-primary'
            }`}
            onClick={() => handleImageClick(imageUrl)}
          >
            <Image
              src={imageUrl}
              alt={name}
              width={0}
              height={0}
              sizes="100vw"
              // className="h-auto max-h-[70%] w-auto max-w-[80%]"
              className="aspect-auto max-h-[80%] w-full max-w-[80%]"
            />
          </button>
        ))}
      </div>
    </div>
  )
}

export default ProductImages
