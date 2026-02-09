import { View } from "react-native";

import type { Comment } from "@/constants/types";

import CommentCard from "./CommentCard";

interface CommentThreadProps {
  comment: Comment;
  replies: Comment[];
  onReply: (commentId: string, userName: string) => void;
}

export default function CommentThread({
  comment,
  replies,
  onReply,
}: CommentThreadProps) {
  return (
    <View>
      <CommentCard comment={comment} onReply={onReply} />
      {replies.map((reply) => (
        <CommentCard key={reply.id} comment={reply} isReply onReply={onReply} />
      ))}
    </View>
  );
}
