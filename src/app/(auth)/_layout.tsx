import { Stack, Redirect } from "expo-router";
import { useAuth } from "../../context/authContext";

export default function AuthLayout() {
  const { session, loading } = useAuth();

  if (loading) return null; // show splash screen maybe

  if (session) {
    return <Redirect href="/(protected)/dashboard" />;
  }

  return <Stack screenOptions={{ headerShown: false }} />;
}
