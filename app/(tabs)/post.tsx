import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

import UserAvatar from "@/components/feed/UserAvatar";
import { ThemedText } from "@/components/themed-text";
import { useAuth } from "@/contexts/AuthContext";
import { createPost } from "@/services/postService";

const MAX_LENGTH = 500;

export default function PostScreen() {
  const router = useRouter();
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [text, setText] = useState("");

  const { mutate, isPending, error } = useMutation({
    mutationFn: () => createPost({ content: text }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      queryClient.invalidateQueries({ queryKey: ["myPosts"] });
      Alert.alert("Success", "Post created successfully!", [
        {
          text: "OK",
          onPress: () => {
            setText("");
            router.navigate("/(tabs)");
          },
        },
      ]);
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        console.error(
          "Create post error:",
          err.response?.status,
          err.response?.data,
        );
      } else {
        console.error("Create post error:", err);
      }
    },
  });

  if (!user) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-surface">
        <ThemedText className="!text-muted">Loading...</ThemedText>
      </SafeAreaView>
    );
  }

  const charCount = text.length;
  const isOverLimit = charCount > MAX_LENGTH;
  const canPost = text.trim().length > 0 && !isOverLimit && !isPending;

  const handlePost = () => {
    if (!canPost) return;
    mutate();
  };

  const apiError =
    error instanceof AxiosError
      ? (error.response?.data?.message ??
        "Failed to create post. Please try again.")
      : error
        ? "Failed to create post. Please try again."
        : null;

  return (
    <SafeAreaView className="flex-1 bg-surface" edges={["top"]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        {/* Header */}
        <Animated.View
          entering={FadeIn.duration(300)}
          className="flex-row items-center justify-between border-b border-divider px-4 py-3"
        >
          <TouchableOpacity
            onPress={() => router.navigate("/(tabs)")}
            hitSlop={8}
            disabled={isPending}
          >
            <ThemedText className="!text-muted text-base">Cancel</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handlePost}
            disabled={!canPost}
            activeOpacity={0.85}
            className={`items-center justify-center rounded-full px-5 py-2 ${
              canPost ? "bg-primary" : "bg-primary/30"
            }`}
          >
            {isPending ? (
              <ActivityIndicator color="#fff" size="small" />
            ) : (
              <ThemedText className="!text-white text-sm font-bold">
                Post
              </ThemedText>
            )}
          </TouchableOpacity>
        </Animated.View>

        {/* API Error */}
        {apiError && (
          <View className="bg-error-light px-4 py-2">
            <ThemedText className="!text-error text-sm">{apiError}</ThemedText>
          </View>
        )}

        {/* Composer */}
        <View className="flex-1 px-4 pt-4">
          <View className="flex-row gap-3">
            <UserAvatar
              name={`${user.firstName} ${user.lastName}`}
              userId={user._id}
              size={44}
            />
            <View className="flex-1">
              <ThemedText className="text-sm font-semibold">
                {user.firstName} {user.lastName}
              </ThemedText>
              <ThemedText className="!text-muted text-sm">
                @{user.username}
              </ThemedText>
            </View>
          </View>

          <TextInput
            className="mt-4 flex-1 text-[17px] leading-[24px] text-foreground"
            placeholder="What's on your mind?"
            placeholderTextColor="rgb(var(--color-placeholder))"
            value={text}
            onChangeText={setText}
            multiline
            textAlignVertical="top"
            autoFocus
            maxLength={MAX_LENGTH + 50}
            editable={!isPending}
          />
        </View>

        {/* Footer */}
        <View className="flex-row items-center justify-between border-t border-divider px-4 py-3">
          <View className="h-5 w-5" />
          <ThemedText
            className={`text-sm ${isOverLimit ? "!text-error font-semibold" : "!text-muted"}`}
          >
            {charCount}/{MAX_LENGTH}
          </ThemedText>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
