import { createContext, ReactNode, useContext, useMemo, useReducer } from 'react';
import type { TripPlan } from '@/services/types';

type State = {
  currentPlan: TripPlan | null;
  savedTrips: TripPlan[];
  completedTrips: TripPlan[];
  isPlanning: boolean;
  isDarkMode: boolean;
};

type Action =
  | { type: 'planning'; value: boolean }
  | { type: 'setPlan'; plan: TripPlan }
  | { type: 'savePlan'; plan: TripPlan }
  | { type: 'completePlan'; planId: string }
  | { type: 'toggleTheme' };

const initialState: State = {
  currentPlan: null,
  savedTrips: [],
  completedTrips: [],
  isPlanning: false,
  isDarkMode: false,
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'planning':
      return { ...state, isPlanning: action.value };
    case 'setPlan':
      return {
        ...state,
        currentPlan: action.plan,
        savedTrips: [action.plan, ...state.savedTrips.filter((trip) => trip.id !== action.plan.id)],
      };
    case 'savePlan':
      return {
        ...state,
        savedTrips: [action.plan, ...state.savedTrips.filter((trip) => trip.id !== action.plan.id)],
      };
    case 'completePlan': {
      const completed = state.savedTrips.find((trip) => trip.id === action.planId);
      if (!completed) return state;
      return {
        ...state,
        savedTrips: state.savedTrips.filter((trip) => trip.id !== action.planId),
        completedTrips: [completed, ...state.completedTrips.filter((trip) => trip.id !== action.planId)],
      };
    }
    case 'toggleTheme':
      return { ...state, isDarkMode: !state.isDarkMode };
    default:
      return state;
  }
}

const TripStoreContext = createContext<{
  state: State;
  dispatch: React.Dispatch<Action>;
} | null>(null);

export function TripStoreProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = useMemo(() => ({ state, dispatch }), [state]);
  return <TripStoreContext.Provider value={value}>{children}</TripStoreContext.Provider>;
}

export function useTripStore() {
  const context = useContext(TripStoreContext);
  if (!context) {
    throw new Error('useTripStore must be used inside TripStoreProvider');
  }
  return context;
}
