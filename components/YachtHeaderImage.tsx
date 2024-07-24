import React from 'react';
import Image from 'next/image';

interface YachtHeaderImageProps {
  image: string;
}

const YachtHeaderImage: React.FC<YachtHeaderImageProps> = ({ image }) => {
  return (
    <section>
      <div className="container-xl m-auto">
        <div className="grid grid-cols-1">
          <Image
            src={image}
            alt=""
            className="object-cover h-[400px] w-full"
            width={0}
            height={0}
            sizes="100vw"
            priority
          />
        </div>
      </div>
    </section>
  );
};

export default YachtHeaderImage;