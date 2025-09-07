import { Stack, Redirect } from "expo-router";
import { useAuth } from "@/src/context/authContext";

export default function ProtectedLayout() {
  const { session, loading } = useAuth();

  if (loading) return null;

  if (!session) {
    return <Redirect href="/(auth)/sign-up" />;
  }

  return <Stack screenOptions={{ headerShown: false }} />;
}
