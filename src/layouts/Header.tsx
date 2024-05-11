import { Button } from '@nextui-org/react';
import Image from 'next/image';
import Link from 'next/link';
import * as React from 'react';

const Header: React.FC = () => {
  return (
    <header className='fixed right-0 top-0 z-50 h-20 w-full bg-primary'>
      <div className='container flex h-full w-full flex-row items-center justify-between'>
        <Link href='/'>
          <Image src='/assets/logo.svg' alt='Logo' width={200} height={40} />
        </Link>

        <Button as={Link} variant='bordered' href='/login'>
          Login
        </Button>
      </div>
    </header>
  );
};

export default Header;
