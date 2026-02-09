import { useMutation } from "@tanstack/react-query";
import { useCallback, useState } from "react";
import { View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";

import { ThemedText } from "@/components/themed-text";
import { getPostById, toggleLike } from "@/services/postService";

import { IPost } from "@/types/PostType";
import CommentSection from "../comments/CommentSection";
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
  post: IPost;
  index: number;
}

export default function PostCard({ post: initialPost, index }: PostCardProps) {
  const [showComments, setShowComments] = useState(false);
  const [post, setPost] = useState<IPost>(initialPost);
  const [isLiked, setIsLiked] = useState(post.isLiked ?? false);
  const [likeCount, setLikeCount] = useState(post.likesCount ?? 0);

  const refreshPost = useCallback(async () => {
    try {
      const updated = await getPostById(post._id);
      setPost(updated);
      setIsLiked(updated.isLiked ?? false);
      setLikeCount(updated.likesCount ?? 0);
    } catch {
      // silently fail – optimistic state is still valid
    }
  }, [post._id]);

  const { mutate: mutateLike, isPending: isLiking } = useMutation({
    mutationFn: () => toggleLike(post._id),
    onMutate: () => {
      const previousIsLiked = isLiked;
      const previousLikeCount = likeCount;

      const newIsLiked = !previousIsLiked;
      setIsLiked(newIsLiked);
      setLikeCount(newIsLiked ? previousLikeCount + 1 : previousLikeCount - 1);

      return { previousIsLiked, previousLikeCount };
    },
    onError: (_err, _variables, context) => {
      if (context) {
        setIsLiked(context.previousIsLiked);
        setLikeCount(context.previousLikeCount);
      }
    },
  });

  return (
    <Animated.View
      entering={FadeInDown.duration(400).delay(Math.min(index, 5) * 80)}
      className="border-b border-divider px-4 py-3"
    >
      <View className="flex-row items-start gap-3">
        <UserAvatar
          name={`${post?.userId?.firstName} ${post?.userId?.lastName}`}
          userId={post?.userId?._id ?? String(index)}
        />
        <View className="flex-1">
          <View className="flex-row items-center gap-1.5">
            <ThemedText className="text-sm font-semibold">
              {`${post?.userId?.firstName} ${post?.userId?.lastName}`}
            </ThemedText>
            <ThemedText className="!text-muted text-sm">
              @{post?.userId?.username}
            </ThemedText>
            <ThemedText className="!text-muted text-sm">·</ThemedText>
            <ThemedText className="!text-muted text-sm">
              {getRelativeTime(post.createdAt)}
            </ThemedText>
          </View>
          <ThemedText className="mt-1.5 text-[15px] leading-[22px]">
            {post.content}
          </ThemedText>
          <PostActions
            likeCount={likeCount}
            commentCount={post.commentsCount ?? 0}
            isLiked={isLiked}
            isLiking={isLiking}
            onLikePress={() => mutateLike()}
            onCommentPress={() => setShowComments((prev) => !prev)}
          />
        </View>
      </View>
      {showComments && (
        <CommentSection
          postId={post._id}
          comments={post?.comments || []}
          onCommentSuccess={refreshPost}
        />
      )}
    </Animated.View>
  );
}
