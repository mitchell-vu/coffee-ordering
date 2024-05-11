'use client';

import { Button, Divider, Input, Tooltip } from '@nextui-org/react';
import * as React from 'react';
import { Eye, EyeClosed } from '@phosphor-icons/react';

const Login: React.FC = () => {
  const [showPassword, setShowPassword] = React.useState(false);

  return (
    <section className='container flex flex-col items-center gap-2 py-8'>
      <h2 className='text-2xl font-bold'>Đăng nhập</h2>

      <div className='flex w-full max-w-lg flex-col items-stretch gap-2'>
        <Input name='email' placeholder='Enter your email' />
        <Input
          type={showPassword ? 'text' : 'password'}
          name='password'
          placeholder='Enter your password'
          endContent={
            <Tooltip content={showPassword ? 'Hide password' : 'Show password'} showArrow>
              <Button
                isIconOnly
                variant='light'
                size='sm'
                radius='full'
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? <EyeClosed size={20} /> : <Eye size={20} />}
              </Button>
            </Tooltip>
          }
        />

        <Button color='primary'>Login</Button>

        <Divider orientation='horizontal' className='my-6' />

        <Button variant='bordered'>Login with Google</Button>
      </div>
    </section>
  );
};

export default Login;
