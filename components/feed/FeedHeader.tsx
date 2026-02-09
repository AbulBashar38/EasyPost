import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Pressable, View } from "react-native";

import { ThemedText } from "@/components/themed-text";
import { MOCK_NOTIFICATIONS } from "@/constants/mockData";

const hasUnread = MOCK_NOTIFICATIONS.some((n) => !n.read);

export default function FeedHeader() {
  const router = useRouter();

  return (
    <View className="flex-row items-center justify-between border-b border-divider bg-surface px-4 py-3">
      <ThemedText type="subtitle">
        Easy
        <ThemedText type="subtitle" className="!text-primary">
          Post
        </ThemedText>
      </ThemedText>
      <Pressable onPress={() => router.push("/notifications")} hitSlop={12}>
        <View>
          <Ionicons
            name="notifications-outline"
            size={24}
            className="text-foreground"
          />
          {hasUnread && (
            <View className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full border border-surface bg-error" />
          )}
        </View>
      </Pressable>
    </View>
  );
}
