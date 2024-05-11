import Image from 'next/image';
import * as React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className='mt-16 h-24 w-full bg-black'>
      <div className='container flex h-full w-full flex-row'>
        <Image src='/assets/logo.svg' alt='Logo' width={200} height={40} />
      </div>
    </footer>
  );
};

export default Footer;
