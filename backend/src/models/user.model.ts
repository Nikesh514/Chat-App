import mongoose, { Document } from 'mongoose';


export interface IUser extends Document{
    fullName: [
        firstName: string,
        lastName: string
    ]
    email: string;
    password: string;
    createdAt: Date;
    updaftedAt: Date;
    avatar?: string;
}

const userSchema = new mongoose.Schema<IUser>({
    fullName: {
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
    },

    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        minLength: [6, 'Password must be at least 6 characters long'],
    },
    avatar:{
        type: String,
    }
},{timestamps: true});

export const User = mongoose.model<IUser>('User', userSchema);