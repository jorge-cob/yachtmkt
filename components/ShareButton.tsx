import React from 'react';
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  EmailShareButton,
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon,
  EmailIcon,
} from 'react-share';

interface ShareButtonsProps {
  yacht: {
    _id: string;
    name: string;
    type: string;
  };
}

const ShareButtons: React.FC<ShareButtonsProps> = ({ yacht }) => {
  const shareUrl = `${process.env.NEXT_PUBLIC_DOMAIN}/yachts/${yacht._id}`;

  return (
    <>
      <h3 className='text-xl font-bold text-center pt-2'>
        Share This Yacht:
      </h3>
      <div className='flex gap-3 justify-center pb-5'>
        <FacebookShareButton
          url={shareUrl}
          hashtag={`#${yacht.type.replace(/\s/g, '')}ForRent`}
        >
          <FacebookIcon size={40} round={true} />
        </FacebookShareButton>

        <TwitterShareButton
          url={shareUrl}
          title={yacht.name}
          hashtags={[`${yacht.type.replace(/\s/g, '')}ForRent`]}
        >
          <TwitterIcon size={40} round={true} />
        </TwitterShareButton>

        <WhatsappShareButton
          url={shareUrl}
          title={yacht.name}
          separator=':: '
        >
          <WhatsappIcon size={40} round={true} />
        </WhatsappShareButton>

        <EmailShareButton
          url={shareUrl}
          subject={yacht.name}
          body={`Check out this yacht listing: ${shareUrl}`}
        >
          <EmailIcon size={40} round={true} />
        </EmailShareButton>
      </div>
    </>
  );
};

export default ShareButtons;