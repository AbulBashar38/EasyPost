import { Ionicons } from "@expo/vector-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import { useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
  View,
  type TextInput as TextInputType,
} from "react-native";
import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import Input from "@/components/ui/Input";
import { signupSchema, type SignupFormData } from "./signupSchema";

interface SignupFormProps {
  onSubmit: (data: SignupFormData) => Promise<void>;
}

export default function SignupForm({ onSubmit }: SignupFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const lastNameRef = useRef<TextInputType>(null);
  const emailRef = useRef<TextInputType>(null);
  const passwordRef = useRef<TextInputType>(null);
  const confirmPasswordRef = useRef<TextInputType>(null);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onFormSubmit(data: SignupFormData) {
    setIsLoading(true);
    try {
      await onSubmit(data);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <ThemedView className="flex-1 bg-surface">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 24 }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <Animated.View
            entering={FadeInUp.duration(600).delay(100)}
            className="mt-16 mb-8"
          >
            <View
              className="mb-5 h-16 w-16 items-center justify-center rounded-2xl bg-primary shadow-lg"
              style={{
                shadowColor: "rgb(var(--color-primary))",
                shadowOffset: { width: 0, height: 8 },
                shadowOpacity: 0.35,
                shadowRadius: 16,
                elevation: 12,
              }}
            >
              <Ionicons name="person-add" size={30} color="#fff" />
            </View>
            <ThemedText type="title" className="text-3xl leading-9 mb-2">
              Create Account
            </ThemedText>
            <ThemedText className="!text-muted text-base leading-6">
              Sign up to get started with EasyPost
            </ThemedText>
          </Animated.View>

          {/* Form */}
          <Animated.View entering={FadeInDown.duration(600).delay(200)}>
            {/* Name Row */}
            <View className="mb-3 flex-row gap-3">
              <View className="flex-1">
                <Controller
                  control={control}
                  name="firstName"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Input
                      icon="person-outline"
                      placeholder="First name"
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      error={errors.firstName?.message}
                      autoCapitalize="words"
                      onSubmitEditing={() => lastNameRef.current?.focus()}
                    />
                  )}
                />
              </View>
              <View className="flex-1">
                <Controller
                  control={control}
                  name="lastName"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Input
                      icon="person-outline"
                      placeholder="Last name"
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      error={errors.lastName?.message}
                      autoCapitalize="words"
                      inputRef={lastNameRef}
                      onSubmitEditing={() => emailRef.current?.focus()}
                    />
                  )}
                />
              </View>
            </View>

            {/* Email */}
            <View className="mb-3">
              <Controller
                control={control}
                name="email"
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    icon="mail-outline"
                    placeholder="Email address"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    error={errors.email?.message}
                    keyboardType="email-address"
                    inputRef={emailRef}
                    onSubmitEditing={() => passwordRef.current?.focus()}
                  />
                )}
              />
            </View>

            {/* Password */}
            <View className="mb-3">
              <Controller
                control={control}
                name="password"
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    icon="lock-closed-outline"
                    placeholder="Password"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    error={errors.password?.message}
                    showToggle
                    inputRef={passwordRef}
                    onSubmitEditing={() => confirmPasswordRef.current?.focus()}
                  />
                )}
              />
            </View>

            {/* Confirm Password */}
            <View className="mb-8">
              <Controller
                control={control}
                name="confirmPassword"
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    icon="shield-checkmark-outline"
                    placeholder="Confirm password"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    error={errors.confirmPassword?.message}
                    showToggle
                    returnKeyType="done"
                    inputRef={confirmPasswordRef}
                    onSubmitEditing={handleSubmit(onFormSubmit)}
                  />
                )}
              />
            </View>

            {/* Sign Up Button */}
            <TouchableOpacity
              onPress={handleSubmit(onFormSubmit)}
              disabled={isLoading}
              activeOpacity={0.85}
              className={`mb-6 items-center justify-center rounded-2xl h-14 shadow-lg ${
                isLoading ? "bg-primary/60" : "bg-primary"
              }`}
              style={{
                shadowColor: isLoading
                  ? "transparent"
                  : "rgb(var(--color-primary))",
                shadowOffset: { width: 0, height: 6 },
                shadowOpacity: isLoading ? 0 : 0.3,
                shadowRadius: 12,
                elevation: isLoading ? 0 : 8,
              }}
            >
              {isLoading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <ThemedText className="!text-white text-base font-bold tracking-wide">
                  Sign Up
                </ThemedText>
              )}
            </TouchableOpacity>
          </Animated.View>

          {/* Footer */}
          <Animated.View
            entering={FadeInDown.duration(600).delay(400)}
            className="flex-row items-center justify-center pb-8"
          >
            <ThemedText className="!text-muted text-sm">
              Already have an account?{" "}
            </ThemedText>
            <TouchableOpacity
              onPress={() => router.navigate("/(auth)/login")}
              hitSlop={8}
            >
              <ThemedText className="!text-primary text-sm font-semibold">
                Log in
              </ThemedText>
            </TouchableOpacity>
          </Animated.View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ThemedView>
  );
}
