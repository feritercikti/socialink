import axios from 'axios';
import html2canvas from 'html2canvas';

//Take screenshot and send image to cloudinary

export const CaptureImage = (containerRef: HTMLDivElement) => {
  return new Promise<string | null>(async (resolve, reject) => {
    // Exclude the imageColors.map part by temporarily removing it from the DOM
    const imageColorsDiv = containerRef!.querySelector(
      '.image-colors'
    ) as HTMLDivElement | null;
    const imageColorsDivParent = imageColorsDiv?.parentNode as Node;

    if (imageColorsDiv && imageColorsDivParent) {
      imageColorsDivParent.removeChild(imageColorsDiv);
    }

    try {
      // Capture only the visible part of the screen
      const canvas = await html2canvas(containerRef!, {
        width: window.innerWidth,
        height: window.innerHeight,
        scale: 1, // Adjust the scale to capture at higher resolution
      });

      canvas.toBlob(async (blob) => {
        const formData = new FormData();
        formData.append('file', blob!, 'capture.png');

        try {
          const response = await axios.post('/api/upload', formData);
          console.log(response.data);
          const imageUrl = response.data.imageUrl;

          // Update the cover state with the image URL
          console.log('Image uploaded to Cloudinary');
          resolve(imageUrl);
        } catch (error) {
          console.error('Error uploading image to Cloudinary:', error);
          reject(error);
        }

        // Restore the imageColors.map part to the DOM
        if (imageColorsDiv && imageColorsDivParent) {
          imageColorsDivParent.appendChild(imageColorsDiv);
        }
      }, 'image/png');
    } catch (error) {
      console.error('Error capturing image:', error);
      reject(error);
    }
  });
};
