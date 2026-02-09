import { FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import FeedHeader from "@/components/feed/FeedHeader";
import PostCard from "@/components/feed/PostCard";
import { MOCK_POSTS } from "@/constants/mockData";
import type { Post } from "@/constants/types";

export default function FeedScreen() {
  return (
    <SafeAreaView className="flex-1 bg-surface" edges={["top"]}>
      <FeedHeader />
      <FlatList<Post>
        data={MOCK_POSTS}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => <PostCard post={item} index={index} />}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </SafeAreaView>
  );
}
