import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  Platform,
} from "react-native";

// Import the Picker component for dropdowns
import { Picker } from "@react-native-picker/picker";
import { MaterialIcons } from "@expo/vector-icons";

// --- Reusable Components ---

// **Dropdown Component using @react-native-picker/picker**
interface DropdownProps {
  label: string;
  selectedValue: string;
  onValueChange: (itemValue: string) => void;
  options: { label: string; value: string }[];
}

const RNPickerDropdown: React.FC<DropdownProps> = ({
  label,
  selectedValue,
  onValueChange,
  options,
}) => (
  <View className="p-4">
    <Text className="block text-gray-700 text-base font-medium mb-1.5">
      {label}
    </Text>

    {/* Wrapper to style the picker's border and background */}
    <View
      // Removed the fixed height from the Picker itself and added `min-h-[48px]` to the wrapper
      className="w-full rounded-lg border border-gray-300 bg-white overflow-hidden min-h-[48px] justify-center"
    >
      <Picker
        selectedValue={selectedValue}
        onValueChange={onValueChange}
        mode="dropdown" // Android specific setting
        // Removed explicit height and itemStyle for better vertical visibility
        style={{ color: "#1f2937" }}
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
const GreenWastePickupScreen: React.FC = () => {
  // --- State for Pickers ---
  const [category, setCategory] = useState("Private");
  const [quantity, setQuantity] = useState("3_bags");

  // Safe padding for notched devices
  const bottomPadding = Platform.OS === "ios" ? 30 : 0;

  return (
    <View className="flex-1 bg-gray-50">
      <View className="relative flex h-full min-h-full flex-col justify-between overflow-x-hidden">
        <View className="flex-grow">
          {/* --- Main Content (Scrollable) --- */}
          <ScrollView className="p-6 flex-col gap-6">
            {/* PHOTO OF WASTE Section */}
            <View>
              <Text className="text-gray-500 text-sm font-semibold mb-2">
                PHOTO OF WASTE
              </Text>
              {/* Use gap-4 for spacing between items */}
              <View className="flex flex-row items-start justify-around gap-12 px-4">
                {/* Add Photo Button (Enforce w-24 to match image size) */}
                <View className="flex flex-col items-center justify-center gap-2 w-24">
                  <TouchableOpacity className="flex flex-col items-center justify-center size-24 rounded-xl border-2 border-dashed border-gray-300 bg-white text-gray-400 active:bg-gray-100 active:border-gray-400">
                    <MaterialIcons
                      name="add-a-photo"
                      size={40}
                      color="#9ca3af"
                    />
                  </TouchableOpacity>
                  {/* Text label is now contained within the w-24 width */}
                  <Text className="text-gray-600 text-xs text-center font-medium">
                    Add Photo of Green Waste
                  </Text>
                </View>

                {/* Thumbnail Image (Size is naturally w-24) */}
                <View className="flex-shrink-0">
                  <Image
                    source={{
                      uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuBCbToDcEx9RfaoHDjnPSueJ4XoZJx57somB_jfKwUmVMK8xwwgxkEXEH6vtaU_x0yKAa8JM-hzmczFzQGLJmBuxybPeVwjmthxeDekpcfvMpgZKo1g37aV8Rj6KkivVKQXbbpKyv84qsZTTKIEYHJ8reKZhiNFa7SfhqTwqatH9zF-oD6Vi6dEJkLDzYRUPZB0R_Sw_j1DuqbuddV8tbxMBo_UUsYo00Q6BpRv4T6mQvSWyXtyItgL9HuhOWg2oHJo4GaxG_h2Ww",
                    }}
                    // size-24 means w-24 h-24
                    className="size-24 rounded-xl object-cover"
                    resizeMode="cover"
                  />
                </View>
              </View>
            </View>
            {/* REQUEST DETAILS Section */}
            <View className="mt-4">
              <Text className="text-gray-500 text-sm font-semibold mb-2">
                REQUEST DETAILS
              </Text>
              <View className="bg-white rounded-xl border border-gray-200 divide-y divide-gray-200">
                {/* Category of Waste (Dropdown) */}
                <RNPickerDropdown
                  label="Category of Waste"
                  selectedValue={category}
                  onValueChange={(itemValue) => setCategory(itemValue)}
                  options={[
                    { label: "Horticulture", value: "Horticulture" },
                    { label: "Private", value: "Private" },
                  ]}
                />

                {/* Quantity (Dropdown) */}
                <RNPickerDropdown
                  label="Quantity"
                  selectedValue={quantity}
                  onValueChange={(itemValue) => setQuantity(itemValue)}
                  options={[
                    { label: "1 Bag", value: "1_bag" },
                    { label: "2 Bags", value: "2_bags" },
                    { label: "3 Bags", value: "3_bags" },
                    { label: "More than 3 Bags", value: "more_than_3_bags" },
                  ]}
                />

                {/* Title (Readonly Input) */}
                <View className="p-4">
                  <Text className="block text-gray-700 text-base font-medium mb-1.5">
                    Title
                  </Text>
                  <TextInput
                    className="w-full rounded-lg border border-gray-300 bg-gray-100 p-3 text-gray-500 text-base"
                    value="Green Waste Pickup Request"
                    editable={false}
                  />
                </View>

                {/* Report Description (Textarea) */}
                <View className="p-4">
                  <Text className="block text-gray-700 text-base font-medium mb-1.5">
                    Report Description
                  </Text>
                  <TextInput
                    className="w-full rounded-lg border border-gray-300 bg-white p-3 text-gray-900 text-base focus:border-green-500 focus:ring-green-500"
                    placeholder="e.g., Two large bags of garden trimmings and leaves."
                    multiline={true}
                    numberOfLines={4}
                    style={{ height: 100, textAlignVertical: "top" }}
                  />
                </View>

                {/* Pickup Address (Readonly Input with button) */}
                <View className="p-4">
                  <Text className="block text-gray-700 text-base font-medium mb-1.5">
                    Pickup Address
                  </Text>
                  <View className="flex-row items-center gap-3">
                    <TextInput
                      className=" rounded-lg border border-gray-300 bg-gray-100 p-3 text-gray-500 text-base"
                      value="123 Maple Street, Springfield"
                      editable={false}
                    />
                    <TouchableOpacity className="text-green-700">
                      <Text className="text-green-600 text-base font-semibold">
                        Change
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>

            {/* Submit Button */}
            {/* Added extra bottom padding in ScrollView to accommodate the fixed footer */}
            <View className="pt-4" style={{ paddingBottom: 100 }}>
              <TouchableOpacity
                className="flex w-full items-center justify-center rounded-xl h-14 px-6 bg-green-600 text-white text-lg font-bold active:bg-green-700 shadow-lg shadow-green-500/30"
                activeOpacity={0.8}
              >
                <Text className="text-white text-lg font-bold truncate">
                  Submit Pickup Request
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </View>
    </View>
  );
};

export default GreenWastePickupScreen;
