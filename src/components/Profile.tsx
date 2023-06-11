import React, { useState } from 'react';
import { BsArrowUpCircle } from 'react-icons/bs';
const Profile = () => {
  const [avatar, setAvatar] = useState('');

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      setAvatar(file.name);
    }
  };
  return (
    <div className='flex flex-1 flex-col gap-5 sticky mt-10 '>
      <div className='border-dashed border-2 border-gray-300 py-16 px-12 rounded-[50%] w-fit bg-gray-100 hover:bg-gray-200'>
        <label
          htmlFor='avatarInput'
          className='items-center justify-center flex flex-col cursor-pointer'
        >
          <BsArrowUpCircle className='text-[24px] text-gray-400 ' />
          <h2 className='text-[16px] text-gray-600 font-bold'>Add Avatar</h2>
        </label>
        <input
          id='avatarInput'
          type='file'
          accept='image/*'
          onChange={handleAvatarChange}
          style={{ display: 'none' }}
        />
        {avatar && (
          <p>
            Selected avatar: {avatar}{' '}
            <span onClick={() => setAvatar('')}>X</span>
          </p>
        )}
      </div>
      <input
        placeholder='Your Name'
        className='w-fit text-[24px] outline-none border-1 border'
      />
      <input
        placeholder='Your bio'
        className='w-fit text-[16px] outline-none h-14'
      />
    </div>
  );
};

export default Profile;
