import { View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";

import { ThemedText } from "@/components/themed-text";
import type { Post } from "@/constants/types";

import PostActions from "./PostActions";
import UserAvatar from "./UserAvatar";

function getRelativeTime(isoString: string): string {
  const now = Date.now();
  const then = new Date(isoString).getTime();
  const diffMs = now - then;

  const minutes = Math.floor(diffMs / 60_000);
  if (minutes < 1) return "now";
  if (minutes < 60) return `${minutes}m`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h`;

  const days = Math.floor(hours / 24);
  if (days < 30) return `${days}d`;

  const months = Math.floor(days / 30);
  return `${months}mo`;
}

interface PostCardProps {
  post: Post;
  index: number;
}

export default function PostCard({ post, index }: PostCardProps) {
  return (
    <Animated.View
      entering={FadeInDown.duration(400).delay(Math.min(index, 5) * 80)}
      className="border-b border-divider px-4 py-3"
    >
      <View className="flex-row items-start gap-3">
        <UserAvatar name={post.user.name} userId={post.user.id} />
        <View className="flex-1">
          <View className="flex-row items-center gap-1.5">
            <ThemedText className="text-sm font-semibold">
              {post.user.name}
            </ThemedText>
            <ThemedText className="!text-muted text-sm">
              {post.user.handle}
            </ThemedText>
            <ThemedText className="!text-muted text-sm">·</ThemedText>
            <ThemedText className="!text-muted text-sm">
              {getRelativeTime(post.createdAt)}
            </ThemedText>
          </View>
          <ThemedText className="mt-1.5 text-[15px] leading-[22px]">
            {post.text}
          </ThemedText>
          <PostActions
            likeCount={post.likeCount}
            commentCount={post.commentCount}
          />
        </View>
      </View>
    </Animated.View>
  );
}
