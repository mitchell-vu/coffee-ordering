'use client';

import { Button, Divider, Input, Tooltip } from '@nextui-org/react';
import * as React from 'react';
import { Eye, EyeClosed } from '@phosphor-icons/react';
import axios, { AxiosError } from 'axios';
import { useMutation } from '@tanstack/react-query';
import { SubmitHandler, useForm } from 'react-hook-form';
import Link from 'next/link';

interface RegisterForm {
  name: string;
  email: string;
  password: string;
}

const Register: React.FC = () => {
  const [showPassword, setShowPassword] = React.useState(false);

  const registerMutation = useMutation({
    mutationFn: async (data: RegisterForm) => axios.post('/api/auth/register', data),
  });

  const {
    handleSubmit,
    register,
    setError,
    formState: { errors },
  } = useForm<RegisterForm>({
    mode: 'onChange',
    disabled: registerMutation.isPending,
  });

  const handleSubmitForm: SubmitHandler<RegisterForm> = async (formData, event) => {
    event?.preventDefault();

    registerMutation.mutate(formData, {
      onError: (error) => {
        const e = error as AxiosError<{ message: string }>;

        if (e.response?.status === 409) {
          setError('email', {
            type: 'manual',
            message: e.response?.data.message,
          });
        }
      },
    });
  };

  return (
    <section className='container flex flex-col items-center gap-2 py-8'>
      <h2 className='text-2xl font-bold'>Đăng ký</h2>

      <div className='flex w-full max-w-lg flex-col items-stretch gap-6'>
        <form
          onSubmit={handleSubmit(handleSubmitForm)}
          className='flex w-full flex-col items-stretch gap-2'
        >
          <Input
            {...register('name')}
            name='name'
            label='Name'
            placeholder='Your full name'
            errorMessage={errors.name?.message}
            isInvalid={!!errors.name?.message}
          />

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

          <Button type='submit' color='primary' isLoading={registerMutation.isPending}>
            Đăng ký
          </Button>
        </form>

        <div className='text-center text-sm text-default-500'>
          Đã có tài khoản?{' '}
          <Link href='/login' className='font-semibold'>
            Đăng nhập
          </Link>
        </div>

        <Divider orientation='horizontal' />

        <Button variant='bordered'>Đăng nhập bằng Google</Button>
      </div>
    </section>
  );
};

export default Register;
