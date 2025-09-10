import React from "react";
import {
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  StyleSheet,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function App() {
  return (
    <View className="flex-1 bg-gray-50">
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        {/* Main Content */}
        <View className="p-6">
          {/* Profile Card */}
          <View className="flex flex-col items-center text-center">
            <View className="relative">
              <Image
                source={{
                  uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuAQCO4wA8v3CVEmKSNYotB3Ohu2Lx8TpsZyj3KuUhGv_N4KHg1SKYBuqJQZZMgxYirMu1CaxbsJ3Jhq336UvY4KpWGV1F6x_uwlDanCF7oNTq83-SjzywzrG7ZRuiD5HK-e4tgbVI_OmvRSKr9HFPAq3vmtypZZM1GYV6CFuHqCDbEHQrxoG0jSKjpT8LQjP4JKEcQfAcJCAxu4_D28hmRn1Rvshi7vRpIhc6oXBUXvbUSPdXAnUc0A0dgtOWPwMH1o4broAnCdFQ",
                }}
                className="bg-center bg-no-repeat aspect-square rounded-full h-32 w-32 object-cover border-4 border-white"
                style={[localStyles.shadow]}
              />
              <TouchableOpacity
                className="absolute bottom-1 right-1 bg-white rounded-full p-2 h-9 w-9 flex items-center justify-center active:bg-gray-100 transition-colors"
                style={[localStyles.shadow]}
              >
                <MaterialIcons name="edit" size={20} color="#1173d4" />
              </TouchableOpacity>
            </View>
            <View className="mt-4">
              <Text className="text-gray-900 text-2xl font-bold leading-tight tracking-tight">
                Sophia Carter
              </Text>
              <Text className="text-gray-500 text-base font-normal leading-normal">
                sophia.carter@example.com
              </Text>
            </View>
          </View>

          {/* Forms and Settings */}
          <View className="mt-10 space-y-8">
            {/* Personal Information Section */}
            <View>
              <Text className="text-gray-500 text-sm font-semibold uppercase tracking-wider px-1 pb-4">
                Personal Information
              </Text>
              <View className="flex-col gap-4 rounded-xl p-4">
                <FloatingLabelInput
                  label="Full Name"
                  value="Sophia Carter"
                  editable={true}
                />
                <FloatingLabelInput
                  label="Email"
                  value="sophia.carter@example.com"
                  editable={true}
                  keyboardType="email-address"
                />
                <FloatingLabelInput
                  label="Phone"
                  placeholder="Add phone number"
                  editable={true}
                  keyboardType="phone-pad"
                />
                <FloatingLabelInput
                  label="Address"
                  placeholder="Add your address"
                  editable={true}
                />
                <View className="flex-row justify-end pt-4">
                  <TouchableOpacity
                    className="flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-6 bg-primary-color text-white text-base font-bold leading-normal tracking-wide bg-blue-700 transition-colors"
                    style={[localStyles.shadow]}
                  >
                    <Text className="text-white font-bold">Save Changes</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            {/* Account Settings Section */}
            <View>
              <Text className="text-gray-500 text-sm font-semibold uppercase tracking-wider px-1 pb-4">
                Account Settings
              </Text>
              <View
                className="bg-white rounded-xl divide-y divide-gray-100"
                style={[localStyles.shadow]}
              >
                <OptionItem
                  label="Manage Notifications"
                  path="/profile/AccountSettings/manageNotifications"
                />
                <OptionItem
                  label="Privacy Settings"
                  path="/profile/AccountSettings/privacySettings"
                />
                <OptionItem
                  label="Connected Accounts"
                  path="/profile/AccountSettings/connectedAccounts"
                />
              </View>
            </View>

            {/* App Information Section */}
            <View>
              <Text className="text-gray-500 text-sm font-semibold uppercase tracking-wider px-1 pb-4 mt-8">
                App Information & Help
              </Text>
              <View
                className="bg-white rounded-xl divide-y divide-gray-100"
                style={[localStyles.shadow]}
              >
                <OptionItem
                  label="FAQs & Help Center"
                  path="/profile/AppInfo/FAQs"
                />
                <OptionItem label="About Us" path="/profile/AppInfo/AboutUs" />
                <OptionItem
                  label="Terms of Service"
                  path="/profile/AppInfo/TermsOService"
                />
                <OptionItem
                  label="Privacy Policy"
                  path="/profile/AppInfo/privacyPolicy"
                />
              </View>
            </View>
          </View>

          {/* Log Out and Delete */}
          <View className="mt-10 pt-6 border-t border-gray-200 flex flex-col items-center gap-4">
            <TouchableOpacity
              className="flex w-full max-w-sm cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-6 bg-red-50 border border-red-200 text-red-600 text-base font-bold leading-normal tracking-wide active:bg-red-100"
              style={[localStyles.shadow]}
            >
              <Text className="text-red-600 font-bold">Log Out</Text>
            </TouchableOpacity>
            <TouchableOpacity className="py-2 active:text-red-600">
              <Text className="text-gray-500 text-sm font-medium">
                Delete Account
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

// Reusable components
const FloatingLabelInput = ({ label, ...props }: { label: string }) => {
  return (
    <View className="relative" style={[localStyles.shadow]}>
      <Text className="absolute -top-2 left-3 bg-white px-1 text-xs text-gray-500 z-10">
        {label}
      </Text>
      <TextInput
        className="flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-gray-900 border border-gray-300 bg-white h-14 px-4 text-base font-normal leading-normal"
        {...props}
      />
    </View>
  );
};

const OptionItem = ({ label, path }: { label: string; path: string }) => {
  const router = useRouter();
  return (
    <TouchableOpacity
      className="flex-row items-center gap-4 p-4 min-h-14 justify-between active:bg-gray-50"
      onPress={() => router.push(`/(protected)${path}`)}
    >
      <Text className="text-gray-800 text-base font-medium leading-normal flex-1 truncate">
        {label}
      </Text>
      <MaterialIcons name="chevron-right" size={24} color="#9CA3AF" />
    </TouchableOpacity>
  );
};

const localStyles = StyleSheet.create({
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
