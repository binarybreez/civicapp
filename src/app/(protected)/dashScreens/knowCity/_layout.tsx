import { Stack, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Pressable } from "react-native";

function BackButton() {
  const router = useRouter();

  return (
    <Pressable onPress={() => router.back()} style={{ paddingHorizontal: 10 }}>
      <Ionicons name="arrow-back" size={24} color="black" />
    </Pressable>
  );
}

export default function knowCityLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: "white" }, // White background
        headerTintColor: "black", // Icons and back arrow color
        headerTitleStyle: { color: "black", fontWeight: "bold" }, // Title text color
        headerTitleAlign: "center",
      }}
    >
      <Stack.Screen
        name="emergency"
        options={{
          headerTitle: "Emergency",
          headerLeft: () => <BackButton />,
        }}
      />
      <Stack.Screen
        name="greenwaste"
        options={{
          headerTitle: "Green Waste",
          headerLeft: () => <BackButton />,
        }}
      />
      <Stack.Screen
        name="noisepollution"
        options={{
          headerTitle: "Noise Pollution",
          headerLeft: () => <BackButton />,
        }}
      />
      <Stack.Screen
        name="index"
        options={{
          headerTitle: "Know Your City",
          headerLeft: () => <BackButton />,
        }}
      />
    </Stack>
  );
}
