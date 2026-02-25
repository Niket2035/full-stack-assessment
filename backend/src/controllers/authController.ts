import { Request, Response } from "express";
import User from "../models/userModel";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateToken";

export const CreateUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    const existinguser = await User.findOne({ email });

    if (existinguser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    const token = generateToken(user._id.toString());

    res.cookie("token", token, {
      httpOnly: true,
      secure: true, 
      sameSite: "none",
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    });

    res.status(201).json({
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const LoginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = generateToken(user._id.toString());

    res.cookie("token", token, {
      httpOnly: true,
      secure: true, 
      sameSite: "none",
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    });

    res.json({
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const LogoutUser = async (req: Request, res: Response) => {
  res.cookie("token", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "Logged out successfully" });
};
