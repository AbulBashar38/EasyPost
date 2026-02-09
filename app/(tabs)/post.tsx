import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
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

const MAX_LENGTH = 500;

// TODO: Replace with actual logged-in user
const CURRENT_USER = { id: "u1", name: "Sarah Chen", handle: "@sarahchen" };

export default function PostScreen() {
  const router = useRouter();
  const [text, setText] = useState("");
  const [isPosting, setIsPosting] = useState(false);

  const charCount = text.length;
  const isOverLimit = charCount > MAX_LENGTH;
  const canPost = text.trim().length > 0 && !isOverLimit && !isPosting;

  async function handlePost() {
    if (!canPost) return;
    setIsPosting(true);
    // TODO: Implement actual post API call
    console.log("New post:", text);
    setTimeout(() => {
      setIsPosting(false);
      setText("");
      router.navigate("/(tabs)");
    }, 1000);
  }

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
            {isPosting ? (
              <ActivityIndicator color="#fff" size="small" />
            ) : (
              <ThemedText className="!text-white text-sm font-bold">
                Post
              </ThemedText>
            )}
          </TouchableOpacity>
        </Animated.View>

        {/* Composer */}
        <View className="flex-1 px-4 pt-4">
          <View className="flex-row gap-3">
            <UserAvatar
              name={CURRENT_USER.name}
              userId={CURRENT_USER.id}
              size={44}
            />
            <View className="flex-1">
              <ThemedText className="text-sm font-semibold">
                {CURRENT_USER.name}
              </ThemedText>
              <ThemedText className="!text-muted text-sm">
                {CURRENT_USER.handle}
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
          />
        </View>

        {/* Footer */}
        <View className="flex-row items-center justify-between border-t border-divider px-4 py-3">
          <Ionicons
            name="text-outline"
            size={20}
            className="text-placeholder"
          />
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
