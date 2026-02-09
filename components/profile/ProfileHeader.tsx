import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity, View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";

import UserAvatar from "@/components/feed/UserAvatar";
import { ThemedText } from "@/components/themed-text";

interface ProfileHeaderProps {
  name: string;
  handle: string;
  userId: string;
  bio: string;
  postCount: number;
  totalLikes: number;
  onLogout?: () => void;
}

export default function ProfileHeader({
  name,
  handle,
  userId,
  bio,
  postCount,
  totalLikes,
  onLogout,
}: ProfileHeaderProps) {
  return (
    <Animated.View
      entering={FadeInDown.duration(500).delay(100)}
      className="items-center px-6 pb-6 pt-8"
    >
      {/* Avatar */}
      <View className="mb-4 rounded-full border-[3px] border-primary/20 p-1">
        <UserAvatar name={name} userId={userId} size={72} />
      </View>

      {/* Name & Handle */}
      <ThemedText type="title" className="text-2xl">
        {name}
      </ThemedText>
      <ThemedText className="!text-muted mt-1 text-base">{handle}</ThemedText>

      {/* Bio */}
      <ThemedText className="!text-muted mt-3 text-center text-[15px] leading-[22px]">
        {bio}
      </ThemedText>

      {/* Stats */}
      <View className="mt-5 flex-row gap-3">
        <View className="flex-1 items-center rounded-2xl bg-icon-bg py-3">
          <View className="flex-row items-center gap-1.5">
            <Ionicons
              name="document-text-outline"
              size={16}
              className="text-primary"
            />
            <ThemedText className="!text-primary text-lg font-bold">
              {postCount}
            </ThemedText>
          </View>
          <ThemedText className="!text-muted mt-0.5 text-xs">Posts</ThemedText>
        </View>
        <View className="flex-1 items-center rounded-2xl bg-icon-bg py-3">
          <View className="flex-row items-center gap-1.5">
            <Ionicons name="heart" size={16} className="text-primary" />
            <ThemedText className="!text-primary text-lg font-bold">
              {totalLikes}
            </ThemedText>
          </View>
          <ThemedText className="!text-muted mt-0.5 text-xs">Likes</ThemedText>
        </View>
      </View>

      {/* Logout */}
      {onLogout && (
        <TouchableOpacity
          onPress={onLogout}
          activeOpacity={0.7}
          className="mt-5 w-full flex-row items-center justify-center gap-2 rounded-2xl border border-error/20 bg-error-light py-3"
        >
          <Ionicons name="log-out-outline" size={18} className="!text-error" />
          <ThemedText className="!text-error text-sm font-semibold">
            Logout
          </ThemedText>
        </TouchableOpacity>
      )}
    </Animated.View>
  );
}
