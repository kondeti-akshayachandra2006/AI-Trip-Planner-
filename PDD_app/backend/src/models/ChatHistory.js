import mongoose from 'mongoose';

const chatMessageSchema = new mongoose.Schema(
  {
    role: { type: String, enum: ['user', 'assistant', 'system'], required: true },
    text: { type: String, required: true },
    metadata: { type: Object, default: {} },
  },
  { timestamps: true },
);

const chatHistorySchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    messages: { type: [chatMessageSchema], default: [] },
    conversationName: { type: String, default: 'Travel Assistant' },
    meta: { type: Object, default: {} },
  },
  { timestamps: true },
);

export const ChatHistory = mongoose.models.ChatHistory ?? mongoose.model('ChatHistory', chatHistorySchema);
