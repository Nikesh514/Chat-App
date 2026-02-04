import type { Request, Response } from "express";
import { User } from "../models/user.model"; // Ensure the correct path to your user model
import bcrypt from "bcryptjs";
import {generateToken} from "../utils/jwt";


export const Register = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    // Validate required fields
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User with this email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    // Respond with success
    return res.status(201).json({
      message: "User registered successfully",
      newUser
    });
  } catch (error: unknown) {
    console.error("Error in register controller", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const Login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        // Validate required fields
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        // Validate password
        const isPasswordValid = await bcrypt.compare(password, user.password); // Assuming comparePassword is a method in your user model
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        // Generate token (assuming you have a method to generate tokens)
        const token = generateToken(user._id.toString());

        // Respond with success
        return res.status(200).json({
            message: "Login successful",
            token,
            user: {
                id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
            },
        });
    } catch (error: unknown) {
        console.error("Error in login controller", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};


