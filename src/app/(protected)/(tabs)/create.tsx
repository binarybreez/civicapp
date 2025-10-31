import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  Alert,
  ActivityIndicator,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import * as Location from "expo-location";
import * as ImagePicker from "expo-image-picker";
import { supabase } from "../../../lib/supabase";
import * as FileSystem from "expo-file-system/legacy";
import { decode as atob } from "base-64";

import { Buffer } from "buffer";

global.Buffer = global.Buffer || Buffer;

// --- CONSTANTS (Equivalent to custom colors/variables) ---
const TEXT_DARK = "#0d141b";
const PRIMARY_BLUE = "#1380ec";
const BG_INPUT = "#e7edf3";
const TEXT_PLACEHOLDER = "#4c739a";
const BG_LIGHT = "#f8fafc"; // Closest to slate-50

// --- CUSTOM COMPONENTS (for Reusability) ---

const CategoryButton = ({ title, subtitle, onPress }) => (
  <TouchableOpacity
    className="flex flex-row items-center justify-between bg-gray-200 rounded-lg min-h-[72px] py-2 px-4 w-full"
    style={{ backgroundColor: BG_INPUT }}
    onPress={onPress}
    activeOpacity={0.8}
  >
    <View className="flex flex-row items-center gap-4">
      <View
        className="flex items-center justify-center rounded-lg shrink-0 size-12"
        style={{ backgroundColor: BG_LIGHT }}
      >
        <MaterialIcons name="list" size={24} style={{ color: TEXT_DARK }} />
      </View>
      <View className="flex flex-col justify-center text-left">
        <Text
          className="text-base font-medium leading-normal"
          style={{ color: TEXT_DARK }}
          numberOfLines={1}
        >
          {title}
        </Text>
        <Text
          className="text-sm font-normal leading-normal"
          style={{ color: TEXT_PLACEHOLDER }}
          numberOfLines={1}
        >
          {subtitle}
        </Text>
      </View>
    </View>
    <MaterialIcons
      name="arrow-forward-ios"
      size={16}
      style={{ color: TEXT_PLACEHOLDER }}
    />
  </TouchableOpacity>
);

