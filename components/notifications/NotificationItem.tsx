import { Ionicons } from "@expo/vector-icons";
import { Pressable, View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";

import UserAvatar from "@/components/feed/UserAvatar";
import { ThemedText } from "@/components/themed-text";
import type { Notification } from "@/constants/types";

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

function getIcon(type: Notification["type"]): {
  name: keyof typeof Ionicons.glyphMap;
  color: string;
} {
  switch (type) {
    case "like":
      return { name: "heart", color: "#EF4444" };
    case "comment":
      return { name: "chatbubble", color: "#6C63FF" };
    case "follow":
      return { name: "person-add", color: "#4ECDC4" };
  }
}

function getDescription(notification: Notification): string {
  switch (notification.type) {
    case "like":
      return "liked your post";
    case "comment":
      return "commented on your post";
    case "follow":
      return "started following you";
  }
}

interface NotificationItemProps {
  notification: Notification;
  index: number;
}

export default function NotificationItem({
  notification,
  index,
}: NotificationItemProps) {
  const icon = getIcon(notification.type);

  return (
    <Animated.View
      entering={FadeInDown.duration(300).delay(Math.min(index, 8) * 60)}
    >
      <Pressable
        className={`flex-row items-center gap-3 px-4 py-3.5 ${
          !notification.read ? "bg-icon-bg" : ""
        }`}
      >
        <View className="relative">
          <UserAvatar
            name={notification.actor.name}
            userId={notification.actor.id}
            size={40}
          />
          <View
            className="absolute -bottom-0.5 -right-0.5 items-center justify-center rounded-full border-2 border-surface"
            style={{ width: 20, height: 20 }}
          >
            <Ionicons name={icon.name} size={10} color={icon.color} />
          </View>
        </View>

        <View className="flex-1">
          <ThemedText className="text-[14px] leading-[20px]">
            <ThemedText className="text-[14px] font-semibold">
              {notification.actor.name}
            </ThemedText>{" "}
            {getDescription(notification)}
          </ThemedText>
          <ThemedText className="!text-muted mt-0.5 text-[12px]">
            {getRelativeTime(notification.createdAt)}
          </ThemedText>
        </View>

        {!notification.read && (
          <View className="h-2.5 w-2.5 rounded-full bg-primary" />
        )}
      </Pressable>
    </Animated.View>
  );
}
