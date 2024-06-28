import React from 'react';
import Image from 'next/image';

const YachtImages = ({ images }) => {
  return <section className="bg-blue-50 p-4">
    <div className="container mx-auto">
      {images.length === 1 ? (
        <Image
          src={images[0]}
          alt=''
          height={400}
          width={1800}
          className='object-cover h-[400px] mx-auto roundex-xl'
          priority={true}
        />
      ) : (
        <div className="grid grid-cols-2 gap-4">
          {images.map((image, index) => (
            <div
              key={index}
              className={`
                ${images.length === 3 && index === 2 
                ? 'col-span-2'
              : 'col-span-1'}
            `}>
                <Image
                  src={image}
                  alt=''
                  height={0}
                  width={0}
                  className='object-cover h-[400px] w-full roundex-xl'
                  priority={true}
                  sizes='100vw'
                />
            </div>
          ))}
        </div>
      )}
    </div>
  </section>
}

export default YachtImages;
