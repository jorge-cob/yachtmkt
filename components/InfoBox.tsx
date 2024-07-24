import React, { FC } from 'react';

interface ButtonInfo {
  text: string;
  link: string;
  backgroundColor: string;
}

interface InfoBoxProps {
  heading: string;
  backgroundColor?: string;
  textColor?: string;
  buttonInfo: ButtonInfo;
  children: React.ReactNode;
}

const InfoBox: FC<InfoBoxProps> = ({ 
  heading,
  backgroundColor = 'bg-gray-100',
  textColor = 'text-gray-800',
  buttonInfo,
  children
}) => {
  return (
    <div className={`${backgroundColor} p-6 rounder-lg shadow-md`}>
      <h2 className={`${textColor} text-2xl font-bold`}>{heading}</h2>
      <p className={`${textColor} mt-2 mb-4`}>{children}</p>
      <a
        href={buttonInfo.link}
        className={`inline-block ${backgroundColor} ${textColor} rounded-lg px-4 py-2 hover:opacity-80`}
      >
        {buttonInfo.text}
      </a>
    </div>
  )
}

export default InfoBox;
