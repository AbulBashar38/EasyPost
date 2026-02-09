import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { ActivityIndicator, FlatList, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import PostCard from "@/components/feed/PostCard";
import ProfileHeader from "@/components/profile/ProfileHeader";
import { ThemedText } from "@/components/themed-text";
import { useAuth } from "@/contexts/AuthContext";
import { getMyPosts } from "@/services/postService";
import { IPost } from "@/types/PostType";

export default function ProfileScreen() {
  const { user } = useAuth();

  const { data, isLoading } = useQuery({
    queryKey: ["myPosts"],
    queryFn: () => getMyPosts(1, 20),
    enabled: !!user,
  });

  const myPosts = useMemo(() => data?.posts ?? [], [data]);

  const totalLikes = useMemo(
    () => myPosts.reduce((sum, p) => sum + (p.likesCount ?? 0), 0),
    [myPosts],
  );

  if (!user) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-surface">
        <ThemedText className="!text-muted">Loading profile...</ThemedText>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-surface" edges={["top"]}>
      <FlatList<IPost>
        data={myPosts}
        keyExtractor={(item) => item._id}
        renderItem={({ item, index }) => <PostCard post={item} index={index} />}
        ListHeaderComponent={
          <>
            <ProfileHeader
              name={`${user.firstName} ${user.lastName}`}
              handle={`@${user.username}`}
              userId={user._id}
              bio="Software engineer building things for the web. Open source enthusiast. Always learning, always shipping."
              postCount={data?.total ?? myPosts.length}
              totalLikes={totalLikes}
            />
            <View className="border-b border-divider px-4 py-2.5">
              <ThemedText className="text-sm font-semibold">Posts</ThemedText>
            </View>
          </>
        }
        ListEmptyComponent={
          isLoading ? (
            <View className="items-center py-12">
              <ActivityIndicator size="large" />
            </View>
          ) : (
            <View className="items-center px-6 py-12">
              <ThemedText className="!text-muted text-base">
                No posts yet.
              </ThemedText>
            </View>
          )
        }
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </SafeAreaView>
  );
}
