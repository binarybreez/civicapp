import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Platform,
} from "react-native";

// Import necessary icons from Expo Vector Icons
import { MaterialIcons, FontAwesome } from "@expo/vector-icons";

// --- Constants ---
const PRIMARY_COLOR = "#1173d4";
const PRIMARY_COLOR_CLASS = "text-primary-color"; // Assumes primary-color is defined in tailwind.config.js

// --- Navigation Link Component ---
interface NavLinkProps {
  iconName: keyof typeof MaterialIcons.glyphMap;
  label: string;
  isActive?: boolean;
}

const NavLink: React.FC<NavLinkProps> = ({
  iconName,
  label,
  isActive = false,
}) => {
  const iconColor = isActive ? PRIMARY_COLOR : "#64748b"; // slate-500
  const textClass = isActive ? PRIMARY_COLOR_CLASS : "text-slate-500";

  return (
    <TouchableOpacity
      className="flex flex-col items-center justify-end gap-1 px-2"
      activeOpacity={0.7}
    >
      <MaterialIcons
        name={iconName}
        size={24}
        color={iconColor}
        // Note: The 'FILL' 1 variation setting for the active icon is not directly supported
        // in RN Vector Icons, but the color change visually indicates activity.
      />
      <Text className={`text-xs font-medium ${textClass}`}>{label}</Text>
    </TouchableOpacity>
  );
};

// --- Social Icon Components (Approximating SVGs with FontAwesome) ---

const FacebookIcon: React.FC = () => (
  <TouchableOpacity activeOpacity={0.7}>
    {/* Equivalent to Facebook SVG path */}
    <FontAwesome
      name="facebook-official"
      size={24}
      color="#64748b"
      className="hover:text-primary-color"
    />
  </TouchableOpacity>
);

const TwitterIcon: React.FC = () => (
  <TouchableOpacity activeOpacity={0.7}>
    {/* Equivalent to Twitter/X SVG path */}
    <FontAwesome
      name="twitter-square"
      size={24}
      color="#64748b"
      className="hover:text-primary-color"
    />
  </TouchableOpacity>
);

const GithubIcon: React.FC = () => (
  <TouchableOpacity activeOpacity={0.7}>
    {/* Equivalent to GitHub SVG path */}
    <FontAwesome
      name="github-square"
      size={24}
      color="#64748b"
      className="hover:text-primary-color"
    />
  </TouchableOpacity>
);

// --- Main Component ---
const AboutUsScreen: React.FC = () => {
  return (
    <View className="flex-1 bg-white">
      <View
        // relative flex size-full min-h-screen flex-col justify-between overflow-x-hidden
        className="relative flex h-full min-h-full flex-col justify-between overflow-x-hidden"
      >
        {/* Top Content (Header and Scrollable Main) */}
        <View className="flex flex-col flex-1">

          {/* --- Main Content (Scrollable) --- */}
          <ScrollView
            // flex-grow px-6 pt-4 pb-8
            className="px-6 pt-4 pb-8"
          >
            <View className="flex flex-col items-center text-center">
              <View className="mb-6">
                <Image
                  source={{
                    uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuDnuX-ZI2w2ZY_n1PNMGvn7QG5POXhX5bK03BrBhPy3MFVXsK9j33jw_stT7lXhJ5PZJThIhaypcXkQm8i-eUG_bhd3NzZsCzUCHCDWunK8zoOPqsrMAIYvR6dsj5SyV617DAEaeasPhyJfC40avpZNMk8TFzaYUvvE7T_XWmEdmW7qPQ90ndY_kXMY5btgjiEcgNpBZMmUeZ_qS6h6WBW9CDeDKI9IwfTgWt7tWfXyi-8FnTAwcyAiJ3LUU-x9u3lnYX_KDsjcYQ",
                  }}
                  alt="CivicConnect Logo"
                  className="w-24 h-24 rounded-full shadow-md"
                />
              </View>
              <Text className="text-3xl font-bold text-slate-900">
                CivicConnect
              </Text>
              <Text className="mt-3 text-base leading-relaxed text-slate-600">
                CivicConnect is a platform designed to empower citizens by
                providing a direct channel to report and track civic issues,
                fostering transparency and accountability in local governance.
              </Text>
            </View>

            {/* Version and Copyright Info */}
            <View className="mt-12 space-y-6">
              <View className="flex flex-row items-center justify-between p-4 bg-slate-50 rounded-lg">
                <Text className="text-base font-medium text-slate-700">
                  Version
                </Text>
                <Text className="text-base text-slate-500">1.0.0</Text>
              </View>
              <View className="flex flex-row items-center justify-between p-4 bg-slate-50 rounded-lg">
                <Text className="text-base font-medium text-slate-700">
                  Copyright
                </Text>
                <Text className="text-base text-slate-500">
                  © 2024 CivicConnect
                </Text>
              </View>
            </View>

            {/* Social Media Links */}
            <View className="mt-12 text-center">
              <Text className="mb-4 text-sm text-slate-500">Follow us on</Text>
              <View className="flex flex-row justify-center gap-6">
                <FacebookIcon />
                <TwitterIcon />
                <GithubIcon />
              </View>
            </View>
            {/* Add padding at the bottom for better scrolling experience before footer */}
            <View className="h-20" />
          </ScrollView>
        </View>
      </View>
    </View>
  );
};

export default AboutUsScreen;
