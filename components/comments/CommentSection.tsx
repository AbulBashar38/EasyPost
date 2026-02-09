import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { ActivityIndicator, View } from "react-native";

import { ThemedText } from "@/components/themed-text";
import { createComment, getComments } from "@/services/commentService";
import type { IComment } from "@/types/CommentType";

import CommentInput from "./CommentInput";
import CommentThread from "./CommentThread";

interface CommentSectionProps {
  postId: string;
  comments?: IComment[];
  onCommentSuccess?: () => void;
}

export default function CommentSection({
  postId,
  onCommentSuccess,
}: CommentSectionProps) {
  const queryClient = useQueryClient();
  const [replyingTo, setReplyingTo] = useState<{
    commentId: string;
    userName: string;
  } | null>(null);

  // Fetch comments from API
  const { data: apiComments, isLoading: isLoadingComments } = useQuery({
    queryKey: ["comments", postId],
    queryFn: () => getComments(postId),
  });

  // Create comment mutation
  const { mutate: mutateCreateComment, isPending: isCreatingComment } =
    useMutation({
      mutationFn: (content: string) => createComment(postId, { content }),
      onSuccess: () => {
        setReplyingTo(null);
        queryClient.invalidateQueries({ queryKey: ["comments", postId] });
        onCommentSuccess?.();
      },
    });

  const comments: IComment[] = useMemo(() => {
    return apiComments?.comments ?? [];
  }, [apiComments?.comments]);

  const handleReply = (commentId: string, userName: string) => {
    setReplyingTo({ commentId, userName });
  };

  const handleSubmit = (text: string) => {
    if (!text.trim()) return;
    mutateCreateComment(text);
  };

  const handleCancelReply = () => {
    setReplyingTo(null);
  };

  return (
    <View className="mt-2 border-t border-divider pt-2">
      {isLoadingComments ? (
        <View className="items-center py-4">
          <ActivityIndicator size="small" />
        </View>
      ) : comments.length === 0 ? (
        <View className="items-center py-4">
          <ThemedText className="!text-muted text-sm">
            No comments yet
          </ThemedText>
        </View>
      ) : (
        comments.map((comment) => (
          <CommentThread
            key={comment._id}
            comment={comment}
            onReply={handleReply}
          />
        ))
      )}
      <CommentInput
        onSubmit={handleSubmit}
        replyingTo={replyingTo?.userName ?? null}
        onCancelReply={handleCancelReply}
        isSubmitting={isCreatingComment}
      />
    </View>
  );
}
