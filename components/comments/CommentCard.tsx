import { View } from "react-native";

import UserAvatar from "@/components/feed/UserAvatar";
import { ThemedText } from "@/components/themed-text";
import type { IComment } from "@/types/CommentType";

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
  comment: IComment;
  isReply?: boolean;
  onReply: (commentId: string, userName: string) => void;
}

export default function CommentCard({
  comment,
  isReply = false,
  onReply,
}: CommentCardProps) {
  const user = typeof comment.userId === "object" ? comment.userId : null;
  const displayName = user
    ? `${user.firstName} ${user.lastName}`
    : "Unknown User";

  return (
    <View className={`flex-row gap-2.5 py-2.5 ${isReply ? "ml-10" : ""}`}>
      <UserAvatar
        name={displayName}
        userId={user?._id ?? comment._id}
        size={isReply ? 24 : 28}
      />
      <View className="flex-1">
        <View className="flex-row items-center gap-1.5">
          <ThemedText className="text-[13px] font-semibold">
            {displayName}
          </ThemedText>
          <ThemedText className="!text-muted text-[12px]">
            {getRelativeTime(comment.createdAt)}
          </ThemedText>
        </View>
        <ThemedText className="mt-0.5 text-[14px] leading-[20px]">
          {comment.content}
        </ThemedText>
      </View>
    </View>
  );
}
