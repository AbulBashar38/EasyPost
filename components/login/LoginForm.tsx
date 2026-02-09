import { Ionicons } from "@expo/vector-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import { useRef } from "react";
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
import { loginSchema, type LoginFormData } from "./loginSchema";

interface LoginFormProps {
  onSubmit: (data: LoginFormData) => void;
  isPending?: boolean;
  apiError?: string | null;
}

export default function LoginForm({
  onSubmit,
  isPending = false,
  apiError,
}: LoginFormProps) {
  const router = useRouter();

  const passwordRef = useRef<TextInputType>(null);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

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
              <Ionicons name="log-in-outline" size={30} color="#fff" />
            </View>
            <ThemedText type="title" className="text-3xl leading-9 mb-2">
              Welcome Back
            </ThemedText>
            <ThemedText className="!text-muted text-base leading-6">
              Log in to your EasyPost account
            </ThemedText>
          </Animated.View>

          {/* Form */}
          <Animated.View entering={FadeInDown.duration(600).delay(200)}>
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
                    onSubmitEditing={() => passwordRef.current?.focus()}
                  />
                )}
              />
            </View>

            {/* Password */}
            <View className="mb-8">
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
                    returnKeyType="done"
                    inputRef={passwordRef}
                    onSubmitEditing={handleSubmit(onSubmit)}
                  />
                )}
              />
            </View>

            {/* API Error */}
            {apiError && (
              <View className="mb-4 rounded-xl bg-error-light px-4 py-3">
                <ThemedText className="!text-error text-sm">
                  {apiError}
                </ThemedText>
              </View>
            )}

            {/* Log In Button */}
            <TouchableOpacity
              onPress={handleSubmit(onSubmit)}
              disabled={isPending}
              activeOpacity={0.85}
              className={`mb-6 items-center justify-center rounded-2xl h-14 shadow-lg ${
                isPending ? "bg-primary/60" : "bg-primary"
              }`}
              style={{
                shadowColor: isPending
                  ? "transparent"
                  : "rgb(var(--color-primary))",
                shadowOffset: { width: 0, height: 6 },
                shadowOpacity: isPending ? 0 : 0.3,
                shadowRadius: 12,
                elevation: isPending ? 0 : 8,
              }}
            >
              {isPending ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <ThemedText className="!text-white text-base font-bold tracking-wide">
                  Log In
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
              Don&apos;t have an account?{" "}
            </ThemedText>
            <TouchableOpacity
              onPress={() => router.push("/(auth)/signup")}
              hitSlop={8}
            >
              <ThemedText className="!text-primary text-sm font-semibold">
                Sign up
              </ThemedText>
            </TouchableOpacity>
          </Animated.View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ThemedView>
  );
}
