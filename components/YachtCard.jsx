import React from 'react'
import Image from 'next/image';
import Link from 'next/link';
import { FaBath, FaMoneyBill,FaRulerCombined, FaMapMarker, FaBed } from 'react-icons/fa';

const YachtCard = ({ yacht }) => {

  const getRateDisplay = () => {
    const { rates } = yacht;

    if (rates.monthly) {
      return `${rates.monthly.toLocaleString()}/mo`;
    } else if (rates.weekly) {
      return `${rates.weekly.toLocaleString()}/wk`;
    } else if (rates.daily) {
      return `${rates.daily.toLocaleString()}/night`;
    }
  };
  return (
    <div className="rounded-xl shadow-md relative">
      <Image
        src={yacht.images[0]}
        alt=''
        height={0}
        width={0}
        sizes='100vw'
        className='w-full h-auto rounded-t-xl'
      />
            <div className="p-4">
              <div className="text-left md:text-center lg:text-left mb-6">
                <div className="text-gray-600">{yacht.type}</div>
                <h3 className="text-xl font-bold"> {yacht.name} </h3>
              </div>

              <h3 className='absolute top-[10px] right-[10px] bg-white px-4 py-2 rounded-lg text-blue-500 font-bold text-right md:text-center lg:text-right'>
                ${getRateDisplay()}
              </h3>

          
              <div className='flex justify-center gap-4 text-gray-500 mb-4'>
                <p>
                  <FaBed className='inline mr-2' /> {yacht.beds}{' '}
                  <span className='md:hidden lg:inline'>Beds</span>
                </p>
                <p>
                  <FaBath className='inline mr-2' />
                  {yacht.baths} <span className='md:hidden lg:inline'>Baths</span>
                </p>
                <p>
                  <FaRulerCombined className='inline mr-2' />
                  {yacht.feet}{' feet'}
                  
                </p>
              </div>

              <div className='flex justify-center gap-4 text-green-900 text-sm mb-4'>
                {yacht.rates.daily && (
                  <p>
                    <FaMoneyBill className='inline mr-2' /> Daily
                  </p>
                )}

                {yacht.rates.weekly && (
                  <p>
                    <FaMoneyBill className='inline mr-2' /> Weekly
                  </p>
                )}

                {yacht.rates.monthly && (
                  <p>
                    <FaMoneyBill className='inline mr-2' /> Monthly
                  </p>
                )}
              </div>

              <div className='border border-gray-100 mb-5'></div>
              <div className='flex flex-col lg:flex-row justify-between mb-4'>
                <div className='flex align-middle gap-2 mb-4 lg:mb-0'>
                  <FaMapMarker className='text-orange-700 mt-1' />
                  <span className='text-orange-700'>
                    {' '}
                    {yacht.location.city} {yacht.location.state}{' '}
                  </span>
                </div>
                <Link
                  href={`/yachts/${yacht._id}`}
                  className='h-[36px] bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-center text-sm'
                >
                  Details
                </Link>
              </div>
            </div>
          </div>
  )
}

export default YachtCard