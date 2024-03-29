import axios from 'axios';
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import { BsArrowUpCircle } from 'react-icons/bs';
import { extractColors } from 'extract-colors';
import { useRouter } from 'next/router';

interface ProfileProps {
  name: string;
  bio: string;
  avatar: string;
  uploaded: boolean;
  background: string;
  imageColors: string[];
  setBackground: React.Dispatch<React.SetStateAction<string>>;
  setAvatar: React.Dispatch<React.SetStateAction<string>>;
  setUploaded: React.Dispatch<React.SetStateAction<boolean>>;
  setName: React.Dispatch<React.SetStateAction<string>>;
  setBio: React.Dispatch<React.SetStateAction<string>>;
  setImageColors: React.Dispatch<React.SetStateAction<string[]>>;
}

const Profile = ({
  name,
  setName,
  bio,
  setBio,
  avatar,
  setAvatar,
  uploaded,
  setUploaded,
  background,
  setBackground,
  imageColors,
  setImageColors,
}: ProfileProps) => {
  const [uploadStatus, setUploadStatus] = useState('Upload');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const router = useRouter();
  const { id } = router.query;

  const handleAvatarChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      setAvatar(URL.createObjectURL(file));
      setSelectedFile(file);
    }
  };

  const uploadImage = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setUploadStatus('Uploading...');
    const formData = new FormData();
    formData.append('file', selectedFile!);

    try {
      const response = await axios.post('/api/upload', formData);
      let imageUrl = response.data.imageUrl;
      setAvatar(imageUrl);

      // Extract colors and wait for the result
      const colors = await extractColors(avatar);
      const colorHexValues = colors.map((color) => color.hex);
      setImageColors(colorHexValues);

      // Send the image URL and colors to the server
      const userData = {
        id: id,
        avatar: imageUrl,
        imageColors: colorHexValues,
      };
      const saveResponse = await axios.put('/api/user', userData);
      console.log('Image saved:', saveResponse.data);

      setUploaded(true);
    } catch (error) {
      console.log('imageUpload' + error);
      setUploadStatus('Upload failed..');
    }
    setUploadStatus('Uploaded');
  };

  const handleDeleteImage = () => {
    setAvatar('');
    setBackground('');
    setUploaded(false);
    setUploadStatus('Upload');
    setImageColors([]);
  };

  useEffect(() => {
    if (!avatar) {
      setBackground('');
      setUploaded(false);
      setImageColors([]);
      setUploadStatus('Upload');
    }
  }, [avatar]);

  useEffect(() => {
    setBackground(background);
  }, [background]);

  return (
    <div className='flex flex-1 mt-3 flex-col items-center  gap-5 w-full h-[calc(100vh-80px)] sticky top-0 '>
      <div
        className='w-[80%] rounded-3xl h-full'
        style={{
          backgroundImage: background
            ? `linear-gradient(to bottom,  ${background},white)`
            : 'none',
        }}
      >
        <div className='flex border-gray-300 mt-10 w-full items-center justify-center'>
          <div
            className={`flex flex-col -mt-9 w-fit ${
              avatar
                ? `bg-${background} h-[200px] `
                : ' border  py-16 px-12 bg-gray-300  '
            } rounded-lg hover:bg-gray-200`}
          >
            {avatar ? (
              <>
                <div className='relative rounded-lg overflow-hidden '>
                  <Image
                    src={avatar}
                    alt='avatar'
                    width={200}
                    height={200}
                    className='h-full rounded-[50%] border-2 border-gray-300'
                  />

                  <div className='absolute inset-0 hover:bg-gray-300 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center'>
                    <button
                      className='flex justify-center items-center text-blue-900  px-2 py-4 rounded-[50%] bg-white cursor-pointer'
                      onClick={handleDeleteImage}
                    >
                      Delete
                    </button>
                  </div>
                </div>
                {selectedFile && !uploaded && (
                  <button
                    className='px-2 py-1 bg-green-800 text-white rounded-lg'
                    onClick={uploadImage}
                    disabled={uploaded ? true : false}
                  >
                    {uploadStatus}
                  </button>
                )}
              </>
            ) : (
              <>
                {!uploaded && (
                  <>
                    <label
                      htmlFor='avatarInput'
                      className='items-center justify-center flex flex-col cursor-pointer'
                    >
                      {!uploaded && !avatar && (
                        <>
                          <BsArrowUpCircle className='text-[24px] text-gray-400 ' />
                          <h2 className='text-[16px] text-gray-600 font-bold'></h2>
                          Add Avatar
                        </>
                      )}
                    </label>
                  </>
                )}

                <input
                  id='avatarInput'
                  type='file'
                  accept='image/*'
                  onChange={handleAvatarChange}
                  style={{ display: 'none' }}
                />
              </>
            )}
          </div>
        </div>
        <div className='w-full items-center justify-center mt-4 flex flex-col gap-5 ml-2'>
          <input
            value={name}
            type='text'
            placeholder='Your Name'
            className='
                text-black placeholder-black
            } w-[60%]  text-[24px] px-2 rounded-xl outline-none flex items-center justify-center  break-words bg-transparent'
            onChange={(e) => setName(e.target.value)}
          />
          <textarea
            value={bio}
            placeholder='Your bio'
            className='
              text-black placeholder-black
           w-[60%] text-[18px] px-2 rounded-xl  h-[120px] break-words resize-none outline-none bg-transparent '
            onChange={(e) => setBio(e.target.value)}
          />
        </div>
        <div className='image-colors flex items-center justify-center gap-2'>
          {imageColors?.map((color, index) => (
            <div
              key={index}
              className='w-[36px] h-[36px] cursor-pointer'
              style={{ backgroundColor: color, border: '1px solid black' }}
              onClick={() => setBackground(color)}
            ></div>
          ))}
          {avatar && (
            <div
              className='w-[60px] h-[36px] bg-white border border-black cursor-pointer flex items-center justify-center '
              onClick={() => setBackground('')}
              style={{
                color: 'black',
                border: '1px solid black',
              }}
            >
              Default
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
