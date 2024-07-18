import React from 'react'
import Link from 'next/link';
import { PaginationProps } from '@/types';

const Pagination: React.FC<PaginationProps> = ({ page, pageSize, total }) => {
  const totalPages = Math.ceil(total / pageSize);
  return (
    <section className="container mx-auto flex justify-center items-center my-8">
      <Link className="mr-2 px-2 py-1 border border-gray-300 rounded" href={page === 1 ? '#' : `yachts?page=${page-1}&pageSize=${pageSize}`}>
        Previous
      </Link>
      <span className='mx-2'>
        Page {page} of {totalPages}
      </span>
      <Link
        className='ml-2 px-2 py-1 border border-gray-300 rounded' href={page === totalPages ? '#' : `yachts?page=${page+1}&pageSize=${pageSize}`}>
        Next
      </Link>
    </section>
  )
}
 
export default Pagination