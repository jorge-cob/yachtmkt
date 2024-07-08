import React from 'react';
import YachtCard from '@/components/YachtCard';
import Link from 'next/link';
import { fetchYachts} from '@/utils/request';


const HomeYachts = async () => {

  const data = await fetchYachts();
  const recentYachts = data.yachts
    .sort(() => Math.random() - Math.random())
    .slice(0, 3); 
  return (
    <>
      <section className="px-4 py-6">
        <div className="container-xl lg:container m-auto">
          <h2 className="text-3xl font-bold text-blue-500 mb-6 text-center">
            Recent Yachts
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recentYachts === 0 ? ( 
              <p>No yachts found</p> 
              ) : (
                recentYachts.map((recentYacht) => (
              <YachtCard key={recentYacht._id} yacht={recentYacht} />
            )))}
          </div>
        </div>
      </section>
      <section className="m-auto max-w-lg my-10 px-6">
        <Link
          href="/yachts"
          className="block bg-black text-white text-center py-4 px-6 rounded-xl hover:bg-gray-700"
        >
          View All Yachts
        </Link>
      </section>
    </>
  );
};

export default HomeYachts
