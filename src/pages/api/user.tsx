import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from './../../config/dbConnect';
import User from './../../models/userModel';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();

  try {
    if (req.method !== 'POST') {
      return res.status(405).json({ message: 'Method Not Allowed' });
    }

    // Extract the data from the request body
    const { id, name, bio, avatar, cover, layout } = req.body;

    // Check if the user already exists by their email or unique identifier
    const existingUser = await User.findById(id);

    if (existingUser) {
      // Update the existing user's information
      existingUser.name = name;
      existingUser.bio = bio;
      existingUser.avatar = avatar;
      existingUser.cover = cover;
      existingUser.layout = layout;

      await existingUser.save();

      return res
        .status(200)
        .json({ message: 'User information updated successfully' });
    } else {
      return res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server Error' });
  }
}
