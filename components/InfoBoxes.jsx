import React from 'react'
import InfoBox from './InfoBox'

const infoBoxes = () => {
  return (
    <section>
    <div className="container-xl lg:container m-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg">
        <InfoBox
          heading='For Donnors'
          backgroundColor='bg-gray-100'
          buttonInfo={{
            text: 'Browse parts',
            link: '/freebies',
            backgroundColor: 'bg-black',
          }}
          
        >
          Find your spare parts you need. Bookmark them and contact owners.
        </InfoBox>

        <InfoBox
          heading='For Takers'
          backgroundColor='bg-blue-100'
          buttonInfo={{
            text: 'Add part',
            link: '/add-property.html',
            backgroundColor: 'bg-blue-500',
          }}
        >
          List your spare parts and earn points.
        </InfoBox>
      </div>
    </div>
  </section>
  )
}

export default infoBoxes