import { useMemo, useState } from "react";
import { View } from "react-native";

import type { Comment } from "@/constants/types";

import CommentInput from "./CommentInput";
import CommentThread from "./CommentThread";

interface CommentSectionProps {
  postId: string;
  comments: Comment[];
  onAddComment: (postId: string, text: string, parentId?: string) => void;
}

export default function CommentSection({
  postId,
  comments,
  onAddComment,
}: CommentSectionProps) {
  const [replyingTo, setReplyingTo] = useState<{
    commentId: string;
    userName: string;
  } | null>(null);

  const threads = useMemo(() => {
    const topLevel = comments.filter((c) => c.parentId === null);
    const repliesByParent = new Map<string, Comment[]>();
    for (const c of comments) {
      if (c.parentId) {
        const existing = repliesByParent.get(c.parentId) ?? [];
        existing.push(c);
        repliesByParent.set(c.parentId, existing);
      }
    }
    return topLevel.map((comment) => ({
      comment,
      replies: repliesByParent.get(comment.id) ?? [],
    }));
  }, [comments]);

  const handleReply = (commentId: string, userName: string) => {
    setReplyingTo({ commentId, userName });
  };

  const handleSubmit = (text: string) => {
    onAddComment(postId, text, replyingTo?.commentId);
    setReplyingTo(null);
  };

  const handleCancelReply = () => {
    setReplyingTo(null);
  };

  return (
    <View className="mt-2 border-t border-divider pt-2">
      {threads.map(({ comment, replies }) => (
        <CommentThread
          key={comment.id}
          comment={comment}
          replies={replies}
          onReply={handleReply}
        />
      ))}
      <CommentInput
        onSubmit={handleSubmit}
        replyingTo={replyingTo?.userName ?? null}
        onCancelReply={handleCancelReply}
      />
    </View>
  );
}
