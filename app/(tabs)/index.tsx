import { useCallback, useState } from "react";
import { FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import FeedHeader from "@/components/feed/FeedHeader";
import PostCard from "@/components/feed/PostCard";
import { MOCK_COMMENTS, MOCK_POSTS } from "@/constants/mockData";
import type { Comment, Post } from "@/constants/types";

const CURRENT_USER = {
  id: "u1",
  name: "Sarah Chen",
  handle: "@sarahchen",
};

export default function FeedScreen() {
  const [comments, setComments] = useState<Comment[]>(MOCK_COMMENTS);

  const handleAddComment = useCallback(
    (postId: string, text: string, parentId?: string) => {
      const newComment: Comment = {
        id: `c${Date.now()}`,
        postId,
        user: CURRENT_USER,
        text,
        createdAt: new Date().toISOString(),
        parentId: parentId ?? null,
      };
      setComments((prev) => [...prev, newComment]);
    },
    [],
  );

  return (
    <SafeAreaView className="flex-1 bg-surface" edges={["top"]}>
      <FeedHeader />
      <FlatList<Post>
        data={MOCK_POSTS}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <PostCard
            post={item}
            index={index}
            comments={comments.filter((c) => c.postId === item.id)}
            onAddComment={handleAddComment}
          />
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </SafeAreaView>
  );
}
