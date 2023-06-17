import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../config/dbConnect';
import User from '../../models/userModel';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();

  try {
    if (req.method !== 'POST') {
      return res.status(405).json({ message: 'Method Not Allowed' });
    }

    const { id, name, bio, background, avatar, cover, layout } = req.body;

    const existingUser = await User.findById(id);

    if (existingUser) {
      existingUser.name = name;
      existingUser.bio = bio;
      existingUser.avatar = avatar;
      existingUser.background = background;
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
