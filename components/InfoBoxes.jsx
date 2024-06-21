import React from 'react'
import InfoBox from './InfoBox'

const infoBoxes = () => {
  return (
    <section>
    <div className="container-xl lg:container m-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg">
        <InfoBox
          heading='For Sellers'
          backgroundColor='bg-gray-100'
          buttonInfo={{
            text: 'Browse bikes',
            link: '/bikes',
            backgroundColor: 'bg-black',
          }}
          
        >
          Find your perfect bike. Bookmark them and contact owners.
        </InfoBox>

        <InfoBox
          heading='For Buyers'
          backgroundColor='bg-blue-100'
          buttonInfo={{
            text: 'Add Bike',
            link: '/bikes/add',
            backgroundColor: 'bg-blue-500',
          }}
        >
          List your bike
        </InfoBox>
      </div>
    </div>
  </section>
  )
}

export default infoBoxes