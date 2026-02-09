import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { ActivityIndicator, FlatList, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import FeedHeader from "@/components/feed/FeedHeader";
import PostCard from "@/components/feed/PostCard";
import { ThemedText } from "@/components/themed-text";
import { getPosts } from "@/services/postService";
import { IPost } from "@/types/PostType";

export default function FeedScreen() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["posts"],
    queryFn: () => getPosts(1, 10),
    staleTime: 5 * 60 * 1000,
  });

  const posts = useMemo(() => data?.posts ?? [], [data]);

  if (isLoading) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-surface">
        <ActivityIndicator size="large" />
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-surface">
        <ThemedText className="!text-error">Failed to load posts</ThemedText>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-surface" edges={["top"]}>
      <FeedHeader />
      <FlatList<IPost>
        data={posts}
        keyExtractor={(item) => item._id}
        renderItem={({ item, index }) => <PostCard post={item} index={index} />}
        ListEmptyComponent={
          <View className="items-center px-6 py-12">
            <ThemedText className="!text-muted">No posts available</ThemedText>
          </View>
        }
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </SafeAreaView>
  );
}
