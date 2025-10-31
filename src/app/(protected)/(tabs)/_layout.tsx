import { Tabs } from "expo-router";
import { Feather, Ionicons } from "@expo/vector-icons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Entypo from "@expo/vector-icons/Entypo";
import React from "react";
import { TouchableOpacity } from "react-native";
import { useAuth } from "@/src/context/authContext";

const TabLayout = () => {
  const { logout } = useAuth();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#1173d4",
        tabBarStyle: {
          position: "absolute",
          bottom: 0, // ⬆️ moves tab bar up from bottom
          left: 16,
          right: 16,
          borderRadius: 16,
          height: 60,
          backgroundColor: "#fff",
          elevation: 5, // shadow for Android
          shadowColor: "#000", // shadow for iOS
          shadowOpacity: 0.1,
          shadowOffset: { width: 0, height: 5 },
          shadowRadius: 10,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          headerShown: true,
          title: "Home", // Label in bottom tab bar
          tabBarLabelStyle: {
            fontWeight: "800",
            fontSize: 12,
          },
          tabBarIcon: ({ color }) => (
            <Entypo name="home" size={24} color={color} />
          ),
          // Header Title Config
          headerTitle: "Civic App",
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontSize: 20,
            fontWeight: "700",
            color: "#1173d4",
          },
          headerTintColor: "#1173d4",
          headerStyle: {
            backgroundColor: "#ffffff",
            shadowColor: "#000",
            shadowOpacity: 0.05,
            shadowOffset: { width: 0, height: 2 },
            shadowRadius: 4,
            elevation: 2, // for Android shadow
          },
          // Right-side Logout Button
          headerRight: () => (
            <TouchableOpacity className="bg-[#f0f8ff] p-3 border border-[#1173d4] rounded-full mr-4">
              <Feather
                className=""
                name="log-out"
                size={22}
                color="#1f2937" // Tailwind gray-800
                onPress={() => logout()}
              />
            </TouchableOpacity>
          ),
        }}
      />

      <Tabs.Screen
        name="map"
        options={{
          headerShown: false,

          title: "Maps",
          tabBarLabelStyle: { fontWeight: "800" },

          tabBarIcon: ({ color }) => (
            <FontAwesome6 name="map-location-dot" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="create"
        options={{
          headerShown: true,
          title: "Register Complaint",
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontSize: 20,
            fontWeight: "700",
          },
          headerStyle: {
            backgroundColor: "#ffffff",
            shadowColor: "#000",
            shadowOpacity: 0.05,
            shadowOffset: { width: 0, height: 2 },
            shadowRadius: 4,
            elevation: 2,
          },

          tabBarButton: (props) => (
            <TouchableOpacity
              {...props}
              activeOpacity={0.8}
              style={{
                position: "absolute",
                top: -20,
                alignSelf: "center",
                width: 70,
                height: 70,
                borderRadius: 35,
                backgroundColor: "#1173d4",
                alignItems: "center",
                justifyContent: "center",
                shadowColor: "#000",
                shadowOpacity: 0.25,
                shadowOffset: { width: 0, height: 4 },
                shadowRadius: 6,
                elevation: 8,
              }}
            >
              <Ionicons name="create" size={28} color="white" />
            </TouchableOpacity>
          ),
        }}
      />

      <Tabs.Screen
        name="my-reports"
        options={{
          headerShown: true,
          title: "Reports",
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontSize: 20,
            fontWeight: "700",
          },
          headerStyle: {
            backgroundColor: "#ffffff",
            shadowColor: "#000",
            shadowOpacity: 0.05,
            shadowOffset: { width: 0, height: 2 },
            shadowRadius: 4,
            elevation: 2,
          },
          tabBarLabelStyle: { fontWeight: "800" },
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="file-document-multiple"
              size={24}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          headerShown: true,
          title: "Profile",
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontSize: 20,
            fontWeight: "700",
          },
          headerStyle: {
            backgroundColor: "#ffffff",
            shadowColor: "#000",
            shadowOpacity: 0.05,
            shadowOffset: { width: 0, height: 2 },
            shadowRadius: 4,
            elevation: 2,
          },
          tabBarLabelStyle: { fontWeight: "800" },
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="user-alt" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabLayout;
