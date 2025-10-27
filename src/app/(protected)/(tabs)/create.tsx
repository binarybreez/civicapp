import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  ScrollView,
  SafeAreaView,
  StyleSheet,
  Platform,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

// --- Constants ---
const PRIMARY_COLOR = "#1173d4";
const TEXT_PRIMARY = "#1f2937"; // gray-800
const TEXT_SECONDARY = "#4b5563"; // gray-600

// --- Custom Components ---

interface LabeledInputProps {
  label: string;
  value?: string;
  placeholder?: string;
  iconName?: keyof typeof MaterialIcons.glyphMap;
  isLocation?: boolean;
  isSelect?: boolean;
  children?: React.ReactNode;
}

const LabeledInput: React.FC<LabeledInputProps> = ({
  label,
  value,
  placeholder,
  iconName,
  isLocation = false,
  isSelect = false,
  children,
}) => {
  return (
    <View>
      <Text className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </Text>
      <View className="relative">
        {iconName && (
          <MaterialIcons
            name={iconName}
            size={24}
            color="#9ca3af" // gray-400
            style={styles.inputIcon}
          />
        )}
        {children || (
          <TextInput
            className={`w-full py-3 text-base border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400 ${
              iconName ? "pl-10 pr-4" : "px-3"
            } ${isLocation ? "pr-10" : ""} ${isSelect ? "pr-10" : ""}`}
            style={styles.textInputBase}
            placeholder={placeholder}
            value={value}
          />
        )}

        {isLocation && (
          <Pressable
            className="absolute right-3 top-1/2 -translate-y-1/2"
            style={{ color: PRIMARY_COLOR }}
          >
            <MaterialIcons name="my-location" size={24} color={PRIMARY_COLOR} />
          </Pressable>
        )}
        {isSelect && (
          // Custom arrow for select appearance
          <MaterialIcons
            name="keyboard-arrow-down"
            size={24}
            color="#9ca3af"
            style={styles.selectArrow}
          />
        )}
      </View>
    </View>
  );
};

// --- Main Screen Component ---

export default function ReportIssueScreen() {
  const [category, setCategory] = useState("Illegal Dumping");
  const [quantity, setQuantity] = useState("1-5 bags");

  return (
    <View className="flex-1 bg-gray-50">
      <View className="flex-grow">
        {/* Main Content (Scrollable Area) */}
        <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
          <View className="p-6 flex flex-col gap-8">
            <View className="gap-6">
              {/* Photo Upload */}
              <View>
                <Text className="block text-sm font-medium text-gray-700 mb-2">
                  Photo
                </Text>
                <View className="flex flex-row items-center gap-8">
                  <View className="w-24 h-24 bg-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
                    <MaterialIcons
                      name="add-a-photo"
                      size={40}
                      color="#9ca3af"
                    />
                  </View>
                  <Pressable
                    className="flex flex-row items-center space-x-2"
                    style={{ color: PRIMARY_COLOR }}
                  >
                    <MaterialIcons
                      name="photo-camera"
                      size={24}
                      color={PRIMARY_COLOR}
                    />
                    <Text
                      className="font-semibold"
                      style={{ color: PRIMARY_COLOR }}
                    >
                      Add a photo
                    </Text>
                  </Pressable>
                </View>
                <Text className="text-xs text-gray-500 mt-2">
                  A clear photo helps us address the issue faster.
                </Text>
              </View>

              {/* Location Input */}
              <LabeledInput
                label="Location"
                value="123 Maple Street, Springfield"
                iconName="location-on"
                isLocation={true}
              />
              <Text className="text-xs text-gray-500 mt-2">
                Drag the pin on the map to adjust the location if needed.
              </Text>

              {/* Category Select (Simulated with TextInput for consistent styling) */}
              <LabeledInput
                label="Category"
                iconName="category"
                isSelect={true}
              >
                <TextInput
                  className="w-full pl-10 pr-10 py-3 text-base border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400"
                  style={styles.textInputBase}
                  value={category}
                  onFocus={() => {
                    /* Open custom modal/picker */
                  }}
                  editable={false} // Make it uneditable to simulate select
                />
              </LabeledInput>

              {/* Quantity Select (Simulated) */}
              <LabeledInput
                label="Quantity (Optional)"
                iconName="production-quantity-limits"
                isSelect={true}
              >
                <TextInput
                  className="w-full pl-10 pr-10 py-3 text-base border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400"
                  style={styles.textInputBase}
                  value={quantity}
                  onFocus={() => {
                    /* Open custom modal/picker */
                  }}
                  editable={false} // Make it uneditable to simulate select
                />
              </LabeledInput>

              {/* Additional Details */}
              <View>
                <Text className="block text-sm font-medium text-gray-700 mb-2">
                  Additional Details
                </Text>
                <View className="relative">
                  <TextInput
                    className="w-full p-3 text-base border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400"
                    style={[
                      styles.textInputBase,
                      { height: 100, textAlignVertical: "top" },
                    ]}
                    placeholder="Provide any other relevant information..."
                    multiline={true}
                    numberOfLines={4}
                  />
                  <Pressable
                    className="absolute bottom-3 right-3"
                    style={{ color: PRIMARY_COLOR }}
                  >
                    <MaterialIcons name="mic" size={24} color={PRIMARY_COLOR} />
                  </Pressable>
                </View>
                <Text className="text-xs text-gray-500 mt-2">
                  Voice note can be used to add more details quickly.
                </Text>
              </View>
            </View>
          </View>
          <View className="bg-white shadow-md p-4 z-10 mb-[50px]">
        <Pressable
          className="w-full text-white font-bold py-4 px-4 rounded-xl shadow-lg transition-colors duration-300"
          style={{ backgroundColor: PRIMARY_COLOR }}
          onPress={() => alert("Report Submitted!")}
        >
          <Text className="text-white font-bold text-center">
            Submit Report
          </Text>
        </Pressable>
        {/* Placeholder for safe-area-bottom */}
        <View
          style={{
            height: Platform.OS === "ios" ? 0 : 0,
            backgroundColor: "white",
          }}
        />
      </View>
        </ScrollView>
      </View>

      {/* Footer (Sticky bottom-0 effect handled by being outside ScrollView) */}
      
    </View>
  );
}

// --- Stylesheet for tricky inline styles and overrides ---
const styles = StyleSheet.create({
  textInputBase: {
    borderWidth: 1,
    paddingHorizontal: 12,
    // Add default focus colors for Android/iOS if needed, NativeWind handles the RN focus styles
  },
  inputIcon: {
    position: "absolute",
    left: 12,
    top: "50%",
    transform: [{ translateY: -12 }], // Center the icon vertically
    zIndex: 1,
  },
  selectArrow: {
    position: "absolute",
    right: 12,
    top: "50%",
    transform: [{ translateY: -12 }],
    zIndex: 1,
  },
});
