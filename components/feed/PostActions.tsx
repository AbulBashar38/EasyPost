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
  isLiked?: boolean;
  isLiking?: boolean;
  onLikePress?: () => void;
  onCommentPress?: () => void;
}

export default function PostActions({
  likeCount,
  commentCount,
  isLiked = false,
  isLiking = false,
  onLikePress,
  onCommentPress,
}: PostActionsProps) {
  return (
    <View className="mt-3 flex-row items-center gap-5">
      <Pressable
        onPress={onLikePress}
        disabled={isLiking}
        className="flex-row items-center gap-1.5"
        hitSlop={8}
      >
        <Ionicons
          name={isLiked ? "heart" : "heart-outline"}
          size={18}
          className={isLiked ? "text-error" : "text-placeholder"}
        />
        <ThemedText className={`!text-muted text-sm ${isLiked ? "!text-error font-semibold" : ""}`}>
          {formatCount(likeCount)}
        </ThemedText>
      </Pressable>
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
