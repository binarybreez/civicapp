import { Link, useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Pressable,
  NativeSyntheticEvent,
  TextInputKeyPressEventData,
  ActivityIndicator,
  ScrollView,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Svg, { Path } from "react-native-svg";
import apiClient from "@/src/lib/apiclient";
import { useAuth } from "@/src/context/authContext";

export default function LoginScreen() {
  const [step, setStep] = useState(1);
  const [code, setCode] = useState(Array(6).fill(""));
  const [loading, setLoading] = useState(false);
  const [phone, setPhone] = useState("");
  const [timer, setTimer] = useState(60);
  const { login } = useAuth();
  const router = useRouter();
  const inputsRef = useRef<Array<TextInput | null>>([]);

  const handleOtpChange = (index: number, value: string) => {
    const newOtp = [...code];
    newOtp[index] = value.slice(0, 1);
    setCode(newOtp);

    if (value && index < code.length - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (
    e: NativeSyntheticEvent<TextInputKeyPressEventData>,
    index: number
  ) => {
    if (e.nativeEvent.key === "Backspace" && !code[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  useEffect(() => {
    if (timer === 0) return;
    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  const handleGetOtp = async () => {
    try {
      setLoading(true);
      const response = await apiClient("/api/auth/send-otp", {
        method: "POST",
        body: {
          phone: `+91${phone}`,
        },
      });
      setStep(2);
      setTimer(60);
      console.log(response);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    const otpString = code.join(""); // "123456"
    console.log(otpString);

    if (otpString.length < 6) {
      Alert.alert("Incomplete OTP");
      return;
    }
    try {
      setLoading(true);
      const response = await apiClient("/api/auth/verify-otp", {
        method: "POST",
        body: {
          phone,
          token: otpString,
          new: false,
        },
      });
      console.log(response.data.data)
      if (response.data?.data.session) {
        console.log("Got session signin:", response.data.data.session);
        await login(response.data.data.session); // saves in context + SecureStore
        router.replace("/(protected)/(tabs)");
      } else {
        console.log("no session in response");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const isOtpComplete = code.every((digit) => digit !== "");

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView>
        <View className="flex-1 justify-between px-6 py-12 bg-gradient-to-b from-gray-100 to-gray-200">
          <View className="flex-1 justify-center">
            <View className="items-center mb-10">
              <View className="bg-white p-3 rounded-full shadow-sm mb-4">
                <View className="w-8 h-8">
                  <Svg
                    width="100%"
                    height="100%"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#1173d4"
                    strokeWidth={1.5}
                  >
                    <Path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                    />
                  </Svg>
                </View>
              </View>
              <Text className="text-3xl font-bold text-gray-900">
                Hello there!
              </Text>
              <Text className="mt-2 text-gray-600">Let&apos;s get you in.</Text>
            </View>

            {step === 1 ? (
              <View className="flex-col gap-6">
                <View>
                  <Text className="text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </Text>
                  <View className="bg-white flex flex-row rounded-lg shadow-sm overflow-hidden">
                    <View className="bg-white pl-3 pr-2 justify-center items-center border border-gray-300 rounded-l-lg">
                      <Text className="text-base text-gray-500">🇮🇳 +91</Text>
                    </View>
                    <TextInput
                      className="flex-1 h-14 px-4 border border-l-0 border-gray-300 rounded-r-lg text-base"
                      placeholder="Phone Number"
                      keyboardType="phone-pad"
                      value={phone}
                      onChangeText={setPhone}
                    />
                  </View>
                </View>
                <TouchableOpacity
                  onPress={handleGetOtp}
                  className="h-14 w-full bg-[#1173d4] flex-row gap-2 rounded-xl items-center justify-center shadow-sm"
                >
                  {loading && <ActivityIndicator size={24} color="#ffffff" />}
                  <Text className="text-white font-bold text-base">
                    Send Code
                  </Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View className="flex-col gap-6">
                <View className="items-center">
                  <Text className="text-gray-700 text-center">
                    Enter the 6-digit code we sent to your phone.
                  </Text>
                </View>
                <View className="flex-row justify-center gap-2">
                  {code.map((digit, index) => (
                    <TextInput
                      key={index}
                      maxLength={1}
                      className="w-12 h-14 text-center text-2xl font-semibold border border-gray-300 rounded-lg"
                      keyboardType="number-pad"
                      onChangeText={(text) => handleOtpChange(index, text)}
                      onKeyPress={(e) => handleKeyPress(e, index)}
                      ref={(ref) => (inputsRef.current[index] = ref)}
                      value={digit}
                    />
                  ))}
                </View>
                <Text
                  className={`text-center text-sm ${timer > 0 ? "text-gray-500" : "text-[#1173d4] font-semibold"}`}
                >
                  Resend code in{" "}
                  <Text className="font-medium text-gray-700">00:{timer}</Text>
                </Text>
                <TouchableOpacity
                  className={`h-14 w-full ${isOtpComplete ? "bg-[#1173d4]" : "bg-gray-400"} rounded-xl flex-row gap-2 items-center justify-center shadow-sm`}
                  onPress={handleVerifyOtp}
                  disabled={!isOtpComplete || loading}
                >
                  {loading && <ActivityIndicator size={24} color="#ffffff" />}
                  <Text className="text-white font-bold text-base">Verify</Text>
                </TouchableOpacity>
                {step === 2 && (
                  <TouchableOpacity
                    className="h-14 w-full rounded-xl flex-row gap-2 items-center justify-center shadow-sm bg-white border border-gray-300"
                    onPress={() => setStep(1)}
                  >
                    <Text className="font-bold text-base">Back</Text>
                  </TouchableOpacity>
                )}
              </View>
            )}

            <View className="mt-8 items-center">
              <Text className="text-xs text-gray-500 text-center">
                By continuing, you agree to our{" "}
                <Text className="text-primary font-medium">
                  Terms of Service
                </Text>
                .
              </Text>
            </View>
          </View>

          <View className="pb-4 pt-4 items-center">
            <Pressable>
              <Text className="text-sm text-gray-600 font-medium text-primary">
                Can&apos;t receive the code?
              </Text>
            </Pressable>
          </View>
        </View>
        <View className="py-4 border-t border-gray-200 w-2/3 mx-auto">
          <Text className="text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Text className="font-semibold text-[#1173d4]">
              <Link href={"/(auth)/sign-up"}>Sign Up</Link>
            </Text>
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
