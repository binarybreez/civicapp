import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  Platform,
  SafeAreaView, // 👈 ADDED
} from "react-native";

import { MaterialIcons } from "@expo/vector-icons";

// --- Components ---

// Navigation Link Component
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
  const iconColor = isActive ? "#2563eb" : "#4b5563"; // blue-600 vs gray-600
  const textClass = isActive ? "text-blue-600" : "text-gray-600";

  return (
    <TouchableOpacity
      className="flex flex-col items-center gap-1"
      activeOpacity={0.7}
    >
      <MaterialIcons name={iconName} size={24} color={iconColor} />
      <Text className={`text-xs font-medium ${textClass}`}>{label}</Text>
    </TouchableOpacity>
  );
};

// City Service Card Component
interface ServiceCardProps {
  iconName: keyof typeof MaterialIcons.glyphMap;
  title: string;
  iconBgClass: string;
  iconTextClass: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  iconName,
  title,
  iconBgClass,
  iconTextClass,
}) => (
  <View className="flex flex-row items-center gap-3 rounded-xl bg-gray-50 p-4">
    <View
      className={`flex size-10 items-center justify-center rounded-full ${iconBgClass} ${iconTextClass}`}
    >
      <MaterialIcons name={iconName} size={20} />
    </View>
    <Text className="text-base font-semibold text-gray-800">{title}</Text>
  </View>
);

// Landmark Card Component
interface LandmarkCardProps {
  imageUrl: string;
  caption: string;
}

const LandmarkCard: React.FC<LandmarkCardProps> = ({ imageUrl, caption }) => (
  <TouchableOpacity className="group w-1/2 p-2 -ml-2" activeOpacity={0.7}>
    <Image
      source={{ uri: imageUrl }}
      className="h-40 w-full rounded-xl bg-gray-200"
      resizeMode="cover"
    />
    <Text className="mt-2 text-center text-sm font-medium text-gray-700">
      {caption}
    </Text>
  </TouchableOpacity>
);

// Transportation Link Component
interface TransportLinkProps {
  iconName: keyof typeof MaterialIcons.glyphMap;
  title: string;
  subtitle: string;
  iconBgClass: string;
  iconTextClass: string;
}

const TransportLink: React.FC<TransportLinkProps> = ({
  iconName,
  title,
  subtitle,
  iconBgClass,
  iconTextClass,
}) => (
  <TouchableOpacity
    className="flex flex-row items-center gap-4 rounded-lg bg-white p-3 shadow-sm transition active:bg-gray-50"
    activeOpacity={0.8}
  >
    <View
      className={`flex size-12 items-center justify-center rounded-lg ${iconBgClass} ${iconTextClass}`}
    >
      <MaterialIcons name={iconName} size={24} />
    </View>
    <View className="flex-1">
      <Text className="font-semibold text-gray-800">{title}</Text>
      <Text className="text-sm text-gray-500">{subtitle}</Text>
    </View>
    <MaterialIcons
      name="chevron-right"
      size={24}
      color="#9ca3af"
      className="ml-auto text-gray-400"
    />
  </TouchableOpacity>
);

// --- Main Component ---
const KnowYourCityScreen: React.FC = () => {
  return (
    // SafeAreaView is essential for correct spacing on notched devices
    <View className="flex-1 bg-white">
      <View className="relative flex h-full min-h-full flex-col justify-between overflow-x-hidden">
        {/* Top Content (Header and Scrollable Main) */}
        <View className="flex flex-col flex-1">
          {/* --- Search Bar (Sticky) --- */}
          {/* <View
            // sticky top-0 bg-white px-4 pb-4 pt-2
            className="sticky top-0 bg-white px-4 pb-4 pt-2 border-b border-white"
            style={{
              zIndex: 10,
              ...Platform.select({
                ios: {
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 1 },
                  shadowOpacity: 0.05,
                  shadowRadius: 2,
                },
                android: {
                  elevation: 2,
                },
              }),
            }}
          >
            <View className="relative">
              <MaterialIcons
                name="search"
                size={20}
                color="#6b7280" // gray-500
                style={{
                  position: "absolute",
                  left: 16, // Adjusted from 12 for better centering with paddingLeft: 40
                  top: 14, // Adjusted to visually center vertically
                }}
              />
              <TextInput
                className="w-full rounded-full border border-gray-200 bg-gray-100 py-3 pl-10 pr-4 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-blue-500"
                placeholder="Search for city information"
                placeholderTextColor="#6b7280"
                style={{ height: 48, paddingLeft: 40 }}
              />
            </View>
          </View> */}

          {/* --- Main Content (Scrollable) --- */}
          <ScrollView className="flex-1 gap-8 px-4 pb-8">
            {/* City Services Section */}
            <View>
              <Text className="px-2 text-2xl font-bold text-gray-900 mt-4">
                City Services
              </Text>
              {/* Uses flex-row and flex-wrap to simulate grid-cols-2 for RN */}
              <View className="mt-4 flex flex-row flex-wrap justify-between gap-4">
                <View className="w-[48%]">
                  <ServiceCard
                    iconName="domain"
                    title="Government"
                    iconBgClass="bg-blue-100"
                    iconTextClass="text-blue-600"
                  />
                </View>
                <View className="w-[48%]">
                  <ServiceCard
                    iconName="local-hospital"
                    title="Hospitals"
                    iconBgClass="bg-red-100"
                    iconTextClass="text-red-600"
                  />
                </View>
                <View className="w-[48%]">
                  <ServiceCard
                    iconName="directions-bus"
                    title="Transport"
                    iconBgClass="bg-green-100"
                    iconTextClass="text-green-600"
                  />
                </View>
                <View className="w-[48%]">
                  <ServiceCard
                    iconName="park"
                    title="Parks"
                    iconBgClass="bg-yellow-100"
                    iconTextClass="text-yellow-600"
                  />
                </View>
              </View>
            </View>
            {/* Local Landmarks Section */}
            <View>
              <Text className="px-2 text-2xl font-bold text-gray-900">
                Local Landmarks
              </Text>
              {/* Uses flex-row and flex-wrap to simulate grid-cols-2 */}
              <View className="mt-4 flex flex-row flex-wrap justify-between gap-4">
                {/* Note: LandmarkCard was modified to handle its own 50% width and margin */}
                <LandmarkCard
                  imageUrl="https://lh3.googleusercontent.com/aida-public/AB6AXuDa8O1c9k_IEhovtWG5ibvSFASpEe0UE1X-AQ1db_J7DyQp1akeBf2IV_gAW86QFmvrX957oc9kec6Hsjp-u3oq7SYDagMAcRgrd7z_rP41DTyPpGvpNARr2ch5cJkqVkFBYgJv0ls6qmYAB01l_4aMpPOhJFLWETeSusG8S4Ke_yj3TKcTnWApviBRibS6ReGKp9BRdCAsV_yeZ7uoel-2s0TNlySQiH_nLSCRMoHkjizevcCirs6jt-EqI3r0LRg_Jg505IZWMw"
                  caption="City Hall"
                />
                <LandmarkCard
                  imageUrl="https://lh3.googleusercontent.com/aida-public/AB6AXuDeupAGGmOgVzYPZSXSlSQHXKFvXtuLNINaaV3oQ5MYX75Y7-SPaZFKEkX88QZUSo_FoPrAWRMbQQkVnMM1SFBBstUwqIGx1EYbh0878fH3phA0UVnGm69WwJ2vmZXjZr8E3lrryNKgKIqF_oKrv0Ifwigz_Oe6ceLvqJDIG9fp5sDzXltQRP4K-L7IaaCu1fso67fQIKdgpCfnFsJbpL79NVkAOo3VEZ1E9tfFb29nPW73wnAgm4ko5uB2PH3eANfnnChmAoCxPA"
                  caption="Historical Museum"
                />
                <LandmarkCard
                  imageUrl="https://lh3.googleusercontent.com/aida-public/AB6AXuDBN914zg4JKBz6WKwzTegTNi5zYXRwrAgO-bobUdEmWX45cM1-9UhqCxqBjc0gT3vgc-pSJEYChSaDNkYvWbwQNzfNhrQLzkoWFZS97AJP2NjvsHmsGSsH1k9Vt8ZMb06aJfPFBpMtIrGlV7TGz4kZXoFr5Xa0bnIxCyf31KAwCntvpTm2dGkJtIIB1HvP_kMwqECDgbYQVL75u56Es0exTy7EbQc-E4SwOVSN1SLdZdsOgAw-HAw5DxhfgD_bZLJWfBARBo9bFA"
                  caption="Public Library"
                />
              </View>
            </View>
            {/* Public Transportation Section */}
            <View>
              <Text className="px-2 text-2xl font-bold text-gray-900">
                Public Transportation
              </Text>
              <View className="mt-4 grid grid-cols-1 gap-3">
                <TransportLink
                  iconName="directions-bus"
                  title="Bus Routes"
                  subtitle="View all city bus lines"
                  iconBgClass="bg-blue-100"
                  iconTextClass="text-blue-600"
                />
                <TransportLink
                  iconName="tram"
                  title="Train Schedules"
                  subtitle="Check train timings"
                  iconBgClass="bg-purple-100"
                  iconTextClass="text-purple-600"
                />
                <TransportLink
                  iconName="subway"
                  title="Subway Lines"
                  subtitle="Explore underground routes"
                  iconBgClass="bg-teal-100"
                  iconTextClass="text-teal-600"
                />
                <TransportLink
                  iconName="local-taxi"
                  title="Taxi Services"
                  subtitle="Find local taxi providers"
                  iconBgClass="bg-orange-100"
                  iconTextClass="text-orange-600"
                />
              </View>
            </View>
            <View className="h-20" /> {/* Extra spacing before footer */}
          </ScrollView>
        </View>
      </View>
    </View>
  );
};

export default KnowYourCityScreen;
