import type { NextApiRequest, NextApiResponse } from 'next';
import User from '@/models/userModel';
import dbConnect from '@/config/dbConnect';
import bcrypt from 'bcryptjs';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();

  if (req.method === 'POST') {
    try {
      const userExists = await User.findOne({ email: req.body.email });
      if (userExists) {
        return res
          .status(200)
          .send({ message: 'User already exists', success: false });
      }

      //hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
      req.body.password = hashedPassword;

      //create new user
      const newUser = new User(req.body);
      await newUser.save();
      res.send({
        message: 'User created successfully',
        success: true,
        userId: newUser._id,
      });
    } catch (error: any) {
      res
        .status(500)
        .send({ message: error.message, data: error, success: false });
    }
  }
}
