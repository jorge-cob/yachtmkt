import React from 'react'
import InfoBox from './InfoBox'


const InfoBoxes: React.FC = () => {
  return (
    <section>
    <div className="container-xl lg:container m-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg">
        <InfoBox
          heading='For Renters'
          backgroundColor='bg-gray-100'
          buttonInfo={{
            text: 'Browse yachts',
            link: '/yachts',
            backgroundColor: 'bg-black',
          }}
        >
          Find your perfect yacht. Bookmark them and contact owners.
        </InfoBox>

        <InfoBox
          heading='For Owners'
          backgroundColor='bg-blue-100'
          buttonInfo={{
            text: 'Add Yacht',
            link: '/yachts/add',
            backgroundColor: 'bg-blue-500',
          }}
        >
          List your yacht
        </InfoBox>
      </div>
    </div>
  </section>
  )
}

export default InfoBoxes;