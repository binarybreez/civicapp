import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  NativeSyntheticEvent,
  TextInputKeyPressEventData,
  ActivityIndicator,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, useRouter } from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";
// import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Ionicons from "@expo/vector-icons/Ionicons";
import apiClient from "@/src/lib/apiclient";
import { useAuth } from "@/src/context/authContext";

const SignUp: React.FC = () => {
  const router = useRouter();
  const [phone, setPhone] = useState("");
  const [fullname, setFullname] = useState("");
  // const [password, setPassword] = useState("");
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [showOtpSection, setShowOtpSection] = useState(false);
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(60);
  const { login } = useAuth();

  const inputsRef = useRef<Array<TextInput | null>>([]);

  const handleOtpChange = (index: number, value: string) => {
    const newOtp = [...otp];
    newOtp[index] = value.slice(0, 1);
    setOtp(newOtp);

    if (value && index < otp.length - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (
    e: NativeSyntheticEvent<TextInputKeyPressEventData>,
    index: number
  ) => {
    if (e.nativeEvent.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handleGetOtp = async () => {
    // Add your OTP sending logic here
    try {
      setLoading(true);
      const response = await apiClient("/api/auth/send-otp", {
        method: "POST",
        body: {
          phone: `+91${phone}`,
        },
      });
      setShowOtpSection(true);
      setTimer(60);
      console.log(response);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (timer === 0) return;
    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  const handleCreateAccount = async () => {
    const otpString = otp.join(""); // "123456"
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
          full_name: fullname,
          new:true
        },
      });
      if (response.data?.session) {
        console.log("Got session:", response.data.data.session);
        await login(response.data.data.session); // saves in context + SecureStore
        router.replace("/(protected)/dashboard");
      } else {
        console.log("no session in response")
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const isOtpComplete = otp.every((digit) => digit !== "");

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <TouchableOpacity
          className={`${showOtpSection ? "flex-row items-center mt-2 px-4" : "hidden"}`}
          onPress={() => setShowOtpSection(false)}
        >
          <Ionicons name="chevron-back" size={28} color="black" />
          <Text>Back</Text>
        </TouchableOpacity>
        {/* Main Content */}
        <View className="flex-1 px-6 py-8">
          <View className="max-w-md self-center">
            <View className="items-center mb-10">
              <Text className="text-3xl font-bold text-gray-900">
                Join CivicVoice
              </Text>
              <Text className="mt-2 text-gray-600 text-center">
                Let&apos;s get you started. Create your account.
              </Text>
            </View>

            {/* Stepper */}
            <View className="flex-row items-center justify-center mb-10">
              {/* Step 1 */}
              <View className="flex-row items-center">
                <View
                  className={`w-8 h-8 bg-[#1173d4] rounded-full items-center justify-center`}
                >
                  <Text className={`font-bold text-white`}>1</Text>
                </View>
                <Text className={`ml-2 font-semibold text-[#1173d4]`}>
                  Details
                </Text>
              </View>

              <View
                className={`flex-1 h-0.5 mx-4 ${showOtpSection ? "bg-[#1173d4]" : "bg-gray-300"}`}
              />

              {/* Step 2 */}
              <View className="flex-row items-center">
                <View
                  className={`w-8 h-8  ${showOtpSection ? "bg-[#1173d4] rounded-full" : "bg-gray-300 rounded-full"} items-center justify-center`}
                >
                  <Text
                    className={`font-bold ${showOtpSection ? "text-white" : "text-gray-500"}`}
                  >
                    2
                  </Text>
                </View>
                <Text
                  className={`ml-2 font-semibold ${showOtpSection ? "text-[#1173d4]" : "text-gray-500"}`}
                >
                  Verify
                </Text>
              </View>
            </View>

            {!showOtpSection ? (
              <View className="space-y-6">
                {/* Phone Number */}
                <View className="">
                  <Text className="text-[13px] font-semibold text-gray-700 mb-1">
                    Phone Number
                  </Text>
                  <View className="px-3 flex-row gap-2 items-center rounded-lg border border-gray-300 bg-white">
                    <FontAwesome
                      name="phone-square"
                      size={24}
                      color="#9ca3af"
                    />
                    <TextInput
                      keyboardType="phone-pad"
                      placeholder="Enter your phone number"
                      className="w-4/5 py-3 text-gray-900 placeholder-gray-400 "
                      placeholderTextColor="#9ca3af"
                      value={phone}
                      onChangeText={setPhone}
                    />
                  </View>
                  <Text className="mt-1 text-xs text-gray-500">
                    We&apos;ll send a one-time password (OTP) to this number for
                    verification.
                  </Text>
                </View>

                {/* Full Name */}
                <View>
                  <Text className="text-[13px] font-semibold text-gray-700 mb-1 mt-3">
                    Full Name
                  </Text>
                  <View className="rounded-lg border border-gray-300 flex-row items-center bg-white px-3 gap-3">
                    <FontAwesome name="user" size={24} color="#9ca3af" />
                    <TextInput
                      placeholder="e.g., Jane Doe"
                      className="py-3 text-gray-900 placeholder-gray-400 w-4/5"
                      placeholderTextColor="#9ca3af"
                      value={fullname}
                      onChangeText={setFullname}
                    />
                  </View>
                  <Text className="mt-1 text-xs text-gray-500">
                    This helps us address you properly. Your name will be public
                    on your reports.
                  </Text>
                </View>

                {/* Password */}
                {/* <View>
                  <Text className="text-[13px] font-semibold text-gray-700 mb-1 mt-3">
                    Create Password
                  </Text>
                  <View className="gap-2 flex-row items-center px-3 rounded-lg border border-gray-300 bg-white">
                    <MaterialIcons name="password" size={24} color="#9ca3af" />
                    <TextInput
                      placeholder="•••••••••••••••"
                      secureTextEntry
                      className="py-3 w-4/5 text-gray-900 placeholder-gray-400"
                      placeholderTextColor="#9ca3af"
                      value={password}
                      onChangeText={setPassword}
                    />
                  </View>
                  <Text className="mt-1 text-xs text-gray-500">
                    Must be at least 8 characters long.
                  </Text>
                </View> */}

                {/* Get OTP Button */}
                <TouchableOpacity
                  onPress={handleGetOtp}
                  className="bg-[#1173d4] py-3 rounded-lg items-center mt-5"
                >
                  <View className="flex-row items-center justify-center gap-2">
                    {loading ? (
                      <ActivityIndicator color="#fff" size={20} />
                    ) : null}
                    <Text className="text-white font-medium text-base">
                      Get OTP
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            ) : (
              <View className="mt-8 pt-6 border-t border-gray-200">
                <Text className="text-xl font-semibold text-center text-gray-800">
                  Verify Your Number
                </Text>
                <Text className="text-center text-sm text-gray-500 mt-2 mb-6">
                  Enter the 6-digit code we sent to your phone.
                </Text>

                <View className="flex-row justify-center gap-2">
                  {otp.map((digit, i) => (
                    <TextInput
                      key={i}
                      ref={(ref) => (inputsRef.current[i] = ref)}
                      maxLength={1}
                      keyboardType="number-pad"
                      className="w-12 h-14 text-center text-2xl font-semibold rounded-lg border border-gray-300"
                      value={digit}
                      onChangeText={(val) => handleOtpChange(i, val)}
                      onKeyPress={(e) => handleKeyPress(e, i)}
                    />
                  ))}
                </View>

                <TouchableOpacity
                  disabled={!isOtpComplete || loading}
                  onPress={handleCreateAccount}
                  className={`mt-6 py-3 rounded-lg ${isOtpComplete ? "bg-[#1173d4]" : "bg-gray-400"} items-center`}
                >
                  {loading ? (
                    <ActivityIndicator color={"#fff"} size={26} />
                  ) : null}
                  <Text className="text-white font-medium text-base">
                    Create Account
                  </Text>
                </TouchableOpacity>

                <Text className="mt-4 text-center text-sm text-gray-500">
                  Didn&apos;t receive the code?{" "}
                  <TouchableOpacity onPress={handleGetOtp} disabled={timer > 0}>
                    <Text
                      className={`font-medium ${timer > 0 ? "text-gray-400" : "text-[#1173d4]"} underline`}
                    >
                      {`Resend OTP 00:${timer}`}
                    </Text>
                  </TouchableOpacity>
                </Text>
              </View>
            )}

            {/* Terms */}
            <Text className="mt-2 text-center text-xs text-gray-500">
              By creating an account, you agree to our{" "}
              <Text className="font-medium text-[#1173d4] underline">
                Terms of Service
              </Text>{" "}
              and{" "}
              <Text className="font-medium text-[#1173d4] underline">
                Privacy Policy
              </Text>
              .
            </Text>
          </View>
        </View>

        {/* Footer */}
        <View className="bg-white py-4 border-t border-gray-200">
          <Text className="text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Text className="font-semibold text-[#1173d4]">
              <Link href={"/(auth)/sign-in"}>Sign In</Link>
            </Text>
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
