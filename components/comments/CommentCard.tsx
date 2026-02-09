import { Pressable, View } from "react-native";

import UserAvatar from "@/components/feed/UserAvatar";
import { ThemedText } from "@/components/themed-text";
import type { Comment } from "@/constants/types";

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

interface CommentCardProps {
  comment: Comment;
  isReply?: boolean;
  onReply: (commentId: string, userName: string) => void;
}

export default function CommentCard({
  comment,
  isReply = false,
  onReply,
}: CommentCardProps) {
  return (
    <View className={`flex-row gap-2.5 py-2.5 ${isReply ? "ml-10" : ""}`}>
      <UserAvatar
        name={comment.user.name}
        userId={comment.user.id}
        size={isReply ? 24 : 28}
      />
      <View className="flex-1">
        <View className="flex-row items-center gap-1.5">
          <ThemedText className="text-[13px] font-semibold">
            {comment.user.name}
          </ThemedText>
          <ThemedText className="!text-muted text-[12px]">
            {getRelativeTime(comment.createdAt)}
          </ThemedText>
        </View>
        <ThemedText className="mt-0.5 text-[14px] leading-[20px]">
          {comment.text}
        </ThemedText>
        {!isReply && (
          <Pressable
            onPress={() => onReply(comment.id, comment.user.name)}
            hitSlop={8}
          >
            <ThemedText className="!text-muted mt-1 text-[12px] font-medium">
              Reply
            </ThemedText>
          </Pressable>
        )}
      </View>
    </View>
  );
}
