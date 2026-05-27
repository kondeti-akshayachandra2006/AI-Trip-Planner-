import type { TripPlan } from '@/services/types';

let savedTrips: TripPlan[] = [];

export const offlineStore = {
  listTrips() {
    return savedTrips;
  },
  saveTrip(plan: TripPlan) {
    savedTrips = [plan, ...savedTrips.filter((trip) => trip.id !== plan.id)];
    return savedTrips;
  },
};
