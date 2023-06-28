import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../config/dbConnect';
import User from '../../../models/userModel';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();

  try {
    if (req.method === 'GET') {
      // Handle the GET method
      const { id } = req.query;

      const existingUser = await User.findById(id);

      if (existingUser) {
        // Exclude email and password from the returned data
        const { email, password, ...userData } = existingUser.toJSON();

        return res.status(200).json(userData);
      } else {
        return res.status(404).json({ message: 'User not found' });
      }
    } else {
      return res.status(405).json({ message: 'Method Not Allowed' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server Error' });
  }
}
