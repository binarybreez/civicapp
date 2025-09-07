import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { Link } from 'expo-router';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';



const LoginScreen = () => {
  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      < View className="flex-1 justify-between px-6">
        {/* Main Content */}
        < View className="flex-1 justify-center">
          < View className="mb-8 items-center">
            < Text className="text-3xl font-bold text-gray-900">Welcome Back!</ Text>
            < Text className="mt-2 text-gray-500">Log in to continue to the app.</ Text>
          </ View>

          {/* Inputs */}
          < View className="space-y-6">
            {/* Email */}
            <View className="">
              < View className="flex-row items-center rounded-xl border border-gray-200 bg-white pl-4 gap-2">
                <MaterialIcons name="email" size={24} color="#9ca3af" />
              < TextInput
                placeholder="Email"
                className="h-14 pr-4 w-3/4 bg-white text-[#111418] text-base"
                placeholderTextColor="#9ca3af"
              />
              </ View>
            </View>

            {/* Password */}
            < View className="">
              < View className="flex-row items-center rounded-xl border border-gray-200 bg-white pl-4 gap-2">
                  <FontAwesome5 name="lock" size={24} color="#9ca3af" />
              < TextInput
                placeholder="Password"
                secureTextEntry
                className="h-14 w-3/4 pr-4 text-[#111418] text-base"
                placeholderTextColor="#9ca3af"
              />
              </ View>
            </ View>
          </ View>

          {/* Forgot Password */}
          < View className="mt-4 items-end">
            <  TouchableOpacity>
              < Text className="text-sm font-medium text-[#1173d4]"><Link href={"/(auth)/forgot-password"}>Forgot Password?</Link></ Text>
            </  TouchableOpacity>
          </ View>

          {/* Buttons */}
          < View className="mt-8 space-y-4">
            {/* Login Button */}
            <  TouchableOpacity className="h-14 w-full flex-row gap-2 items-center justify-center rounded-xl bg-[#1173d4]">
            <MaterialCommunityIcons name="login-variant" size={24} color="white" />
              < Text className="text-white text-base font-bold flex-row items-center">Login</ Text>
            </  TouchableOpacity>

            {/* OR Divider */}
            < View className="flex-row items-center">
              < View className="flex-1 h-px bg-gray-200" />
              < Text className="px-2 text-sm text-gray-500">OR</ Text>
              < View className="flex-1 h-px bg-gray-200" />
            </ View>

            {/* OTP Button */}
            <  TouchableOpacity className="h-14 w-full items-center justify-center rounded-xl border border-gray-300 bg-white">
              < Text className="text-base font-bold text-gray-700">Login with OTP</ Text>
            </  TouchableOpacity>
          </ View>
        </ View>

        {/* Footer */}
        < View className="pb-6 pt-4 items-center">
          < Text className="text-sm text-gray-500">
            Don&apos;t have an account?{" "}
            <Text className="text-[#1173d4] font-medium"><Link href="/(auth)/sign-up">Sign Up</Link></Text>
          </ Text>
        </ View>
      </ View>
    </SafeAreaView>
  );
};

export default LoginScreen;
