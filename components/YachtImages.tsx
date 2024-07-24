import React from 'react';
import Image from 'next/image';
import { Gallery, Item } from 'react-photoswipe-gallery';

interface YachtImagesProps {
  images: string[];
}

const YachtImages: React.FC<YachtImagesProps> = ({ images }) => {
  return (
    <Gallery>
      <section className="bg-blue-50 p-4">
        <div className="container mx-auto">
          {images.length === 1 ? (
            <Item
              original={images[0]}
              thumbnail={images[0]}
              width={1000}
              height={600}
            >
              {({ ref, open }) => (
                <Image
                  ref={ref}
                  onClick={open}
                  src={images[0]}
                  alt=""
                  height={400}
                  width={1800}
                  className="object-cover h-[400px] mx-auto rounded-xl"
                  priority
                />
              )}
            </Item>
          ) : (
            <div className="grid grid-cols-2 gap-4">
              {images.map((image, index) => (
                <div
                  key={index}
                  className={`
                    ${images.length === 3 && index === 2
                    ? 'col-span-2'
                    : 'col-span-1'}
                  `}
                >
                  <Item
                    original={image}
                    thumbnail={image}
                    width={1000}
                    height={600}
                  >
                    {({ ref, open }) => (
                      <Image
                        ref={ref}
                        onClick={open}
                        src={image}
                        alt=""
                        height={200}
                        width={300}
                        className="object-cover h-[200px] mx-auto rounded-xl"
                        priority
                      />
                    )}
                  </Item>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </Gallery>
  );
};

export default YachtImages;