import mongoose, { Document, Schema } from 'mongoose';

export interface IMessage extends Document {
  chat: mongoose.Types.ObjectId;
  sender: mongoose.Types.ObjectId;
  text: string;
  createdAt: Date;
  updatedAt: Date;
}

const messageSchema = new Schema<IMessage>(
  {
    chat: {
      type: Schema.Types.ObjectId,
      ref: 'Chat',
      required: true,
    },
    sender: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    text: {
      type: String,
      required: true,
      trim: true,
      minlength: [1, 'Message cannot be empty'],
      maxLength: [1000, 'Message cannot exceed 1000 characters'],
    },
  },
  { timestamps: true }
);

// Indexing for faster retrieval of messages by chat and creation time

messageSchema.index({ chat: 1, createdAt: 1 });

export const Message = mongoose.model<IMessage>('Message', messageSchema);