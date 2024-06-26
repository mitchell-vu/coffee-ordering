'use client';

import { Button, Divider, Input, Tooltip } from '@nextui-org/react';
import * as React from 'react';
import { Eye, EyeClosed } from '@phosphor-icons/react';
import { AxiosError } from 'axios';
import { useMutation } from '@tanstack/react-query';
import { SubmitHandler, useForm } from 'react-hook-form';
import Link from 'next/link';
import { signIn } from 'next-auth/react';

interface LoginForm {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const [showPassword, setShowPassword] = React.useState(false);

  const loginMutation = useMutation({
    mutationFn: async ({ email, password }: LoginForm) =>
      await signIn('credentials', { email, password, callbackUrl: '/' }),
  });

  const {
    handleSubmit,
    register,
    setError,
    formState: { errors },
  } = useForm<LoginForm>({
    mode: 'onChange',
    disabled: loginMutation.isPending,
  });

  const handleSubmitForm: SubmitHandler<LoginForm> = async (formData, event) => {
    event?.preventDefault();

    loginMutation.mutate(formData, {
      onError: (error) => {
        console.log(error);

        setError('password', {
          type: 'manual',
          message: (error as AxiosError<{ error: string }>).response?.data.error,
        });
      },
    });
  };

  return (
    <section className='container flex flex-col items-center gap-2 py-8'>
      <h2 className='text-2xl font-bold'>Đăng nhập</h2>

      <div className='flex w-full max-w-lg flex-col items-stretch gap-6'>
        <form
          className='flex w-full flex-col items-stretch gap-2'
          onSubmit={handleSubmit(handleSubmitForm)}
        >
          <Input
            {...register('email')}
            type='email'
            name='email'
            label='Email'
            placeholder='Enter your email'
            errorMessage={errors.email?.message}
            isInvalid={!!errors.email?.message}
          />

          <Input
            {...register('password')}
            type={showPassword ? 'text' : 'password'}
            name='password'
            label='Password'
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
            isInvalid={!!errors.password?.message}
            errorMessage={errors.password?.message}
          />

          <Button type='submit' color='primary' isLoading={loginMutation.isPending}>
            Đăng nhập
          </Button>
        </form>

        <div className='text-center text-sm text-default-500'>
          Chưa có tài khoản?{' '}
          <Link href='/register' className='font-semibold'>
            Đăng ký
          </Link>
        </div>

        <Divider orientation='horizontal' />

        <Button variant='bordered'>Đăng nhập bằng Google</Button>
      </div>
    </section>
  );
};

export default Login;
