import axios from 'axios';
import Image from 'next/image';
import React, { useState } from 'react';

interface ImageProps {
  layoutImage?: string;
  onChangeLayoutImage: (newLayoutImage: string) => void;
}

const ImageLayout = ({
  layoutImage,
  onChangeLayoutImage,
}: ImageProps): JSX.Element => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [uploadStatus, setUploadStatus] = useState('Upload');
  const [image, setImage] = useState(layoutImage || '/default.jpeg');

  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const uploadLayoutImage = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setUploadStatus('Uploading...');

    const formData = new FormData();
    formData.append('file', selectedFile!);

    try {
      const response = await axios.post('/api/upload', formData);
      const imageUrl = response.data.imageUrl;
      onChangeLayoutImage(imageUrl); // Call the onChangeLayoutImage function with the new layout image URL
      setImage(imageUrl);
      setUploadStatus('Uploaded');
    } catch (error) {
      console.log('Image upload error:', error);
    }
  };

  // console.log(image);

  return (
    <div
      className='w-full h-full relative'
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Image
        src={selectedFile ? URL.createObjectURL(selectedFile) : image}
        alt='layout-image'
        fill={true}
        className={`rounded-xl ${isHovered ? 'opacity-50' : ''}`}
      />
      {isHovered && (
        <div className='absolute inset-0 flex items-center justify-center'>
          {selectedFile ? (
            <button
              className='bg-black text-white px-4 py-2 rounded-lg'
              onClick={uploadLayoutImage}
            >
              {uploadStatus}{' '}
            </button>
          ) : (
            <label
              className='bg-black text-white px-4 py-2 rounded-lg cursor-pointer'
              htmlFor='file-input'
            >
              Choose File
            </label>
          )}
        </div>
      )}
      <input
        id='file-input'
        type='file'
        onChange={handleImageChange}
        style={{ display: 'none' }}
      />
    </div>
  );
};

export default ImageLayout;
