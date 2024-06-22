import React from 'react';
import BikeCard from '@/components/BikeCard';
import Link from 'next/link';

async function fetchBikes() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_DOMAIN}/bikes`);
    if (!res.ok) throw new Error('Failed to fetch data');
    const data = res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

const HomeBikes = async () => {

  const bikes = await fetchBikes();
  const recentBikes = bikes
    .sort(() => Math.random() - Math.random())
    .slice(0, 3); 
  return (
    <>
      <section className="px-4 py-6">
        <div className="container-xl lg:container m-auto">
          <h2 className="text-3xl font-bold text-blue-500 mb-6 text-center">
            Recent Bikes
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recentBikes === 0 ? ( 
              <p>No bikes found</p> 
              ) : (
                recentBikes.map((recentBike) => (
              <BikeCard key={recentBike._id} bike={recentBike} />
            )))}
          </div>
        </div>
      </section>
      <section className="m-auto max-w-lg my-10 px-6">
        <Link
          href="/bikes"
          className="block bg-black text-white text-center py-4 px-6 rounded-xl hover:bg-gray-700"
        >
          View All Bikes
        </Link>
      </section>
    </>
  );
};

export default HomeBikes
