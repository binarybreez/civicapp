import React from "react";
import { Redirect, Stack } from "expo-router";
import { View, Text } from "react-native";
import { useAuth } from "@/src/context/authContext";

const Olayout = () => {
  const { session } = useAuth();
  if (!session) {
    return <Redirect href={"/(auth)/sign-in"} />;
  }
  if (session.user.full_name) {
    return <Redirect href={"/(protected)/(tabs)"} />;
  }
  return (
    <Stack
      screenOptions={{
        header: () => (
          <View className=" bg-blue-600 py-8 px-5 shadow-md">
            <Text className="text-white text-center text-2xl font-extrabold tracking-wide">
              Onboarding
            </Text>
          </View>
        ),
      }}
    />
  );
};

export default Olayout;
