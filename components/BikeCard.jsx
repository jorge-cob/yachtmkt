import React from 'react'
import Image from 'next/image';
import Link from 'next/link';
import { FaBicycle, FaWeightHanging,FaRulerCombined, FaMapMarker } from 'react-icons/fa';

const BikeCard = ({ bike }) => {
  const {
    _id,
    name,
    type,
    location,
    price,
    weight,
    size,
    gears,
    images,
    color
  } = bike;


  return (
    <div className="rounded-xl shadow-md relative">
      <Image
        src={`/images/bikes/${images[0]}`}
        alt=""
        height={0}
        width={0}
        size='100vw'
        className='w-full h-auto rounded-t-xl'
      />
            <div className="p-4">
              <div className="text-left md:text-center lg:text-left mb-6">
                <div className="text-gray-600">{type}</div>
                <h3 className="text-xl font-bold"> {name} </h3>
              </div>
              <h3
                className="absolute top-[10px] right-[10px] bg-white px-4 py-2 rounded-lg text-blue-500 font-bold text-right md:text-center lg:text-right"
              >
                {price} €
              </h3>

              <div className="flex justify-center gap-4 text-gray-500 mb-4">
                <p>
                  <FaWeightHanging className="inline mr-2 mb-1" />{weight} kg
                  
                </p>
                <p>
                  <FaRulerCombined className="inline mr-2 mb-1" />Size {size}
                </p>
              </div>

              <div
                className="flex justify-center gap-4 text-green-900 text-sm mb-4"
              >
                { gears.front > 0 && <p><FaBicycle className="inline mr-2 mb-1" /> Front gears: {gears.front} </p> }
                { gears.rear > 0 && <p> Rear gears: {gears.rear} </p> }
              </div>

              <div className="border border-gray-100 mb-5"></div>

              <div className="flex flex-col lg:flex-row justify-between mb-4">
                <div className="flex align-middle gap-2 mb-4 lg:mb-0">
                  <FaMapMarker className="text-orange-700" />
                  <span className="text-orange-700"> {location.city}  {location.state} </span>
                </div>
                <Link
                  href={`/bikes/${_id}`}
                  className="h-[36px] bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-center text-sm"
                >
                  Details
                </Link>
              </div>
            </div>
          </div>
  )
}

export default BikeCard