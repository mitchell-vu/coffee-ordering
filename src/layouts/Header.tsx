'use client';

import {
  Avatar,
  Button,
  Divider,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
} from '@nextui-org/react';
import { ShoppingCart, SignOut, User } from '@phosphor-icons/react';
import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import * as React from 'react';

const Header: React.FC = () => {
  const { status, data } = useSession();

  return (
    <header className='fixed right-0 top-0 z-50 h-20 w-full bg-primary'>
      <div className='container flex h-full w-full flex-row items-center justify-between'>
        <Link href='/' className='py-4'>
          <Image src='/assets/logo.svg' alt='Logo' width={200} height={40} />
        </Link>

        <div className='flex flex-row gap-2 '>
          {status === 'unauthenticated' && (
            <>
              <Button as={Link} variant='light' href='/register'>
                Register
              </Button>

              <Button as={Link} variant='bordered' href='/login'>
                Login
              </Button>
            </>
          )}

          <Button as={Link} variant='bordered' isIconOnly href='/cart'>
            <ShoppingCart size={20} />
          </Button>

          {status !== 'unauthenticated' && (
            <Dropdown>
              <DropdownTrigger>
                <Button isLoading={status === 'loading'} variant='bordered' isIconOnly>
                  <User size={20} />
                </Button>
              </DropdownTrigger>

              <DropdownMenu variant='faded'>
                <DropdownSection showDivider>
                  <DropdownItem>
                    <div className='flex flex-row items-center gap-2'>
                      <Avatar src={data?.user?.image ?? undefined} />

                      <span>{data?.user?.email}</span>
                    </div>
                  </DropdownItem>
                </DropdownSection>

                <DropdownSection>
                  <DropdownItem startContent={<SignOut size={20} />} onClick={() => signOut()}>
                    Logout
                  </DropdownItem>
                </DropdownSection>
              </DropdownMenu>
            </Dropdown>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