// --- MAIN COMPONENT ---
const ReportIssueScreen = () => {
  // 1. State to manage the uploaded image URI
  const router = useRouter();
  const { category, issue } = useLocalSearchParams();
  const [location, setLocation] =
    useState<Location.LocationObjectCoords | null>(null);
  const [address, setAddress] = useState<string>("");
  const [loading, setLoading] = useState(true);

  const handlePress = (action: string) => {
    console.log(`${action} pressed!`);
    router.push("/(protected)/dashScreens/complaints/complaintCategory");
  };

  useEffect(() => {
    (async () => {
      // 1️⃣ Ask for permission
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission denied", "Allow location access to continue.");
        setLoading(false);
        return;
      }

      // 2️⃣ Get current position
      const loc = await Location.getCurrentPositionAsync({});
      setLocation(loc.coords);

      // 3️⃣ Reverse geocode to get address
      const [addr] = await Location.reverseGeocodeAsync({
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude,
      });

      if (addr) {
        const formatted = `${addr.name}, ${addr.street}, ${addr.city}, ${addr.region}, ${addr.country}`;
        setAddress(formatted);
      }

      setLoading(false);
    })();
  }, []);

  if (loading) {
    return (
      <View>
        <ActivityIndicator size="large" />
        <Text>Fetching your location...</Text>
      </View>
    );
  }

  if (!location) {
    return (
      <View>
        <Text>Unable to get location</Text>
      </View>
    );
  }

  const handleSubmit = (action: string) => {
    console.log(`${action} pressed!`);
    router.push("/(protected)/dashScreens/complaints/complaintSuccess");
  };

  const uploadImageToSupabase = async (uri: string) => {
    try {
      const fileName = `photo_${Date.now()}.jpg`;
      const filePath = `upload/${fileName}`;

      // ✅ Read as Base64 (works on Expo 51+ with legacy import)
      const base64 = await FileSystem.readAsStringAsync(uri, {
        encoding: FileSystem.EncodingType.Base64,
      });

      // ✅ Convert Base64 → ArrayBuffer (without Blob)
      const byteCharacters = atob(base64);
      const byteNumbers = new Array(byteCharacters.length)
        .fill(0)
        .map((_, i) => byteCharacters.charCodeAt(i));
      const byteArray = new Uint8Array(byteNumbers);

      // ✅ Upload using Uint8Array directly — Supabase supports this
      const { error } = await supabase.storage
        .from("upload")
        .upload(filePath, byteArray, {
          contentType: "image/jpeg",
          upsert: true,
        });

      if (error) {
        console.error("❌ Supabase upload error:", error);
        return null;
      }

      // ✅ Get public URL
      const { data } = supabase.storage.from("upload").getPublicUrl(filePath);
      console.log("✅ Uploaded successfully:", data.publicUrl);
      return data.publicUrl;
    } catch (err) {
      console.error("❌ Upload to Supabase failed:", err);
      return null;
    }
  };

  // 3. Conditional Image Display/Placeholder Component
  function PhotoSection() {
    const [uploadedImageUri, setUploadedImageUri] = useState<string | null>(
      null
    );
    const [uploading, setUploading] = useState(false);

    const handleImageUpload = async () => {
      try {
        // 1️⃣ Request permissions
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          Alert.alert("Permission Denied", "We need access to your gallery.");
          return;
        }

        // 2️⃣ Launch image picker (new API)
        const result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images, // Correct usage
          quality: 0.7,
          allowsMultipleSelection: false, // Ensure only one is selected
        });

        if (result.canceled) return;

        const selectedUri = result.assets[0].uri;
        console.log("Selected image URI:", selectedUri);

        // 🚀 Start upload process
        setUploading(true);
        // OPTIONAL: setUploadedImageUri(selectedUri); // Remove this to prevent displaying local image before upload starts

        // 3️⃣ Upload to Supabase
        const uploadedUrl = await uploadImageToSupabase(selectedUri);

        if (uploadedUrl) {
          // Success: Set state to the final public URL
          setUploadedImageUri(uploadedUrl);
        } else {
          // 🛑 Critical Fix: Clear state on failure
          setUploadedImageUri(null);
          Alert.alert("Upload Failed", "Something went wrong while uploading.");
        }
      } catch (error) {
        console.error("Image upload error:", error);
        Alert.alert(
          "Error",
          "Something went wrong while selecting/uploading the image."
        );
        // Ensure state is clean on a major error
        setUploadedImageUri(null);
      } finally {
        // Always stop the loading indicator
        setUploading(false);
      }
    };

    // The simplified uploadImageToSupabase is now defined outside for clarity,
    // or should be imported if it's in a service file.
    // The original one had an issue with FileSystem.File.fromUriAsync,
    // the rewritten version uses a more standard Blob creation method for Expo.

    // 🧩 UI
    // Note: Assuming BORDER_GRAY, BG_INPUT, TEXT_PLACEHOLDER are defined or imported
    const BORDER_GRAY = "#D1D5DB";
    const BG_INPUT = "#F3F4F6";
    const TEXT_PLACEHOLDER = "#6B7280";

    if (uploading) {
      return (
        <View
          className="w-full rounded-lg border-2 border-dashed items-center justify-center"
          style={{
            aspectRatio: 3 / 2,
            borderColor: BORDER_GRAY,
            backgroundColor: BG_INPUT,
          }}
        >
          <ActivityIndicator size="large" color={TEXT_PLACEHOLDER} />
          <Text className="mt-2 text-sm text-gray-500">Uploading...</Text>
        </View>
      );
    }

    if (uploadedImageUri) {
      return (
        <View
          className="w-full gap-1 overflow-hidden rounded-lg flex flex-row"
          style={{ aspectRatio: 3 / 2 }}
        >
          <Image
            source={{ uri: uploadedImageUri }}
            className="flex-1 rounded-lg"
            resizeMode="cover"
          />
          {/* You should add a button here to allow the user to change/remove the image */}
        </View>
      );
    }

    return (
      <View
        className="w-full rounded-lg border-2 border-dashed flex items-center justify-center"
        style={{
          aspectRatio: 3 / 2,
          borderColor: BORDER_GRAY,
          backgroundColor: BG_INPUT,
        }}
      >
        <TouchableOpacity
          onPress={handleImageUpload}
          activeOpacity={0.7}
          className="p-4 rounded-xl flex items-center justify-center"
        >
          <MaterialIcons
            name="cloud-upload"
            size={40}
            style={{ color: TEXT_PLACEHOLDER }}
          />
          <Text
            className="mt-2 text-base font-medium"
            style={{ color: TEXT_PLACEHOLDER }}
          >
            Upload Image
          </Text>
          <Text className="text-sm" style={{ color: TEXT_PLACEHOLDER }}>
            (Tap to select a photo)
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: BG_LIGHT }}>
      <View
        style={{ flex: 1, backgroundColor: BG_LIGHT }}
        className="flex flex-col justify-between"
      >
        {/* Scrollable Content Area */}
        <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
          {/* --- Add Photo Section (Updated) --- */}
          <Text
            className="text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4"
            style={{ color: TEXT_DARK }}
          >
            Add Photo
          </Text>
          <View className="flex w-full px-4 pt-1">
            <PhotoSection />
          </View>

          {/* --- Category & Description Section --- */}
          <View className="px-4 pb-4 pt-4">
            <Text
              className="text-lg font-bold leading-tight tracking-[-0.015em] pb-2"
              style={{ color: TEXT_DARK }}
            >
              Category & Description
            </Text>
            <View className="flex flex-col gap-3">
              <CategoryButton
                title={category || "Pothole on Main Street"}
                subtitle={issue || "Roads & Potholes"}
                onPress={() => handlePress("Select Category")}
              />

              {/* Description Textarea (TextInput) */}
              <View className="flex flex-col flex-1">
                <TextInput
                  multiline={true}
                  placeholder="Describe the issue in detail"
                  placeholderTextColor={TEXT_PLACEHOLDER}
                  style={{
                    color: TEXT_DARK,
                    backgroundColor: BG_INPUT,
                    minHeight: 80,
                  }}
                  className="flex w-full flex-1 rounded-lg p-4 text-base font-normal leading-normal"
                />
              </View>
            </View>
          </View>

          {/* --- Location Section --- */}
          <Text
            className="text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4"
            style={{ color: TEXT_DARK }}
          >
            Location
          </Text>
          <View className="bg-white p-5 rounded-2xl shadow-lg">
            <Text className="text-gray-800 text-lg font-bold">
              📍 Your Current Address
            </Text>
            <Text className="text-gray-600 mt-2 text-sm leading-snug">
              {address || "Fetching your location..."}
            </Text>
          </View>

          <View className="flex px-4 py-3">
            {/* Map Image */}
            <Image
              source={{ uri: "https://picsum.photos/id/401/400/225" }}
              className="w-full rounded-lg"
              style={{ aspectRatio: 16 / 9 }}
              resizeMode="cover"
            />
          </View>

          {/* Footer/Submit Button (Fixed at the bottom) */}
          <View
            className="px-4 py-3 mb-16 mt-3"
            style={{ backgroundColor: BG_LIGHT }}
          >
            <TouchableOpacity
              onPress={() => handleSubmit("Submit Report")}
              activeOpacity={0.8}
              className="flex cursor-pointer items-center justify-center rounded-lg py-3 px-5 flex-1 shadow-md transition-all duration-150"
              style={{ backgroundColor: PRIMARY_BLUE }}
            >
              <Text className="text-white text-base font-bold leading-normal tracking-[0.015em]">
                Submit Report
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default ReportIssueScreen;
