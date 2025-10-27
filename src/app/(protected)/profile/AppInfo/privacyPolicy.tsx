import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Platform,
} from "react-native";

// Import MaterialIcons from Expo Vector Icons
import { MaterialIcons } from "@expo/vector-icons";

// --- Constants (Approximating the CSS variable) ---
const PRIMARY_COLOR = "#1173d4";
const PRIMARY_COLOR_CLASS = "text-[#1173d4]"; // NativeWind class for direct color usage

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
  return (
    <TouchableOpacity
      className={`flex flex-col items-center gap-1 ${isActive ? PRIMARY_COLOR_CLASS : "text-gray-500"}`}
      activeOpacity={0.7}
    >
      <MaterialIcons
        name={iconName}
        size={24}
        color={isActive ? PRIMARY_COLOR : "#6b7280"} // Directly pass color for icons
      />
      <Text className="text-xs font-medium">{label}</Text>
    </TouchableOpacity>
  );
};

// --- Main Component ---
const PrivacyPolicyScreen: React.FC = () => {
  // Use a custom style object for the primary color where needed (like the profile icon color)

  return (
    // SafeAreaView handles padding for device notches/system bars
    <View className="flex-1 bg-white">
      <View
        // Equivalent to the main <div> wrapper: size-full min-h-screen flex-col bg-white
        className="relative flex h-full min-h-full flex-col bg-white"
        style={
          {
            // Apply font-family approximation (requires custom font loading in a real project)
            // Since we can't directly use 'Public Sans' without loading it, we rely on the system font,
            // but include the class structure.
          }
        }
      >
        {/* --- Main Content (Scrollable) --- */}
        <ScrollView
          // flex-1 overflow-y-auto px-6 py-8
          className="flex-1 px-6 py-8"
        >
          {/* The prose max-w-none is handled by individual text styles */}
          <View className="max-w-none text-gray-800">
            <Text className="mb-6">
              At CityConnect, we are committed to protecting your privacy and
              ensuring the security of your personal information. This Privacy
              Policy outlines how we collect, use, and safeguard the information
              you provide when using our application. By using CityConnect, you
              agree to the terms of this policy.
            </Text>
            {/* Section 1 */}
            <Text className="text-xl font-bold text-gray-900 mt-4 mb-3">
              Information We Collect
            </Text>
            <Text className="mb-6">
              We collect information such as your name, contact details, and
              location to facilitate issue reporting and communication. This
              data helps us connect you with local authorities and provide
              updates on issue resolution. We may also collect usage data to
              improve our services and user experience.
            </Text>
            {/* Section 2 */}
            <Text className="text-xl font-bold text-gray-900 mt-4 mb-3">
              How We Use Your Information
            </Text>
            <Text className="mb-6">
              Your information is stored securely and is only accessible to
              authorized personnel. We do not share your personal information
              with third parties without your explicit consent, except when
              required by law.
            </Text>
            {/* Section 3 */}
            <Text className="text-xl font-bold text-gray-900 mt-4 mb-3">
              Your Rights
            </Text>
            <Text className="mb-6">
              You have the right to access, correct, or delete your personal
              information. Please contact us if you have any questions or
              concerns about your privacy.
            </Text>
            {/* Section 4 */}
            <Text className="text-xl font-bold text-gray-900 mt-4 mb-3">
              Policy Updates
            </Text>
            <Text className="mb-6">
              We may update this policy periodically, and any changes will be
              posted within the application. Your continued use of CityConnect
              after such changes constitutes your acceptance of the new terms.
            </Text>
            <Text>
              Thank you for trusting CityConnect with your civic engagement.
            </Text>
          </View>
        </ScrollView>

        {/* --- Footer (Bottom Navigation) --- */}
        <View
          // sticky bottom-0 border-t border-gray-200 bg-white pt-2 pb-5
          className="bottom-0 border-t border-gray-200 bg-white pt-2"
          style={{
            paddingBottom: Platform.OS === "ios" ? 30 : 20, // pb-5 equivalent, adjusting for safe area on iOS
          }}
        >
          <View className="flex flex-row justify-around">
            <NavLink iconName="home" label="Home" />
            <NavLink iconName="map" label="Map" />
            <NavLink iconName="add-box" label="Report" />
            <NavLink iconName="notifications" label="Activity" />
            <NavLink iconName="person" label="Profile" isActive={true} />
          </View>
        </View>
      </View>
    </View>
  );
};

export default PrivacyPolicyScreen;
