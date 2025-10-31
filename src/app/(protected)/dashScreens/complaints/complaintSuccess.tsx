import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

// --- CONSTANTS (Equivalent to CSS variables) ---
// These colors should ideally be configured in your tailwind.config.js
const PRIMARY_COLOR = "#1173d4"; // --primary-color
const SUCCESS_GREEN = "#22c55e"; // --success-green
const GRAY_600 = "#4b5563";
const GRAY_900 = "#111827";

// --- CUSTOM BUTTON UTILITIES (Recreated using direct Tailwind classes) ---

const PrimaryButton = ({ title, onPress }) => (
  // Equivalent to .btn-primary: w-full bg-[var(--primary-color)] text-white font-semibold rounded-xl h-14 px-6 ...
  <TouchableOpacity
    onPress={onPress}
    activeOpacity={0.8}
    className="w-full px-6 flex items-center justify-center font-semibold rounded-xl shadow-sm transition-all duration-300 ease-in-out"
    style={{ backgroundColor: PRIMARY_COLOR }}
  >
    <Text className="text-white font-semibold text-base truncate">{title}</Text>
  </TouchableOpacity>
);

const SecondaryButton = ({ title, onPress }) => (
  // Equivalent to .btn-secondary: w-full bg-gray-100 text-gray-800 font-semibold rounded-xl h-14 px-6 ...
  <TouchableOpacity
    onPress={onPress}
    activeOpacity={0.8}
    className="w-full px-6 flex items-center justify-center font-semibold rounded-xl bg-gray-100 transition-all duration-300 ease-in-out"
  >
    <Text className="text-gray-800 font-semibold text-base truncate">
      {title}
    </Text>
  </TouchableOpacity>
);

const TertiaryButton = ({ title, onPress }) => (
  // Equivalent to .btn-tertiary: w-full bg-transparent text-gray-600 font-medium rounded-xl h-14 px-6 ...
  <TouchableOpacity
    onPress={onPress}
    activeOpacity={0.8}
    className="w-full px-6 flex items-center justify-center font-medium rounded-xl bg-transparent transition-all duration-300 ease-in-out"
  >
    <Text
      style={{ color: GRAY_600 }}
      className="font-medium text-base truncate"
    >
      {title}
    </Text>
  </TouchableOpacity>
);

// --- MAIN COMPONENT ---
const ReportSubmittedScreen = () => {
  const handlePress = (action: string) => {
    console.log(`${action} pressed!`);
  };

  return (
    <View className="flex-1 bg-white">
      <View className="relative flex size-full min-h-screen flex-col justify-between">
        {/* Scrollable/Growable Content Area */}
        <View className="flex pt-16 pb-12">
          <View className="flex flex-col items-center justify-center text-center px-6">
            {/* Success Icon Block (Equivalent to SVG + Ping) */}
            <View className="w-32 h-32 bg-green-50 rounded-full flex items-center justify-center mb-8 relative">
              {/* NOTE: RN does not support SVG ping. We use a standard RN style animation placeholder if needed. */}
              {/* We use a simple view for the ping effect placeholder */}
              <View
                style={[
                  StyleSheet.absoluteFill,
                  {
                    borderRadius: 9999,
                    backgroundColor: "#dcfce7",
                    opacity: 0.5,
                  },
                ]}
                // In a production app, you would apply an actual animation here.
              />
              {/* Checkmark Icon (Equivalent to the SVG path) */}
              <MaterialIcons name="check" size={80} color={SUCCESS_GREEN} />
            </View>

            {/* Text Content */}
            <Text
              className="text-4xl font-bold leading-tight tracking-tighter mb-4"
              style={{ color: GRAY_900 }}
            >
              Submission Successful
            </Text>
            <Text
              className="text-base font-normal leading-relaxed max-w-sm"
              style={{ color: GRAY_600 }}
            >
              Your civic report has been successfully submitted. It will be
              reviewed by the appropriate local government department shortly.
            </Text>
          </View>

          {/* Action Buttons */}
          <View className="px-6 pt-12 flex-col gap-4 max-w-md mx-auto">
            <PrimaryButton
              title="View My Report"
              onPress={() => handlePress("View Report")}
            />
            <SecondaryButton
              title="Submit Another Report"
              onPress={() => handlePress("Submit Another")}
            />
            <TertiaryButton
              title="Return to Home"
              onPress={() => handlePress("Return Home")}
            />
          </View>
        </View>

        {/* Bottom Navigation (Fixed) */}
        <View className="bg-white border-t border-gray-100">
          <View className="flex flex-row gap-2 px-4 pb-3 pt-2">
            {/* Home - Using MaterialIcons: Home */}
            <TouchableOpacity
              className="flex flex-1 flex-col items-center justify-end gap-1"
              onPress={() => handlePress("Home")}
            >
              <View className="flex h-8 items-center justify-center">
                <MaterialIcons
                  name="home"
                  size={24}
                  style={{ color: GRAY_600 }}
                />
              </View>
              <Text
                className="text-xs font-medium leading-normal tracking-wide"
                style={{ color: GRAY_600 }}
              >
                Home
              </Text>
            </TouchableOpacity>

            {/* Map - Using MaterialIcons: Map */}
            <TouchableOpacity
              className="flex flex-1 flex-col items-center justify-end gap-1"
              onPress={() => handlePress("Map")}
            >
              <View className="flex h-8 items-center justify-center">
                <MaterialIcons
                  name="map"
                  size={24}
                  style={{ color: GRAY_600 }}
                />
              </View>
              <Text
                className="text-xs font-medium leading-normal tracking-wide"
                style={{ color: GRAY_600 }}
              >
                Map
              </Text>
            </TouchableOpacity>

            {/* Report (Active) - Using MaterialIcons: Description (or Note) for document/report */}
            <TouchableOpacity
              className="flex flex-1 flex-col items-center justify-end gap-1"
              onPress={() => handlePress("Report")}
            >
              <View className="flex h-8 items-center justify-center">
                <MaterialIcons
                  name="note-add"
                  size={24}
                  style={{ color: PRIMARY_COLOR }}
                />
              </View>
              <Text
                className="text-xs font-bold leading-normal tracking-wide"
                style={{ color: PRIMARY_COLOR }}
              >
                Report
              </Text>
            </TouchableOpacity>

            {/* My Reports - Using MaterialIcons: Description or List */}
            <TouchableOpacity
              className="flex flex-1 flex-col items-center justify-end gap-1"
              onPress={() => handlePress("My Reports")}
            >
              <View className="flex h-8 items-center justify-center">
                <MaterialIcons
                  name="list-alt"
                  size={24}
                  style={{ color: GRAY_600 }}
                />
              </View>
              <Text
                className="text-xs font-medium leading-normal tracking-wide"
                style={{ color: GRAY_600 }}
              >
                My Reports
              </Text>
            </TouchableOpacity>

            {/* Profile - Using MaterialIcons: Person */}
            <TouchableOpacity
              className="flex flex-1 flex-col items-center justify-end gap-1"
              onPress={() => handlePress("Profile")}
            >
              <View className="flex h-8 items-center justify-center">
                <MaterialIcons
                  name="person"
                  size={24}
                  style={{ color: GRAY_600 }}
                />
              </View>
              <Text
                className="text-xs font-medium leading-normal tracking-wide"
                style={{ color: GRAY_600 }}
              >
                Profile
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ReportSubmittedScreen;
