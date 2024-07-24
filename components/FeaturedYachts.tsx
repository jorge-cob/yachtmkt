import React from 'react';
import { fetchYachts } from '@/utils/request';
import FeaturedYachtCard from '@/components/FeaturedYachtCard';
import { YachtProps } from '@/types';


const FeaturedYachts: React.FC<YachtProps> = async () => {
  const yachts = await fetchYachts({ showFeatured: true });

  return yachts.length > 0 && (
    <section className="bg-blue-50 px-4 pt-6 pb-10">
      <div className="container-xl lg:container m-auto">
        <h2 className="text-3xl font-bold text-blue-500 mb-6 text-center">
          Featured Yachts
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {yachts.map((yacht) => (
            <FeaturedYachtCard key={yacht._id} yacht={yacht} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedYachts;