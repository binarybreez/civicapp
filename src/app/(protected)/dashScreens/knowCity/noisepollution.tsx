import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Platform,
} from "react-native";

// Import Icons and Picker
import { MaterialIcons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker"; // Requires installation: npm install @react-native-picker/picker

// --- Custom Components ---

// Dropdown Component using @react-native-picker/picker
interface DropdownProps {
  label: string;
  selectedValue: string;
  onValueChange: (itemValue: string) => void;
  options: { label: string; value: string }[];
}

const RNDropdown: React.FC<DropdownProps> = ({
  label,
  selectedValue,
  onValueChange,
  options,
}) => (
  <View>
    <Text className="text-sm font-medium text-gray-700">{label}</Text>
    <View
      className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm bg-gray-100 overflow-hidden min-h-[48px] justify-center"
      // Added explicit height styling for Android to match the HTML h-12
      style={{ height: Platform.OS === "android" ? 50 : undefined }}
    >
      <Picker
        selectedValue={selectedValue}
        onValueChange={onValueChange}
        mode="dropdown"
        style={{ color: "#1f2937" }} // text-gray-900
      >
        {options.map((option) => (
          <Picker.Item
            key={option.value}
            label={option.label}
            value={option.value}
          />
        ))}
      </Picker>
    </View>
  </View>
);

// --- Main Component ---
const NoisePollutionReportScreen: React.FC = () => {
  const [noiseSource, setNoiseSource] = useState("Loud Music/Parties");

  return (
    <View className="flex-1 bg-gray-50">
      <View
        // relative flex size-full min-h-screen flex-col bg-white
        className="relative flex h-full min-h-full flex-col bg-white"
      >
        {/* --- Main Content (Scrollable) --- */}
        <ScrollView
          // flex-1 overflow-y-auto p-6 space-y-6
          className="flex-1 p-6 gap-6"
          contentContainerStyle={{ paddingBottom: 20 }} // Add bottom padding for scroll view
        >
          <View className="flex-col gap-4">
            {/* Complaint Title Input */}
            <View>
              <Text className="text-sm font-medium text-gray-700">
                Complaint Title
              </Text>
              <TextInput
                className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-lime-500 focus:ring-lime-500 text-sm h-12 px-4 bg-gray-100 text-gray-900 placeholder-gray-500"
                placeholder="e.g. Loud music from neighbor"
              />
            </View>

            {/* Description of the Issue (Textarea) */}
            <View>
              <Text className="text-sm font-medium text-gray-700">
                Description of the Issue
              </Text>
              <TextInput
                className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-lime-500 focus:ring-lime-500 text-sm min-h-[120px] p-4 bg-gray-100 text-gray-900 placeholder-gray-500"
                placeholder="Describe the noise, its duration, and impact."
                multiline={true}
                numberOfLines={5}
                style={{ minHeight: 120, textAlignVertical: "top" }} // Enforce height and alignment
              />
            </View>

            {/* Source of Noise (Dropdown) */}
            <RNDropdown
              label="Source of Noise"
              selectedValue={noiseSource}
              onValueChange={(itemValue) => setNoiseSource(itemValue)}
              options={[
                { label: "Construction Site", value: "Construction Site" },
                { label: "Loud Music/Parties", value: "Loud Music/Parties" },
                { label: "Traffic Noise", value: "Traffic Noise" },
                {
                  label: "Industrial Machinery",
                  value: "Industrial Machinery",
                },
                { label: "Other", value: "Other" },
              ]}
            />

            {/* When did this occur? (Datetime-local Placeholder) */}
            <View>
              <Text className="text-sm font-medium text-gray-700">
                When did this occur?
              </Text>
              <View className="mt-1 relative rounded-md shadow-sm">
                <TextInput
                  className="block w-full rounded-md border border-gray-300 shadow-sm text-sm h-12 px-4 bg-gray-100 text-gray-900 pr-10"
                  placeholder="Tap to select date and time"
                />
                <TouchableOpacity
                  // Placeholder for the calendar/clock icon to trigger the native picker
                  className="absolute inset-y-3 right-0 flex items-center pr-3 h-full"
                >
                  <MaterialIcons name="event" size={24} color="#4b5563" />{" "}
                  {/* Example Icon */}
                </TouchableOpacity>
              </View>
            </View>

            {/* Location of the Noise (Readonly Input with Icon and Button) */}
            <View>
              <Text className="text-sm font-medium text-gray-700">
                Location of the Noise
              </Text>
              <View className="mt-1 relative rounded-md shadow-sm">
                <TextInput
                  className="block w-full rounded-md border border-gray-300 text-sm h-12 px-4 bg-gray-100 text-gray-900 pr-10"
                  value="123 Main St, Springfield, USA"
                  editable={false}
                />
                <View className="absolute inset-y-2 right-0 flex items-center pr-3 h-full">
                  <MaterialIcons name="location-on" size={24} color="#6b7280" />{" "}
                  {/* text-gray-500 */}
                </View>
              </View>
              <TouchableOpacity className="mt-2" activeOpacity={0.7}>
                <Text className="text-sm font-medium text-lime-600 hover:text-lime-700">
                  Change Address
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>

        {/* --- Footer (Sticky Button) --- */}
        <View className="sticky bottom-8 bg-white p-4 border-t border-gray-200">
          <TouchableOpacity
            className="w-full h-12 px-5 flex items-center justify-center rounded-md bg-[#11d411] text-white text-base font-bold shadow-sm active:bg-lime-500"
            activeOpacity={0.8}
          >
            <Text className="text-white text-base font-bold text-center">
              Submit Complaint
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default NoisePollutionReportScreen;
