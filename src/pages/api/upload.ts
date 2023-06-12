import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import { NextApiRequest, NextApiResponse } from 'next';

interface CustomNextApiRequest extends NextApiRequest {
  files?: Express.Multer.File[];
}

const storage = multer.memoryStorage();
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only image files are allowed.'));
    }
  },
});
const myUploadMiddleware = upload.array('file');

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME!,
  api_key: process.env.API_KEY!,
  api_secret: process.env.API_SECRET!,
  secure: true,
});

function runMiddleware(req: NextApiRequest, res: NextApiResponse, fn: any) {
  return new Promise<void>((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve();
    });
  });
}

export default async function handler(
  req: CustomNextApiRequest,
  res: NextApiResponse
) {
  await runMiddleware(req, res, myUploadMiddleware);
  const imageUrls = [];
  const publicId = [];

  for (const file of req.files || []) {
    try {
      const b64 = Buffer.from(file.buffer).toString('base64');
      let dataURI = 'data:' + file.mimetype + ';base64,' + b64;
      const response = await cloudinary.uploader.upload(dataURI, {
        folder: 'uploads',
      });
      imageUrls.push(response.secure_url);
      publicId.push(response.public_id);
    } catch (error) {
      res.status(400).json(error);
      return;
    }
  }
  res.status(200).json({
    message: 'Upload successful',
    imageUrl: imageUrls[0],
    publicId: publicId[0],
  });
}

export const config = {
  api: {
    bodyParser: false,
  },
};
