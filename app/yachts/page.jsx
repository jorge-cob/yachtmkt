import React from 'react'
import YachtCard from '@/components/YachtCard';
import { fetchYachts } from '@/utils/request';

const YachtsPage = async () => {
  const yachts = await fetchYachts();

  // Sort yachts by date
  yachts.sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt));

  return (
    <section className="px-4 py-6">
      <div className="container-xl lg:container m-auto px-4 py-6">
        { yachts.length === 0 ? ( 
          <p>No yachts found</p> 
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {yachts.map((yacht) => (
              <YachtCard key={yacht._id} yacht={yacht} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default YachtsPage;
 