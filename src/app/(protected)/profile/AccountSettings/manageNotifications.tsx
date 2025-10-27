import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Switch,
  Platform,
} from "react-native";
// --- Theme Variable Approximation ---
const PRIMARY_COLOR = "#1173d4";

// --- Custom Toggle Switch Component (Approximation of the HTML checkbox design) ---
interface CustomSwitchProps {
  label: string;
  subLabel: string;
  initialValue: boolean;
}

const CustomSwitch: React.FC<CustomSwitchProps> = ({
  label,
  subLabel,
  initialValue,
}) => {
  const [isEnabled, setIsEnabled] = useState(initialValue);

  return (
    <View style={styles.listItem}>
      <View style={styles.listItemContent}>
        <Text style={styles.listItemTitle}>{label}</Text>
        <Text style={styles.listItemSubtitle}>{subLabel}</Text>
      </View>
      <Switch
        trackColor={{
          false: styles.toggleTrackFalse.backgroundColor,
          true: PRIMARY_COLOR,
        }}
        thumbColor={styles.toggleThumb.backgroundColor}
        onValueChange={() => setIsEnabled((previousState) => !previousState)}
        value={isEnabled}
        style={styles.toggleSwitch}
      />
    </View>
  );
};

// --- Main Component ---
const ManageNotifications: React.FC = () => {
  return (
    <View style={styles.safeArea}>
      <View style={styles.container}>

        {/* --- Main Content (Scrollable) --- */}
        <ScrollView style={styles.mainContent}>
          {/* Report Updates Section */}
          <View style={styles.section}>
            <Text style={styles.sectionHeader}>Report Updates</Text>
            <View style={styles.card}>
              <CustomSwitch
                label="Report Status"
                subLabel="Get notified about the progress of your reported issues."
                initialValue={true}
              />
              {/* Separator for the first item in the group */}
              <View style={styles.separator} />
              <CustomSwitch
                label="Comments & Mentions"
                subLabel="Receive alerts for new comments or when you're mentioned."
                initialValue={true}
              />
            </View>
          </View>

          {/* Community Section */}
          <View style={styles.section}>
            <Text style={styles.sectionHeader}>Community</Text>
            <View style={styles.card}>
              <CustomSwitch
                label="New Nearby Issues"
                subLabel="Get notified when new issues are reported in your area."
                initialValue={false}
              />
            </View>
          </View>

          {/* General Section */}
          <View style={styles.section}>
            <Text style={styles.sectionHeader}>General</Text>
            <View style={styles.card}>
              <CustomSwitch
                label="Announcements"
                subLabel="Stay informed about important news from your city."
                initialValue={true}
              />
            </View>
          </View>
          <View style={{ height: 20 }} />
        </ScrollView>
      </View>
    </View>
  );
};

// --- Navigation Link Component ---
interface NavLinkProps {
  iconName: string;
  label: string;
  active: boolean;
}
// --- Stylesheet (Approximation of Tailwind CSS classes) ---
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f9fafb", // bg-gray-50
  },
  container: {
    flex: 1,
    backgroundColor: "white",
    // Removed the font-family style as it's not a direct style prop in RN
  },
  // --- Header Styles ---
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    padding: 16, // p-4
    paddingBottom: 12, // pb-3
    borderBottomWidth: 1,
    borderBottomColor: "#f3f4f6", // border-gray-100
  },
  headerButton: {
    width: 40, // size-10
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 9999, // rounded-full
    marginRight: 8,
    // Note: hover:bg-gray-100 is handled via TouchableOpacity onPress
  },
  headerTitle: {
    color: "#1f2937", // text-gray-800
    fontSize: 18, // text-lg
    fontWeight: "700", // font-bold
    flex: 1,
    textAlign: "center",
    paddingRight: 40, // pr-10 to offset the back button
  },
  // --- Main Content Styles ---
  mainContent: {
    flex: 1,
    padding: 16, // p-4
    backgroundColor: "#f9fafb", // Body background
  },
  section: {
    marginBottom: 24, // space-y-6 container separation
  },
  sectionHeader: {
    color: "#6b7280", // text-gray-500
    fontSize: 12, // text-sm
    fontWeight: "600", // font-semibold
    textTransform: "uppercase", // uppercase
    letterSpacing: 1.5, // tracking-wider
    paddingHorizontal: 8, // px-2
    marginBottom: 16, // space-y-4 for separation
  },
  card: {
    backgroundColor: "white",
    borderRadius: 12, // rounded-xl
    shadowColor: "#000", // shadow-sm approximation
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1, // for Android
  },
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16, // p-4
    minHeight: 72, // min-h-[72px]
  },
  listItemContent: {
    flex: 1, // To take up available space
    justifyContent: "center",
    paddingRight: 10, // Add some space before the switch
  },
  listItemTitle: {
    color: "#1f2937", // text-gray-800
    fontSize: 16, // text-base
    fontWeight: "500", // font-medium
    lineHeight: 24, // leading-normal
  },
  listItemSubtitle: {
    color: "#6b7280", // text-gray-500
    fontSize: 14, // text-sm
    fontWeight: "400", // font-normal
    lineHeight: 20, // leading-normal
  },
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: "#f3f4f6", // border-gray-100
    marginLeft: 16, // To match the padding of the list item (if needed, adjust based on design)
    // Note: The original only has a border on the first item in the group
  },
  // --- Switch/Toggle Styles (Using RN Switch for simplicity) ---
  toggleTrackFalse: {
    backgroundColor: "#e5e7eb", // bg-gray-200
  },
  toggleThumb: {
    backgroundColor: "white",
  },
  toggleSwitch: {
    // Custom sizing for Switch in RN is often done via scaleTransform
    // This approximates the 51x31 size of the HTML version
    transform: [
      { scaleX: Platform.OS === "ios" ? 0.9 : 1.1 },
      { scaleY: Platform.OS === "ios" ? 0.9 : 1.1 },
    ],
  },
  // --- Bottom Navigation Styles ---
  bottomNav: {
    position: "sticky", // Not directly supported, but bottom: 0 mimics it
    bottom: 0,
    backgroundColor: "white",
    borderTopWidth: 1,
    borderTopColor: "#f3f4f6", // border-gray-100
    shadowColor: "#000", // shadow-t-sm approximation
    shadowOffset: { width: 0, height: -1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2, // for Android
  },
  navContent: {
    flexDirection: "row",
    justifyContent: "space-around", // justify-around
    paddingHorizontal: 8, // px-2
    paddingVertical: 4, // py-1
  },
  navLink: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 4, // gap-1
    paddingVertical: 8, // py-2
  },
  navText: {
    fontSize: 12, // text-xs
    fontWeight: "500", // font-medium (default)
  },
  navTextInactive: {
    color: "#6b7280", // text-gray-500
  },
  navTextActive: {
    color: PRIMARY_COLOR, // text-[var(--primary-color)]
    fontWeight: "700", // font-bold
  },
  safeAreaBottom: {
    // This is for iPhone notch/safe area at the very bottom
    // In React Native, this is usually handled by `SafeAreaView`,
    // but a specific view is sometimes needed for background continuity.
    height: Platform.OS === "ios" ? 20 : 0, // Placeholder
    backgroundColor: "white",
  },
});

export default ManageNotifications;
