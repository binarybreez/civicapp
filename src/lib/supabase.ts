import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";
import Constants from 'expo-constants';


const SUPABASE_URL = Constants.expoConfig?.extra?.SUPABASE_URL;
const SUPABASE_KEY = Constants.expoConfig?.extra?.SUPABASE_KEY;

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
