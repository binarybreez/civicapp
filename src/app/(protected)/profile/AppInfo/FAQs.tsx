import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";

// --- Constants (Approximating the CSS variable) ---
const PRIMARY_COLOR = "#1173d4";

// --- Accordion Component to replace <details> and <summary> ---
interface FAQItemProps {
  question: string;
  children: React.ReactNode;
  initialOpen?: boolean;
}

const FAQItem: React.FC<FAQItemProps> = ({
  question,
  children,
  initialOpen = false,
}) => {
  const [isOpen, setIsOpen] = useState(initialOpen);

  return (
    <View className="flex flex-col bg-gray-50 rounded-xl px-4 py-2">
      {/* Summary / Header */}
      <TouchableOpacity
        className="flex flex-row cursor-pointer items-center justify-between gap-6 py-2"
        onPress={() => setIsOpen(!isOpen)}
        activeOpacity={0.7}
      >
        <Text className="text-gray-800 text-base font-medium leading-normal">
          {question}
        </Text>
        <View
          // Apply rotation based on state. NativeWind often handles this via conditional classes.
          className={`text-gray-600 transition-transform duration-300 ${isOpen ? "rotate-180" : "rotate-0"}`}
        >
          {/* expand_more icon */}
        </View>
      </TouchableOpacity>

      {/* Content / Details */}
      {isOpen && (
        <View className="py-2 space-y-4 text-gray-600">{children}</View>
      )}
    </View>
  );
};

// --- Main Component ---
const HelpCenter: React.FC = () => {
  return (
    // SafeAreaView helps with notches and system bars
    <View className="flex-1 bg-gray-50">
      <View
        // Equivalent to the main <body> and <div> wrapper
        className="relative flex size-full min-h-screen flex-col justify-between overflow-x-hidden"
        // Style tag is not supported directly; NativeWind handles the classes.
      >
        {/* Top Section (Header, Search, FAQs) - Scrollable Area */}
        <ScrollView className="flex-1">
          <View className="bg-white pb-4">
            {/* Search Input */}
            <View className="px-4 pt-2 pb-4">
              <View className="flex flex-row min-w-40 h-12 w-full items-stretch rounded-xl bg-gray-100">
                {/* Search Icon */}
                <View className="text-gray-400 flex border-none bg-gray-100 items-center justify-center pl-4 rounded-l-xl border-r-0">
                  {/* search icon */}
                </View>
                {/* TextInput */}
                <TextInput
                  className="flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-gray-800 border-none bg-gray-100 h-full placeholder:text-gray-400 px-4 rounded-l-none border-l-0 pl-2 text-base font-normal leading-normal"
                  placeholder="Search for answers"
                  placeholderTextColor="#9ca3af"
                />
              </View>
            </View>

            {/* FAQ Header */}
            <Text className="text-gray-900 text-lg font-bold leading-tight tracking-tight px-4 pb-3 pt-2">
              Frequently Asked Questions
            </Text>

            {/* FAQ List */}
            <View className="flex flex-col px-4 gap-3">
              {/* Reporting Issues FAQ */}
              <FAQItem question="Reporting Issues" initialOpen={true}>
                <View className="border-t border-gray-200 pt-3">
                  <Text className="font-semibold text-gray-700 pb-1">
                    How do I report a new issue?
                  </Text>
                  <Text className="text-sm">
                    To report a new issue, tap the 'Report' button on the home
                    screen, fill in the details, add a photo if possible, and
                    submit.
                  </Text>
                </View>
                <View className="border-t border-gray-200 pt-3">
                  <Text className="font-semibold text-gray-700 pb-1">
                    Can I track the status of my reported issue?
                  </Text>
                  <Text className="text-sm">
                    Yes, you can track the status of all your reported issues
                    under the 'My Reports' section in your profile.
                  </Text>
                </View>
              </FAQItem>

              {/* Account Management FAQ */}
              <FAQItem question="Account Management">
                <View className="border-t border-gray-200 pt-3">
                  <Text className="font-semibold text-gray-700 pb-1">
                    How do I update my personal information?
                  </Text>
                  <Text className="text-sm">
                    You can update your personal information in the 'Edit
                    Profile' section of your user profile.
                  </Text>
                </View>
              </FAQItem>

              {/* Privacy & Security FAQ */}
              <FAQItem question="Privacy & Security">
                <View className="border-t border-gray-200 pt-3">
                  <Text className="font-semibold text-gray-700 pb-1">
                    Is my personal data safe?
                  </Text>
                  <Text className="text-sm">
                    We take your privacy seriously. Please review our Privacy
                    Policy for detailed information on how we protect your data.
                  </Text>
                </View>
              </FAQItem>
            </View>
          </View>
        </ScrollView>
        {/* Bottom Section (Contact Us Button) */}
        <View className="bg-white">
          <View className="flex flex-col items-center p-4 space-y-2 border-t border-gray-100">
            <Text className="text-gray-600 text-sm">
              Can't find the answer you're looking for?
            </Text>
            <TouchableOpacity
              // Using the literal color for --primary-color: #1173d4
              style={{ backgroundColor: PRIMARY_COLOR }}
              className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-12 px-5 w-full text-white text-base font-bold leading-normal tracking-wide shadow-sm active:opacity-90"
              activeOpacity={0.7}
            >
              <Text className="text-white text-base font-bold">Contact Us</Text>
            </TouchableOpacity>
          </View>
          {/* h-5 bg-white equivalent for bottom spacing/padding */}
          <View className="h-5 bg-white" />
        </View>
      </View>
    </View>
  );
};

export default HelpCenter;
