import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { FlatList, Pressable, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import NotificationItem from "@/components/notifications/NotificationItem";
import { ThemedText } from "@/components/themed-text";
import { MOCK_NOTIFICATIONS } from "@/constants/mockData";
import type { Notification } from "@/constants/types";

export default function NotificationsScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-surface" edges={["top"]}>
      <View className="flex-row items-center border-b border-divider px-4 py-3">
        <Pressable onPress={() => router.back()} hitSlop={12}>
          <Ionicons name="arrow-back" size={24} className="text-foreground" />
        </Pressable>
        <ThemedText type="subtitle" className="ml-4">
          Notifications
        </ThemedText>
      </View>

      <FlatList<Notification>
        data={MOCK_NOTIFICATIONS}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <NotificationItem notification={item} index={index} />
        )}
        ListEmptyComponent={
          <View className="items-center px-6 py-12">
            <ThemedText className="!text-muted text-base">
              No notifications yet.
            </ThemedText>
          </View>
        }
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </SafeAreaView>
  );
}
