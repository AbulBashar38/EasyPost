import { View } from "react-native";

import { ThemedText } from "@/components/themed-text";

export default function FeedHeader() {
  return (
    <View className="border-b border-divider bg-surface px-4 py-3">
      <ThemedText type="subtitle">
        Easy
        <ThemedText type="subtitle" className="!text-primary">
          Post
        </ThemedText>
      </ThemedText>
    </View>
  );
}
