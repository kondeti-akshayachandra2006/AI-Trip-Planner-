import mongoose from 'mongoose';

const tripSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    source: { type: String, default: '' },
    destination: { type: String, required: true },
    title: { type: String, default: '' },
    summary: { type: String, default: '' },
    days: { type: Number, default: 1 },
    travelStyle: { type: String, default: '' },
    budget: { type: String, default: '' },
    preferences: { type: [String], default: [] },
    route: Object,
    weather: Object,
    safety: Object,
    booking: Object,
    transport: { type: [Object], default: [] },
    attractions: { type: [Object], default: [] },
    hotels: { type: [Object], default: [] },
    food: { type: [Object], default: [] },
    emergency: { type: [Object], default: [] },
    plan: Object,
    itinerary: { type: [Object], default: [] },
    recommendations: { type: [Object], default: [] },
    sharedWith: { type: [String], default: [] },
    status: { type: String, default: 'active' },
  },
  { timestamps: true },
);

export const Trip = mongoose.models.Trip ?? mongoose.model('Trip', tripSchema);
