import { useMemo } from "react";
import { FlatList, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import PostCard from "@/components/feed/PostCard";
import ProfileHeader from "@/components/profile/ProfileHeader";
import { ThemedText } from "@/components/themed-text";
import { MOCK_POSTS } from "@/constants/mockData";
import type { Post } from "@/constants/types";

// TODO: Replace with actual logged-in user
const CURRENT_USER = {
  id: "u1",
  name: "Sarah Chen",
  handle: "@sarahchen",
  bio: "Software engineer building things for the web. Open source enthusiast. Always learning, always shipping.",
};

export default function ProfileScreen() {
  const userPosts = useMemo(
    () => MOCK_POSTS.filter((p) => p.user.id === CURRENT_USER.id),
    [],
  );

  const totalLikes = useMemo(
    () => userPosts.reduce((sum, p) => sum + p.likeCount, 0),
    [userPosts],
  );

  return (
    <SafeAreaView className="flex-1 bg-surface" edges={["top"]}>
      <FlatList<Post>
        data={userPosts}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <PostCard post={item} index={index} />
        )}
        ListHeaderComponent={
          <>
            <ProfileHeader
              name={CURRENT_USER.name}
              handle={CURRENT_USER.handle}
              userId={CURRENT_USER.id}
              bio={CURRENT_USER.bio}
              postCount={userPosts.length}
              totalLikes={totalLikes}
            />
            <View className="border-b border-divider px-4 py-2.5">
              <ThemedText className="text-sm font-semibold">Posts</ThemedText>
            </View>
          </>
        }
        ListEmptyComponent={
          <View className="items-center px-6 py-12">
            <ThemedText className="!text-muted text-base">
              No posts yet.
            </ThemedText>
          </View>
        }
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </SafeAreaView>
  );
}
