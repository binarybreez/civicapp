import { Stack, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Pressable } from "react-native";

function BackButton() {
  const router = useRouter();

  return (
    <Pressable
      onPress={() => router.back()}
      style={{ paddingHorizontal: 10 }}
    >
      <Ionicons name="arrow-back" size={24} color="black" />
    </Pressable>
  );
}

export default function ProfileLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: "white" }, // White background
        headerTintColor: "black", // Icons and back arrow color
        headerTitleStyle: { color: "black", fontWeight: "bold" }, // Title text color
        headerTitleAlign:"center"
      }}
    >
      <Stack.Screen
        name="ViewReport"
        options={{
          headerTitle: "Reports",
          headerLeft: () => <BackButton />,
        }}
      />
    </Stack>
  );
}
