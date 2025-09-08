import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";

export default function LoginScreen() {
  const router = useRouter()
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  const handleOtpChange = (text: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);
  };

  return (
    <SafeAreaView className="flex-1 bg-white justify-center items-center px-4">
      <View className="w-full max-w-sm bg-white p-8 rounded-2xl shadow-sm">
        {/* Logo / Icon */}
        <View className="flex justify-center items-center mb-6">
          <View className="bg-[#1173d4] p-3 rounded-full">
            <FontAwesome name="lock" size={40} color="white" />
          </View>
        </View>

        {/* Title */}
        <Text className="text-2xl font-bold text-center text-gray-800 mb-2">
          Log In to Your Account
        </Text>
        <Text className="text-gray-500 text-center text-sm mb-8">
          We&apos;ll send a one-time password to your phone
        </Text>

        {/* Phone Input */}
        <View className="mb-4 flex-row items-center border border-gray-300 rounded-lg bg-white px-2">
          <FontAwesome name="phone-square" size={28} color="#9ca3af" />
          <TextInput
            placeholder="Enter Your Phone Number"
            keyboardType="phone-pad"
            value={phone}
            onChangeText={setPhone}
            className="w-full pl-6 pr-4 py-3 focus:ring-2 focus:ring-[#1173d4]"
          />
        </View>

        {/* Send OTP Button */}
        <TouchableOpacity className="w-full bg-[#1173d4] py-3 px-4 rounded-lg shadow-md mb-6 active:bg-[#0f63b6]">
          <Text className="text-white text-center font-bold">Send OTP</Text>
        </TouchableOpacity>

        {/* OTP Input */}
        <View className="flex-col gap-2">
          <Text className="text-gray-600 font-medium text-center">
            Enter OTP
          </Text>
          <View className="flex-row justify-center">
            {otp.map((digit, index) => (
              <TextInput
                key={index}
                style={styles.otpInput}
                maxLength={1}
                keyboardType="numeric"
                value={digit}
                onChangeText={(text) => handleOtpChange(text, index)}
              />
            ))}
          </View>

          {/* Resend */}
          <Text className="text-center text-sm">
            <Text className="text-[#1173d4] underline">Resend OTP</Text>
          </Text>
          <TouchableOpacity onPress={() => {router.back()}} className="mx-auto flex-row items-center gap-[1px] justify-center bg-[#1173d4] w-1/2 p-2 rounded-md">
            <Ionicons name="chevron-back" size={28} color="white" />
            <Text className="text-white font-semibold">Back</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

// Tailwind doesn't cover all styles; use StyleSheet when needed
const styles = StyleSheet.create({
  otpInput: {
    width: 48,
    height: 48,
    textAlign: "center",
    fontSize: 20,
    borderColor: "#dee2e6",
    borderWidth: 1,
    borderRadius: 8,
    marginHorizontal: 4,
    color: "#000",
  },
});
