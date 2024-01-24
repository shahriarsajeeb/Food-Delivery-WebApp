'use client';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { useState } from 'react';
import Link from 'next/link';
import { useMutation } from '@apollo/client';
import { LOGIN_RESTAURANT } from '../../../graphql/actions/login.restaurant';
import toast from 'react-hot-toast';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, 'Password must be at least 8characters long!'),
});

type LoginSchema = z.infer<typeof formSchema>;

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<LoginSchema>({
    resolver: zodResolver(formSchema),
  });
  const router = useRouter();
  const [LoginRestaurant, { loading }] = useMutation(LOGIN_RESTAURANT);
  const [show, setShow] = useState(false);

  const onSubmit = async (data: LoginSchema) => {
    const loginData = {
      email: data.email,
      password: data.password,
    };
    await LoginRestaurant({
      variables: loginData,
    })
      .then((res) => {
        const response = res.data.LoginRestaurant;
        if (response.error) {
          toast.error(response.error.message);
        } else {
          Cookies.set('refresh_token', response.refreshToken);
          Cookies.set('access_token', response.accessToken);
          reset();
          toast.success('Login successful!');
          router.push('/');
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="w-full flex justify-center">
      <div className="w-[450px] px-6 py-10 border border-[#ffffff3d] rounded-xl mt-8">
        <form onSubmit={handleSubmit(onSubmit)} className="!font-Poppins">
          <label className="label block">Enter your email</label>
          <input
            {...register('email')}
            type="email"
            placeholder="loginmail@gmail.com"
            className="input"
          />
          {errors.email && (
            <span className="text-red-500 block mt-1">
              {`${errors.email.message}`}
            </span>
          )}
          <div className="w-full mt-5 relative mb-1">
            <label htmlFor="password" className="label block">
              Enter your password
            </label>
            <input
              {...register('password')}
              type={!show ? 'password' : 'text'}
              placeholder="password!@%"
              className="input"
            />
            {!show ? (
              <AiOutlineEyeInvisible
                className="absolute bottom-3 right-2 z-1 cursor-pointer"
                size={20}
                onClick={() => setShow(true)}
              />
            ) : (
              <AiOutlineEye
                className="absolute bottom-3 right-2 z-1 cursor-pointer"
                size={20}
                onClick={() => setShow(false)}
              />
            )}
          </div>
          {errors.password && (
            <span className="text-red-500">{`${errors.password.message}`}</span>
          )}
          <div className="w-full mt-5">
            <input
              type="submit"
              value="Login"
              disabled={isSubmitting || loading}
              className={`button mt-3`}
            />
          </div>
          <h5 className="text-center pt-4 font-Poppins text-[16px]">
            Not have any account?
            <Link
              href={'/register'}
              className="text-[#2190ff] pl-1 cursor-pointer font-Poppins"
            >
              Sign up
            </Link>
          </h5>
        </form>
      </div>
    </div>
  );
};

export default Login;
