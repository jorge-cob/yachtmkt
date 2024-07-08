'use client';

import React, { useState, useEffect } from 'react';
import YachtCard from './YachtCard';
import Spinner from './Spinner';
import Pagination from './Pagination';


const Yachts = () => {
  
  const [yachts, setYachts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(6);
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    const fetchYachts = async() => {
      try {
        const res = await fetch(`/api/yachts?page=${page}&pageSize=${pageSize}`);
        if(!res.ok) throw new Error('Failed to fetch data');
        const data = await res.json();
        setYachts(data.yachts);
        setTotalItems(data.total);
        
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
      
    fetchYachts();
  }, [page, pageSize]);

  // Sort yachts by date
  yachts.sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt));

  const handlePageChange = (newPage) => {
    setPage(newPage);
  } 

  return (
    <>
    { loading ? <Spinner loading={loading} /> : (
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
        <Pagination page={page} pageSize={pageSize} totalItems={totalItems} onPageChange={handlePageChange} />
      </div>
    </section>
    )}
    </>
  )
    
  
}

export default Yachts