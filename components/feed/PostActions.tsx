import { Ionicons } from "@expo/vector-icons";
import { Pressable, View } from "react-native";

import { ThemedText } from "@/components/themed-text";

function formatCount(count: number): string {
  if (count >= 1_000_000) {
    return `${(count / 1_000_000).toFixed(1).replace(/\.0$/, "")}M`;
  }
  if (count >= 1_000) {
    return `${(count / 1_000).toFixed(1).replace(/\.0$/, "")}K`;
  }
  return String(count);
}

interface PostActionsProps {
  likeCount: number;
  commentCount: number;
  onCommentPress?: () => void;
}

export default function PostActions({
  likeCount,
  commentCount,
  onCommentPress,
}: PostActionsProps) {
  return (
    <View className="mt-3 flex-row items-center gap-5">
      <View className="flex-row items-center gap-1.5">
        <Ionicons name="heart-outline" size={18} className="text-placeholder" />
        <ThemedText className="!text-muted text-sm">
          {formatCount(likeCount)}
        </ThemedText>
      </View>
      <Pressable
        onPress={onCommentPress}
        className="flex-row items-center gap-1.5"
        hitSlop={8}
      >
        <Ionicons
          name="chatbubble-outline"
          size={17}
          className="text-placeholder"
        />
        <ThemedText className="!text-muted text-sm">
          {formatCount(commentCount)}
        </ThemedText>
      </Pressable>
    </View>
  );
}
