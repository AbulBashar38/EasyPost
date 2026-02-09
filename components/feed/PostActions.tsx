import { Ionicons } from "@expo/vector-icons";
import { View } from "react-native";

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
}

export default function PostActions({
  likeCount,
  commentCount,
}: PostActionsProps) {
  return (
    <View className="mt-3 flex-row items-center gap-5">
      <View className="flex-row items-center gap-1.5">
        <Ionicons name="heart-outline" size={18} className="text-placeholder" />
        <ThemedText className="!text-muted text-sm">
          {formatCount(likeCount)}
        </ThemedText>
      </View>
      <View className="flex-row items-center gap-1.5">
        <Ionicons
          name="chatbubble-outline"
          size={17}
          className="text-placeholder"
        />
        <ThemedText className="!text-muted text-sm">
          {formatCount(commentCount)}
        </ThemedText>
      </View>
    </View>
  );
}
