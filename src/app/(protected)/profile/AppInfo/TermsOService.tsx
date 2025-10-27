import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Platform,
} from "react-native";

// Import necessary icons from Expo Vector Icons
import { Ionicons } from "@expo/vector-icons";

// --- Custom List Item Component for the Ordered List ---
interface ListItemProps {
  number: number;
  title: string;
  children: React.ReactNode;
}

const ListItem: React.FC<ListItemProps> = ({ number, title, children }) => (
  <View className="flex flex-row space-x-2 pb-4">
    {/* List Number (Approximation of <ol> list-style-type: decimal) */}
    <Text className="text-[#111418] font-bold mt-1">{`${number}.`}</Text>
    <View className="flex-1">
      {/* List Content */}
      <Text className="text-[#111418] text-base leading-normal">
        {/* Bold text for the title (<strong>) */}
        <Text className="font-semibold">{title}:</Text> {children}
      </Text>
    </View>
  </View>
);

// --- Main Component ---
const TermsOfServiceScreen: React.FC = () => {
  return (
    <View className="flex-1 bg-white">
      <View
        // relative flex size-full min-h-screen flex-col
        className="relative flex h-full min-h-full flex-col"
        // Font family style is removed as it requires explicit font loading in RN
      >
        {/* --- Main Content (Scrollable) --- */}
        <ScrollView
          // flex-1 overflow-y-auto px-6 pb-12 pt-4
          className="flex-1 px-6 pb-12 pt-4"
        >
          <Text className="mb-6 text-center text-sm text-[#617589]">
            Last updated: October 26, 2024
          </Text>

          {/* Prose Content Area */}
          <View
            // prose max-w-none text-[#111418]
            className="max-w-none text-[#111418] space-y-4" // Use space-y-4 for paragraphs/prose
          >
            <Text className="leading-relaxed">
              Welcome to our civic issue reporting and resolution system. By
              using our services, you agree to the following terms and
              conditions. Please read them carefully.
            </Text>

            {/* Ordered List Section (Simulated with Custom Component) */}
            <View className="mt-4">
              <ListItem number={1} title="Acceptance of Terms">
                By accessing or using our platform, you acknowledge that you
                have read, understood, and agree to be bound by these terms. If
                you do not agree, please do not use our services.
              </ListItem>
              <ListItem number={2} title="Description of Service">
                Our platform allows citizens to report civic issues and track
                their resolution by local government. We provide a platform for
                communication and transparency between citizens and government
                entities.
              </ListItem>
              <ListItem number={3} title="User Responsibilities">
                You are responsible for the accuracy and validity of the
                information you submit. You agree not to use the platform for
                illegal activities or to harass, defame, or abuse others.
              </ListItem>
              <ListItem number={4} title="Privacy Policy">
                Your privacy is important to us. Please review our Privacy
                Policy to understand how we collect, use, and protect your
                personal information.
              </ListItem>
              <ListItem number={5} title="Intellectual Property">
                All content and materials on our platform, including logos,
                text, and images, are protected by intellectual property laws.
                You may not use, reproduce, or distribute any content without
                our express permission.
              </ListItem>
              <ListItem number={6} title="Limitation of Liability">
                We are not liable for any damages or losses resulting from your
                use of our platform. We strive to provide accurate and
                up-to-date information, but we cannot guarantee the completeness
                or accuracy of all content.
              </ListItem>
              <ListItem number={7} title="Modifications to Terms">
                We reserve the right to modify these terms at any time. We will
                notify users of any significant changes. Your continued use of
                the platform after such modifications constitutes your
                acceptance of the revised terms.
              </ListItem>
              <ListItem number={8} title="Termination">
                We may terminate or suspend your access to the platform at any
                time, without notice, for any reason, including violation of
                these terms.
              </ListItem>
              <ListItem number={9} title="Governing Law">
                These terms are governed by the laws of the jurisdiction in
                which our company is registered. Any disputes arising from these
                terms will be resolved in the courts of that jurisdiction.
              </ListItem>
              <ListItem number={10} title="Contact Information">
                If you have any questions or concerns about these terms, please
                contact us at support@civicconnect.com.
              </ListItem>
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default TermsOfServiceScreen;
