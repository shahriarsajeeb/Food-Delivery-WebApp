'use client';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { useState } from 'react';
import Link from 'next/link';
import { Country, State } from 'country-state-city';
import { useMutation } from '@apollo/client';
import { REGISTER_RESTAURANT } from '../../../graphql/actions/register.restaurant';
import toast from 'react-hot-toast';

const formSchema = z.object({
  name: z.string(),
  country: z.string(),
  city: z.string(),
  address: z.string(),
  phone_number: z
    .number()
    .min(9, 'Phone number must need to be at least 9characters long!'),
  email: z.string().email(),
  password: z.string().min(8, 'Password must be at least 8characters long!'),
});

type RegisterSchema = z.infer<typeof formSchema>;

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
    watch,
  } = useForm<RegisterSchema>({
    resolver: zodResolver(formSchema),
  });
  const [registerRestaurant, { loading }] = useMutation(REGISTER_RESTAURANT);
  const [show, setShow] = useState(false);

  const onSubmit = async (data: RegisterSchema) => {
    try {
      await registerRestaurant({
        variables: data,
      })
        .then((res) => {
          toast.success(res.data.registerRestaurant.message);
          reset();
        })
        .catch((error) => {
          reset();
          toast.error(error.message);
        });
      // reset();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <div className="w-full flex justify-center">
      <div className="w-[650px] px-6 py-10 border border-[#ffffff3d] rounded-xl mt-8">
        <form onSubmit={handleSubmit(onSubmit)} className="!font-Poppins">
          <label className="label block">Enter Restaurant name</label>
          <input
            {...register('name')}
            type="text"
            placeholder="Foodpanda"
            className="input"
          />
          {errors.name && (
            <span className="text-red-500 block mt-1">
              {`${errors.name.message}`}
            </span>
          )}
          <div className="w-full mt-5 relative mb-1">
            <label htmlFor="password" className="label block">
              Choose your country
            </label>
            <select
              className="w-[95%] border input h-[40px] rounded-[5px]"
              {...register('country')}
              onChange={(e) => {
                setValue('country', e.target.value);
              }}
            >
              <option className="block pb-2" value="">
                Choose your country
              </option>
              {Country &&
                Country.getAllCountries().map((item) => (
                  <option key={item.isoCode} value={item.isoCode}>
                    {item.name}
                  </option>
                ))}
            </select>
          </div>
          {errors.country && (
            <span className="text-red-500">{`${errors.country.message}`}</span>
          )}
          <div className="w-full mt-5 relative mb-1">
            <label htmlFor="password" className="label block">
              Choose your city
            </label>
            <select
              className="w-[95%] border input h-[40px] rounded-[5px]"
              {...register('city')}
              onChange={(e) => {
                setValue('city', e.target.value);
              }}
            >
              <option className="block pb-2" value="">
                Choose your city
              </option>
              {State &&
                State.getStatesOfCountry(watch('country')).map((item) => (
                  <option key={item.isoCode} value={item.isoCode}>
                    {item.name}
                  </option>
                ))}
            </select>
          </div>
          {errors.city && (
            <span className="text-red-500">{`${errors.city.message}`}</span>
          )}
          <div className="w-full mt-5 mb-1">
            <label htmlFor="address" className="label block">
              Enter your address
            </label>
            <input
              {...register('address')}
              type={'text'}
              placeholder="600 Amphitheatre Parkway, United States."
              className="input"
            />
          </div>
          {errors.address && (
            <span className="text-red-500">{`${errors.address.message}`}</span>
          )}
          <div className="w-full mt-5 mb-1">
            <label htmlFor="address" className="label block">
              Enter your phone number
            </label>
            <input
              {...register('phone_number', { valueAsNumber: true })}
              type={'number'}
              placeholder="9544533345"
              className="input"
            />
          </div>
          {errors.phone_number && (
            <span className="text-red-500">{`${errors.phone_number.message}`}</span>
          )}
          <div className="w-full mt-5 mb-1">
            <label htmlFor="address" className="label block">
              Enter your restaurant email
            </label>
            <input
              {...register('email')}
              type={'text'}
              placeholder="restaurant@becodemy.com"
              className="input"
            />
          </div>
          {errors.email && (
            <span className="text-red-500">{`${errors.email.message}`}</span>
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
              value="Sign up"
              disabled={isSubmitting || loading}
              className={`button mt-3`}
            />
          </div>
          <h5 className="text-center pt-4 font-Poppins text-[16px]">
            Already have an account?
            <Link
              href={'/login'}
              className="text-[#2190ff] pl-1 cursor-pointer font-Poppins"
            >
              Sign in
            </Link>
          </h5>
        </form>
      </div>
    </div>
  );
};

export default Register;
