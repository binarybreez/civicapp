import React from "react";
import {
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { IoniconsGlyphs } from '@expo/vector-icons/build/Ionicons';


export default function App() {
  return (
    <View className="relative flex-1 bg-gray-50">
      <View>
        {/* Main Content */}
        <ScrollView className="p-6">
          <View className="flex-col gap-4">
            <ComplaintLink
              icon="add-circle"
              title="Register a New Complaint"
              description="Submit a report for a new civic issue you've noticed."
              path="/(tabs)/create"
            />
            <ComplaintLink
              icon="view-list"
              title="See All Complaints"
              description="Track the status and progress of your reported issues."
              path="/reports/ViewReport"
            />
            <ComplaintLink
              icon="feedback"
              title="Feedback"
              description="Share your thoughts on the app or a resolved issue."
              path="/reports/Feedback"
            />
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

// Reusable components for clarity
const ComplaintLink = ({
  icon,
  title,
  description,
  path,
}: {
  title: string;
  icon:IoniconsGlyphs;
  description: string;
  path: string;
}) => {
  const router = useRouter();
  return (
    <TouchableOpacity
    onPress={()=>router.push(`/(protected)${path}`)}
      className="flex-row items-center gap-4 bg-white p-5 rounded-xl transition-all duration-300 "
      style={localStyles.shadow}
    >
      {/* Icon on the left */}
      <View className="text-[#1173d4] flex items-center justify-center rounded-xl bg-[#f0f8ff] shrink-0 size-14">
        <MaterialIcons name={icon} size={30} color="#1173d4" />
      </View>

      {/* Text content (title and description) - takes available space and allows text wrapping */}
      <View className="flex-1 flex-col justify-center">
        <Text
          className="text-gray-900 text-lg font-semibold"
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {title}
        </Text>
        <Text
          className="text-gray-500 text-sm mt-1"
          numberOfLines={2}
          ellipsizeMode="tail"
        >
          {description}
        </Text>
      </View>

      {/* Chevron icon on the far right */}
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
    shadowOpacity: 0.1,
    shadowRadius: 1.5,
    elevation: 3,
  },
});
