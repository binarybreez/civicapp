import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  LayoutAnimation,
  Platform,
  UIManager,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

// Enable LayoutAnimation for Android
if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

// --- CONSTANTS (Mapping from HTML Tailwind Config) ---
const BG_LIGHT = "#f6f7f8";
// BG_DARK constant removed

// --- ACCORDION COMPONENT ---

interface CategoryItem {
  category: string;
  id: string;
  text: string;
}

interface CategoryAccordionProps {
  title: string;
  iconName: keyof typeof MaterialIcons.glyphMap;
  iconBgColor: string; // e.g., 'bg-yellow-100'
  iconTextColor: string; // e.g., 'text-yellow-600'
  items: CategoryItem[];
  onSelect: (item: CategoryItem) => void;
}

const CategoryAccordion: React.FC<CategoryAccordionProps> = ({
  title,
  iconName,
  iconBgColor,
  iconTextColor,
  items,
  onSelect,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleAccordion = () => {
    // Use LayoutAnimation for smooth expansion/collapse
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsExpanded(!isExpanded);
  };

  return (
    // Updated styling for a cleaner look: added shadow and set background to white, removed dark classes.
    <View className="flex flex-col rounded-xl border border-gray-200 bg-white shadow-sm">
      {/* Summary/Header Section */}
      <TouchableOpacity
        onPress={toggleAccordion}
        activeOpacity={0.8}
        className="flex-row cursor-pointer items-center justify-between gap-4 p-4"
      >
        <View className="flex-row items-center gap-4">
          {/* Icon Circle */}
          <View
            className={`flex h-10 w-10 items-center justify-center rounded-full ${iconBgColor} ${iconTextColor}`}
          >
            <MaterialIcons name={iconName} size={24} />
          </View>
          {/* Text */}
          <Text className="text-base font-medium text-gray-800">{title}</Text>
        </View>
        <MaterialIcons
          name="expand-more"
          size={24}
          className="text-gray-600"
          style={{ transform: [{ rotate: isExpanded ? "180deg" : "0deg" }] }}
        />
        {/* Expansion Icon (Rotates when open) */}
      </TouchableOpacity>

      {/* Content/Details Section - List items updated to be explicitly left-aligned and full width */}
      {isExpanded && (
        <View className="px-2 pb-2">
          <View className="flex flex-col gap-1">
            {items.map((item) => (
              <TouchableOpacity
                key={item.id}
                onPress={() => onSelect(item)}
                activeOpacity={0.7}
                // Ensure full width and a clean background interaction
                className="p-3 rounded-lg bg-gray-50 active:bg-gray-100 w-full"
              >
                <Text className="text-gray-700 text-left">{item.text}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}
    </View>
  );
};

// --- MAIN COMPONENT ---
const SelectCategoryScreen = () => {
  const [searchText, setSearchText] = useState("");
  const router = useRouter();

  // Simulating Category Data (Mapping Material Symbols to MaterialIcons names)
  // Removed dark: styles from category data properties
  const categories = [
    {
      title: "Light Department",
      iconName: "lightbulb",
      iconBg: "bg-yellow-100",
      iconText: "text-yellow-600",
      items: [
        { id: "l1", text: "Street light not working" },
        { id: "l2", text: "Street light ON during day time" },
        { id: "l3", text: "New street light required" },
        { id: "l4", text: "Faulty electricity meter" },
      ],
    },
    {
      title: "Health Department",
      iconName: "medical-services",
      iconBg: "bg-red-100",
      iconText: "text-red-600",
      items: [
        { id: "h1", text: "Mosquito breeding in stagnant water" },
        { id: "h2", text: "Fumigation/Spraying required" },
        { id: "h3", text: "Unhygienic public toilets" },
        { id: "h4", text: "Dead animal removal" },
      ],
    },
    {
      title: "Drainage Department",
      iconName: "waves",
      iconBg: "bg-gray-100",
      iconText: "text-gray-600",
      items: [
        { id: "d1", text: "Clogged or blocked drain" },
        { id: "d2", text: "Broken or missing drain cover" },
        { id: "d3", text: "Overflowing sewage" },
        { id: "d4", text: "Drain needs cleaning" },
      ],
    },
    {
      title: "Garden Department",
      iconName: "park",
      iconBg: "bg-green-100",
      iconText: "text-green-600",
      items: [
        { id: "g1", text: "Trimming of trees required" },
        { id: "g2", text: "Removal of fallen trees/branches" },
        { id: "g3", text: "Maintenance of public park" },
        { id: "g4", text: "Cutting of grass" },
      ],
    },
    {
      title: "Water Department",
      iconName: "water-drop",
      iconBg: "bg-blue-100",
      iconText: "text-blue-600",
      items: [
        { id: "w1", text: "No water supply" },
        { id: "w2", text: "Leakage in pipeline" },
        { id: "w3", text: "Contaminated water supply" },
        { id: "w4", text: "Request for new water connection" },
      ],
    },
    {
      title: "Consumer Department",
      iconName: "shopping-cart",
      iconBg: "bg-purple-100",
      iconText: "text-purple-600",
      items: [
        { id: "c1", text: "Overcharging by vendor (MRP)" },
        { id: "c2", text: "Sale of expired goods" },
        { id: "c3", text: "Unauthorised hawkers/vendors" },
        { id: "c4", text: "Incorrect weighing/measurement" },
      ],
    },
    {
      title: "Sanitation Department",
      iconName: "cleaning-services",
      iconBg: "bg-teal-100",
      iconText: "text-teal-600",
      items: [
        { id: "s1", text: "Garbage not collected" },
        { id: "s2", text: "Improper disposal of waste" },
        { id: "s3", text: "Burning of garbage" },
        { id: "s4", text: "Sweeping not done" },
      ],
    },
    {
      title: "Public Works Department (PWD)",
      iconName: "construction",
      iconBg: "bg-orange-100",
      iconText: "text-orange-600",
      items: [
        { id: "p1", text: "Potholes on road" },
        { id: "p2", text: "Repair of footpath required" },
        { id: "p3", text: "Waterlogging on road" },
        { id: "p4", text: "Illegal speed-breaker" },
      ],
    },
    {
      title: "Spitting Related Complaints",
      iconName: "do-not-disturb-on",
      iconBg: "bg-pink-100",
      iconText: "text-pink-600",
      items: [
        { id: "sp1", text: "Spitting in public place" },
        { id: "sp2", text: "Paancorner/Stall owner spitting" },
        { id: "sp3", text: "Need for 'No Spitting' sign" },
        { id: "sp4", text: "Cleaning of paan/gutka stains" },
      ],
    },
  ];

  const filteredCategories = categories.filter(
    (category) =>
      category.title.toLowerCase().includes(searchText.toLowerCase()) ||
      category.items.some((item) =>
        item.text.toLowerCase().includes(searchText.toLowerCase())
      )
  );

  const handleCategorySelect = (item: CategoryItem) => {
    // In a real app, this would navigate to the report form with the selected category/issue pre-filled.
    console.log(`Selected Complaint: ${item.category} - ${item.text}`);
    router.push({
      pathname: "/(protected)/(tabs)/create",
      params: { category: item.category, issue: item.text },
    });
  };

  return (
    <View className="flex-1" style={{ backgroundColor: BG_LIGHT }}>
      <View
        className="relative flex h-full w-full flex-col"
        style={{ fontFamily: "Public Sans", backgroundColor: BG_LIGHT }}
      >
        {/* Main Content Area (Scrollable) */}
        <ScrollView className="flex-1">
          {/* Search Input */}
          <View className="px-4 py-3">
            <View className="flex flex-row items-stretch rounded-xl h-12 w-full bg-gray-100">
              {/* Search Icon */}
              <View className="flex border-none items-center justify-center pl-4 rounded-l-xl border-r-0">
                <MaterialIcons
                  name="search"
                  size={24}
                  className="text-gray-500"
                />
              </View>
              {/* Text Input */}
              <TextInput
                className="flex w-full min-w-0 flex-1 rounded-xl border-none bg-transparent h-full px-4 rounded-l-none pl-2 text-base font-normal leading-normal text-gray-900"
                placeholder="Search for a complaint"
                placeholderTextColor="#9ca3af" // gray-400
                value={searchText}
                onChangeText={setSearchText}
              />
            </View>
          </View>

          {/* Category List */}
          <View className="flex flex-col p-4 gap-3">
            {filteredCategories.map((category) => (
              <CategoryAccordion
                key={category.title}
                title={category.title}
                iconName={
                  category.iconName as keyof typeof MaterialIcons.glyphMap
                }
                iconBgColor={category.iconBg}
                iconTextColor={category.iconText}
                items={category.items.map((item) => ({
                  ...item,
                  category: category.title,
                }))}
                onSelect={handleCategorySelect}
              />
            ))}
          </View>
          <View className="h-5" />
        </ScrollView>
      </View>
    </View>
  );
};

export default SelectCategoryScreen;
