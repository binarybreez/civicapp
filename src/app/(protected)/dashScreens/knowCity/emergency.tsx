import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
// NOTE: Make sure your tailwind.config.js has "primary": "#1173d4", "background-light": "#f6f7f8" configured.

// Define colors used in the original HTML config (light mode only)
const PRIMARY_COLOR = "#1173d4";
const BG_LIGHT = "#f6f7f8";
const RED_600 = "#dc2626"; // For sos icon and call button
const GRAY_700 = "#617589"; // For description text
const TEXT_BLACK = "#111418"; // For headings

// Utility component to replace HTML 'a' tag
const CardLink = ({
  iconName,
  iconColor,
  title,
  description,
  onPress,
}: {
  iconName: keyof typeof MaterialIcons.glyphMap;
  iconColor: string;
  title: string;
  description: string;
  onPress: () => void;
}) => (
  // FIX: Simplified the sizing. Using w-1/2 - 2 (to account for gap-4)
  // is a common trick to force a two-column layout that respects spacing.
  // The margin-right is added to complete the horizontal gap effect.
  <TouchableOpacity
    onPress={onPress}
    className="flex gap-3 rounded-xl border border-gray-200 bg-white p-4 flex-col active:bg-gray-50 transition-colors shadow-sm"
    activeOpacity={0.7}
    // Force the width to be slightly less than 50% to ensure two fit with the gap
    style={{ width: "48%" }}
  >
    <MaterialIcons name={iconName} size={24} color={iconColor} />
    <View className="flex flex-col gap-1 mt-auto">
      <Text
        style={{ color: TEXT_BLACK }}
        className="text-base font-bold leading-tight"
      >
        {title}
      </Text>
      <Text
        style={{ color: GRAY_700 }}
        className="text-sm font-normal leading-normal"
      >
        {description}
      </Text>
    </View>
  </TouchableOpacity>
);

// Utility component for navigation links
const NavLink = ({
  iconName,
  label,
  isActive = false,
  onPress,
}: {
  iconName: keyof typeof MaterialIcons.glyphMap;
  label: string;
  isActive?: boolean;
  onPress: () => void;
}) => {
  // Determine styles based on active state
  const textStyle = isActive
    ? `text-[${PRIMARY_COLOR}] text-xs font-bold leading-normal tracking-[0.015em]`
    : `text-[${GRAY_700}] text-xs font-medium leading-normal tracking-[0.015em]`;
  const iconColor = isActive ? PRIMARY_COLOR : GRAY_700;

  return (
    <TouchableOpacity
      onPress={onPress}
      className="flex flex-1 flex-col items-center justify-end gap-1"
      activeOpacity={0.7}
    >
      <MaterialIcons name={iconName} size={24} color={iconColor} />
      <Text className={textStyle} style={{ color: iconColor }}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

// Main component
const EmergencyServicesLight = () => {
  const handlePress = (name: string) => {
    console.log(`${name} pressed!`);
  };

  return (
    // 1. SafeAreaView (outermost container) has flex: 1
    <View style={{ flex: 1, backgroundColor: BG_LIGHT }}>
      {/* 2. Main container has flex: 1 and flex-col */}
      <View
        style={{ flex: 1, backgroundColor: BG_LIGHT }}
        className="flex flex-col"
      >

        {/* 3. ScrollView (Must have style={{ flex: 1 }}) */}
        <ScrollView style={{ flex: 1 }}>
          <Text
            style={{ color: TEXT_BLACK }}
            className="text-[32px] font-bold leading-tight px-4 text-left pb-3 pt-4"
          >
            Emergency Hub
          </Text>

          {/* Grid of Services (Content to be scrolled) */}
          {/* FIX: Use justify-between and flex-wrap on the container to manage the spacing */}
          <View className="flex flex-row flex-wrap justify-between gap-y-4 p-4">
            <CardLink
              onPress={() => handlePress("Emergency Numbers")}
              iconName="sos"
              iconColor={RED_600}
              title="Emergency Numbers"
              description="Quick access to national helplines"
            />
            <CardLink
              onPress={() => handlePress("Hospitals Near Me")}
              iconName="local-hospital"
              iconColor={PRIMARY_COLOR}
              title="Hospitals Near Me"
              description="Find and navigate to the closest hospitals"
            />
            <CardLink
              onPress={() => handlePress("Blood Banks Near Me")}
              iconName="bloodtype"
              iconColor={PRIMARY_COLOR}
              title="Blood Banks Near Me"
              description="Locate nearby blood donation centers"
            />
            <CardLink
              onPress={() => handlePress("Police Stations Near Me")}
              iconName="local-police"
              iconColor={PRIMARY_COLOR}
              title="Police Stations Near Me"
              description="Find directions to local police stations"
            />
            <CardLink
              onPress={() => handlePress("Fire Services")}
              iconName="local-fire-department"
              iconColor={RED_600}
              title="Fire Services"
              description="Locate nearby fire departments"
            />
            <CardLink
              onPress={() => handlePress("Ambulance")}
              iconName="local-gas-station"
              iconColor={RED_600}
              title="Ambulance Call"
              description="Immediate ambulance dispatch"
            />
            <CardLink
              onPress={() => handlePress("Search")}
              iconName="search"
              iconColor={PRIMARY_COLOR}
              title="Search Directory"
              description="Look up specific services"
            />
            <CardLink
              onPress={() => handlePress("Settings")}
              iconName="settings"
              iconColor={PRIMARY_COLOR}
              title="Service Settings"
              description="Manage your emergency profiles"
            />
          </View>

          {/* Call Button */}
          <View className="px-4 py-3 mb-4">
            <TouchableOpacity
              onPress={() => handlePress("Call Emergency")}
              className="flex min-w-[84px] items-center justify-center overflow-hidden rounded-lg h-12 px-5 flex-1 bg-red-600 active:bg-red-700 flex-row"
              activeOpacity={0.8}
            >
              <MaterialIcons name="call" size={24} color="white" />
              <Text className="text-white text-base font-bold leading-normal tracking-[0.015em] truncate">
                Call National Emergency Number
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>


      </View>
    </View>
  );
};

export default EmergencyServicesLight;
