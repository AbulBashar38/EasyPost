import { View } from "react-native";

import type { IComment } from "@/types/CommentType";

import CommentCard from "./CommentCard";

interface CommentThreadProps {
  comment: IComment;
  onReply: (commentId: string, userName: string) => void;
}

export default function CommentThread({
  comment,
  onReply,
}: CommentThreadProps) {
  return (
    <View>
      <CommentCard comment={comment} onReply={onReply} />
    </View>
  );
}
