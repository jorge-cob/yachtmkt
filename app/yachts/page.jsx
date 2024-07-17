import React from 'react'
import Yachts from '@/components/Yachts';
import YachtSearchForm from '@/components/YachtSearchForm';

const YachtsPage = async ({ searchParams }) => {
    return (
    <>
      <section className="px-4 py-6">
      <div className="container-xl lg:container m-auto px-4 py-6">
        <YachtSearchForm />
        <Yachts searchParams={searchParams} />
      </div>
    </section>

    </>
    
  );
};

export default YachtsPage;
 