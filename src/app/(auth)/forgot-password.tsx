import React from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { Link } from "expo-router";

const ForgotPasswordScreen = () => {
  return (
    <SafeAreaView className="flex-1 bg-white justify-between">
      {/* Top Content */}
      <View className="p-6">
        {/* Header */}
        <View className="flex-row items-center justify-between mb-8">
          <TouchableOpacity>
            <Link href={"/(auth)/sign-in"}>
            <MaterialIcons
              name="arrow-back-ios-new"
              size={28}
              color="#111418"
              />
              </Link>
          </TouchableOpacity>
        </View>

        {/* Lock Icon & Description */}
        <View className="items-center mb-8">
          <MaterialIcons name="lock-reset" size={64} color="#1173d4" />
          <Text className="text-3xl font-bold text-[#111418] mt-4">
            Forgot Your Password?
          </Text>
          <Text className="text-base text-[#617589] mt-2 text-center">
            No worries! Enter your email address below and we&apos;ll send you a
            link to reset it.
          </Text>
        </View>

        {/* Email Input */}
        <View className="flex flex-col gap-4 ">
          <View className="mb-2">
            <Text className="text-sm font-medium text-[#111418] mb-2">
              Email Address
            </Text>
            <View className="relative">
              <MaterialIcons
                name="mail"
                size={20}
                color="#617589"
                style={{ position: "absolute", top: 24, left: 16, zIndex: 10 }}
              />
              <TextInput
                className="h-14 pl-12 pr-4 py-2 rounded-md border border-[#F0F2F4] bg-[#F0F2F4] text-[#111418] text-base"
                placeholder="you@example.com"
                placeholderTextColor="#617589"
              />
            </View>
          </View>
          <View className="flex-row items-start gap-3  rounded-lg bg-blue-50 p-3 ">
            <FontAwesome6 name="circle-info" size={24} color="#1565C0" />
            <Text className="text-blue-800 text-[13px] w-4/5 text-center">
              You will receive an email with a link to reset your password. Please check your inbox and spam folder.
            </Text>
          </View>
        </View>
      </View>

      {/* Footer Button */}
      <View className="p-6">
        <TouchableOpacity className="h-14 w-full bg-[#1173d4] rounded-md justify-center items-center shadow-lg shadow-blue-500/30">
          <Text className="text-white text-lg font-bold tracking-wide">
            Send Reset Link
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ForgotPasswordScreen;
