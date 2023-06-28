import axios from 'axios';
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Link from 'next/link';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('/api/register', {
        email,
        password,
      });
      if (!data.success) {
        toast.error(data.message);
      } else {
        router.push('/login/');
      }
    } catch (error) {
      console.log(error);
    }
    setEmail('');
    setPassword('');
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-100'>
      <div className='max-w-md w-full px-6 py-8 bg-white rounded-lg shadow-md'>
        <h2 className='text-2xl font-semibold text-center text-gray-800 mb-6'>
          Register
        </h2>

        <form onSubmit={handleSubmit}>
          <div className='mb-4'>
            <label htmlFor='email' className='block text-gray-700 '>
              Email
            </label>
            <input
              type='email'
              id='email'
              className='mt-1 block w-full  h-8 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500'
              placeholder='Enter your email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className='mb-4 relative'>
            <label htmlFor='password' className='block text-gray-700'>
              Password
            </label>
            <input
              type={showPassword ? 'text' : 'password'}
              id='password'
              className='mt-1 block w-full h-8 border-gray-300 rounded-md shadow-sm focus:ring-black focus:border-black pr-10'
              placeholder='Enter your password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type='button'
              className='absolute bottom-0 right-2 transform -translate-y-1/3 text-gray-500'
              onClick={togglePasswordVisibility}
            >
              {showPassword ? (
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-5 w-5'
                  viewBox='0 0 20 20'
                  fill='currentColor'
                >
                  <path
                    fillRule='evenodd'
                    d='M5.707 7.293a1 1 0 010 1.414l-1.414 1.414a5 5 0 107.072 7.072l1.414-1.414a1 1 0 011.414-1.414l1.414-1.414a7 7 0 11-9.9-9.9L5.707 7.293zM10 13a3 3 0 100-6 3 3 0 000 6z'
                    clipRule='evenodd'
                  />
                </svg>
              ) : (
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-5 w-5'
                  viewBox='0 0 20 20'
                  fill='currontColor'
                >
                  <path
                    fillRule='evenodd'
                    d='M10 12a2 2 0 100-4 2 2 0 000 4z'
                    clipRule='evenodd'
                  />
                  <path
                    fillRule='evenodd'
                    d='M2 10a8 8 0 1116 0 8 8 0 01-16 0zm8-6a6 6 0 00-6 6c0 1.627.64 3.161 1.77 4.295l8.525-8.525A5.961 5.961 0 0010 4z'
                    clipRule='evenodd'
                  />
                </svg>
              )}
            </button>
          </div>
          <div className='flex items-center justify-center gap-10'>
            <button
              type='submit'
              className='bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600'
            >
              Register
            </button>
            <Link href='/login'>
              <button className='bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600'>
                or Login
              </button>
            </Link>
          </div>
        </form>
      </div>
      <ToastContainer position='top-center' autoClose={3000} />
    </div>
  );
};

export default Register;
