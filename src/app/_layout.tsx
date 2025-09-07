import { Stack,Slot } from "expo-router";
import "../../global.css"
import { AuthProvider } from "../context/authContext";

export default function RootLayout() {
  return (
    <AuthProvider>
      <Slot />
    </AuthProvider>
  );
}
