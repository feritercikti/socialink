import dbConnect from './../../config/dbConnect';
import { NextApiRequest, NextApiResponse } from 'next';
import User from './../../models/userModel';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    await dbConnect();

    try {
      // Fetch all users
      const users = await User.find();

      // Return the users as the API response
      res.status(200).json(users);
    } catch (error) {
      console.error('Error fetching users:', error);
      res.status(500).json({ message: 'Error fetching users' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
