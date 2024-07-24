'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

type YachtSearchFormProps = {};

const YachtSearchForm: React.FC<YachtSearchFormProps> = () => {
  const [location, setLocation] = useState<string>('');
  const [yachtType, setYachtType] = useState<string>('All');

  const router = useRouter();

  const handleSubmit =  (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (location === '' && yachtType === 'All') {
      router.push('/yachts');
    } else {
      const query = `?location=${location}&yachtType=${yachtType}`;

      router.push(`/yachts/search${query}`);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className='mt-3 mx-auto max-w-2xl w-full flex flex-col md:flex-row items-center'
    >
      <div className='w-full md:w-3/5 md:pr-2 mb-4 md:mb-0'>
        <label htmlFor='location' className='sr-only'>
          Location
        </label>
        <input
          type='text'
          id='location'
          placeholder='Enter Keywords or Location'
          className='w-full px-4 py-3 rounded-lg bg-white text-gray-800 focus:outline-none focus:ring focus:ring-blue-500'
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </div>
      <div className='w-full md:w-2/5 md:pl-2'>
        <label htmlFor='yacht-type' className='sr-only'>
          Yacht Type
        </label>
        <select
          id='yacht-type'
          className='w-full px-4 py-3 rounded-lg bg-white text-gray-800 focus:outline-none focus:ring focus:ring-blue-500'
          value={yachtType}
          onChange={(e) => setYachtType(e.target.value)}
        >
          <option value='All'>All</option>
          <option value="Antique">Antique and Classic</option>
          <option value="Catamaran">Catamaran</option>
          <option value="Monohull">Centre Cockpit</option>
          <option value="Cruiser">Cruiser</option>
          <option value="Motorsailer">Motorsailer</option>
          <option value="Cutter">Cutter</option>
          <option value="Other">Other</option>
        </select>
      </div>
      <button
        type='submit'
        className='md:ml-4 mt-4 md:mt-0 w-full md:w-auto px-6 py-3 rounded-lg bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-500'
      >
        Search
      </button>
    </form>
  );
};
export default YachtSearchForm;