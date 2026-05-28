import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    phone: { type: String, default: '' },
    age: { type: Number, default: null },
    gender: { type: String, enum: ['male', 'female', 'other', 'prefer not to say'], default: 'prefer not to say' },
    location: { type: String, default: '' },
    country: { type: String, default: '' },
    travelStyle: { type: String, default: '' },
    budget: { type: String, default: '' },
    profilePhoto: { type: String, default: '' },
    bio: { type: String, default: '' },
    emergencyContact: { type: String, default: '' },
    emergencyPhone: { type: String, default: '' },
    preferredTravelStyle: { type: String, default: '' },
    preferences: { type: [String], default: [] },
    favoriteLocations: { type: [Object], default: [] },
    savedTrips: { type: [Object], default: [] },
    chatHistory: { type: [Object], default: [] },
  },
  { timestamps: true },
);

export const User = mongoose.models.User ?? mongoose.model('User', userSchema);
