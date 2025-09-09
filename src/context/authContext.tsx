import React, { createContext, useContext, useEffect, useState } from "react";
import * as SecureStore from 'expo-secure-store';
import { supabase } from "../lib/supabase";

type Session = {
  access_token: string;
  refresh_token: string;
  expires_at: number;
  user: { id: string; phone: string; full_name?: string | null };
};

type AuthContextType = {
  session: Session | null;
  loading: boolean;
  login: (session: Session) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
  session: null,
  loading: true,
  login: async () => {},
  logout: async () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSession = async () => {
      const access_token = await SecureStore.getItemAsync("access_token");
      const refresh_token = await SecureStore.getItemAsync("refresh_token");
      const expires_at = await SecureStore.getItemAsync("expires_at");
      const userJson = await SecureStore.getItemAsync("user");

      if (access_token && refresh_token && expires_at && userJson) {
        setSession({
          access_token,
          refresh_token,
          expires_at: Number(expires_at),
          user: JSON.parse(userJson),
        });
      }
      setLoading(false);
    };

    loadSession();
  }, []);

  useEffect(() => {
  console.log("AuthContext session changed:", session);
}, [session]);


  const login = async (newSession: any) => {
    console.log("saving session :",newSession)
    setSession(newSession);

    await SecureStore.setItemAsync("access_token", newSession.access_token);
    await SecureStore.setItemAsync("refresh_token", newSession.refresh_token);
    await SecureStore.setItemAsync("expires_at", newSession.expires_at.toString());
    await SecureStore.setItemAsync("user", JSON.stringify(newSession.user));
  };

  const logout = async () => {
    setSession(null);
    await SecureStore.deleteItemAsync("access_token");
    await SecureStore.deleteItemAsync("refresh_token");
    await SecureStore.deleteItemAsync("expires_at");
    await SecureStore.deleteItemAsync("user");

    // Optional: also sign out from Supabase
    await supabase.auth.signOut();
  };

  return (
    <AuthContext.Provider value={{ session, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
