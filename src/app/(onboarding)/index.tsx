import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Alert,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import * as Location from "expo-location";
import { router } from "expo-router";
import Entypo from "@expo/vector-icons/Entypo";
import apiClient from "@/src/lib/apiclient";
import DropDownPicker from "react-native-dropdown-picker";
import { useAuth } from "@/src/context/authContext";

export default function Onboarding() {
  const { session, updateUser } = useAuth();
  const [loading, setLoading] = useState(true);
  const [locationLoading, setLocationLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([
    { label: "English (en)", value: "en" },
    { label: "Hindi (hi)", value: "hi" },
    { label: "Punjabi (pa)", value: "pa" },
    { label: "Bengali (bn)", value: "bn" },
    { label: "Tamil (ta)", value: "ta" },
  ]);
  const [form, setForm] = useState({
    full_name: "",
    phone: session?.user.phone,
    language: "en",
    city: "",
    state: "",
  });

  useEffect(() => {
    const fetchLocation = async () => {
      setLocationLoading(true);
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          Alert.alert(
            "Permission denied",
            "Location permission is required to autofill your city and state."
          );
          setLoading(false);
          return;
        }

        const loc = await Location.getCurrentPositionAsync({});
        const [reverse] = await Location.reverseGeocodeAsync({
          latitude: loc.coords.latitude,
          longitude: loc.coords.longitude,
        });

        if (reverse) {
          setForm((prev) => ({
            ...prev,
            city: reverse.city || reverse.subregion || "",
            state: reverse.region || "",
          }));
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLocationLoading(false);
        setLoading(false);
      }
    };
    fetchLocation();
  }, []);

  const handleSubmit = async () => {
    try {
      console.log("Submitting onboarding form:", form);
      const { data, error } = await apiClient("/api/auth/onboarding", {
        method: "POST",
        body: form,
        token: session?.access_token,
      });

      if (error) throw error;
      console.log("onboarding response", data);
      await updateUser({
        full_name: data.full_name,
      }).then(() => {
        router.replace("/(protected)/(tabs)");
      });
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Failed to save profile.");
    }
  };

  if (loading) return <ActivityIndicator style={{ marginTop: 50 }} />;

  return (
    <View className="flex-1 p-5 bg-white">
      <Text className="text-4xl font-extrabold mb-2 mt-5">
        Lets Personalize Your Experience
      </Text>
      <Text className="text-gray-400">
        This helps us connect you with your local community
      </Text>
      <View className="flex-col gap-1 mt-6">
        <Text className="text-[#111418] text-base font-bold leading-normal pb-2">
          Full Name
        </Text>
        <TextInput
          placeholder="Your Name..."
          value={form.full_name}
          defaultValue={session?.user.full_name!}
          onChangeText={(v) => setForm({ ...form, full_name: v })}
          className="border border-gray-400 mb-2 rounded-lg shadow-black"
        />
      </View>
      <View className="flex-col gap-1 mt-4">
        <Text className="text-[#111418] text-base font-bold leading-normal pb-2">
          Phone Number
        </Text>
        <TextInput
          keyboardType="phone-pad"
          editable={false}
          value={form.phone}
          className="border border-gray-400 text-base rounded-lg shadow-black mb-2"
        />
      </View>
      <View className="mt-4 mb-4">
        <Text className="text-[#111418] text-base font-bold pb-2">
          Language
        </Text>

        <DropDownPicker
          open={open}
          value={form.language}
          items={items}
          setOpen={setOpen}
          setValue={(callback) =>
            setForm({ ...form, language: callback(form.language) })
          }
          setItems={setItems}
          placeholder="Select Language"
          className="border border-gray-400 rounded-lg"
          dropDownContainerClassName="border border-gray-400 rounded-lg"
          textStyle={{ color: "#111418", fontSize: 16 }}
          placeholderStyle={{ color: "#9ca3af" }} // gray-400
          listItemLabelStyle={{ color: "#111418" }}
        />
      </View>

      {locationLoading ? (
        <ActivityIndicator />
      ) : (
        <View>
          <View className="flex-row items-center gap-2 ">
            <Entypo name="location" size={18} color="#000000" />
            <Text className="text-[#111418] text-base font-bold leading-normal pb-2 mt-4">
              Location
            </Text>
          </View>
          <View className="rounded-lg border border-gray-400 px-4 py-3 shadow-black">
            <Text className="text-lg">
              {form.city}, {form.state}
            </Text>
          </View>
          <View className="flex-row w-full items-center justify-evenly gap-2 "></View>
        </View>
      )}
      <TouchableOpacity
        className="bg-blue-600 px-4 py-3 mt-28 rounded-xl shadow-blue-700"
        onPress={handleSubmit}
      >
        <Text className="text-white font-bold text-center py-1">Continue</Text>
      </TouchableOpacity>
    </View>
  );
}
