import React, { FC } from 'react';
import YachtCard from './YachtCard';
import Pagination from './Pagination';
import { headers } from 'next/headers';
import { PaginationProps, YachtProps } from '@/types';

const Yachts: FC<{searchParams: PaginationProps}> = async ({ searchParams }) => {
  const page = typeof searchParams.page === "string" ? Number(searchParams.page) :  1;
  const pageSize =  typeof searchParams.pageSize === "string" ? Number(searchParams.pageSize) : 6;
  const host = headers().get("host");
  const protocal = process?.env.NODE_ENV==="development"?"http":"https"
  let {yachts, total} = await fetch(`${protocal}://${host}/api/yachts?page=${page}&pageSize=${pageSize}`, { cache: "no-store" }).then((res) => res.json()).then((data) => data);
  return (
    <>
    {(
      <section className="px-4 py-6">
      <div className="container-xl lg:container m-auto px-4 py-6">
        { yachts.length === 0 ? ( 
          <p>No yachts found</p> 
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {yachts.map((yacht: YachtProps) => (
              <YachtCard key={yacht._id} yacht={yacht} />
            ))}
          </div>
        )}
      </div>
      <Pagination total={total} page={page} pageSize={pageSize} />
    </section>
    )}
    </>
  );
};

export default Yachts;