import React from 'react'
import BikeCard from '@/components/BikeCard';

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

const BikesPage = async () => {
  const bikes = await fetchBikes();
  return (
    <section className="px-4 py-6">
      <div className="container-xl lg:container m-auto px-4 py-6">
        { bikes.length === 0 ? ( 
          <p>No bikes found</p> 
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {bikes.map((bike) => (
              <BikeCard key={bike._id} bike={bike} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default BikesPage;
 