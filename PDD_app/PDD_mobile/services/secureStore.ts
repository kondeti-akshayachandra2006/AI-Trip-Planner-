import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

const isWeb = Platform.OS === 'web';

export async function setItem(key: string, value: string) {
  if (isWeb) {
    try {
      localStorage.setItem(key, value);
      return;
    } catch (e) {
      console.warn('localStorage.setItem failed', e);
      return;
    }
  }
  return SecureStore.setItemAsync(key, value);
}

export async function getItem(key: string): Promise<string | null> {
  if (isWeb) {
    try {
      return Promise.resolve(localStorage.getItem(key));
    } catch (e) {
      console.warn('localStorage.getItem failed', e);
      return Promise.resolve(null);
    }
  }
  return SecureStore.getItemAsync(key);
}

export async function deleteItem(key: string) {
  if (isWeb) {
    try {
      localStorage.removeItem(key);
      return;
    } catch (e) {
      console.warn('localStorage.removeItem failed', e);
      return;
    }
  }
  return SecureStore.deleteItemAsync(key);
}

// Convenience helpers used by the app
const STORAGE_KEY = 'pdd_trip_planner_user';
const STORAGE_TOKEN = 'pdd_trip_planner_token';

export const saveUser = async (value: string | null) => {
  if (!value) return deleteItem(STORAGE_KEY);
  return setItem(STORAGE_KEY, value);
};

export const getUser = async () => {
  return getItem(STORAGE_KEY);
};

export const removeUser = async () => deleteItem(STORAGE_KEY);

export const saveToken = async (value: string | null) => {
  if (!value) return deleteItem(STORAGE_TOKEN);
  return setItem(STORAGE_TOKEN, value);
};

export const getToken = async () => getItem(STORAGE_TOKEN);

export const removeToken = async () => deleteItem(STORAGE_TOKEN);

export default {
  setItem,
  getItem,
  deleteItem,
  saveUser,
  getUser,
  removeUser,
  saveToken,
  getToken,
  removeToken,
};
