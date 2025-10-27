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
        name="nearby"
        options={{
          headerTitle: "Nearby Complaints",
          headerLeft: () => <BackButton />,
        }}
      />
      <Stack.Screen
        name="citycomplaints"
        options={{
          headerTitle: "City Complaints",
          headerLeft: () => <BackButton />,
        }}
      />
    </Stack>
  );
}
