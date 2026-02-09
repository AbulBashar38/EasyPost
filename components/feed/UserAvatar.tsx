import { Text, View } from "react-native";

const AVATAR_COLORS = [
  "#6C63FF",
  "#FF6B6B",
  "#4ECDC4",
  "#FFD93D",
  "#A78BFA",
  "#FF8A65",
];

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) {
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }
  return name.slice(0, 2).toUpperCase();
}

function getColor(userId: string): string {
  let hash = 0;
  for (let i = 0; i < userId.length; i++) {
    hash += userId.charCodeAt(i);
  }
  return AVATAR_COLORS[hash % AVATAR_COLORS.length];
}

interface UserAvatarProps {
  name: string;
  userId: string;
  size?: number;
}

export default function UserAvatar({
  name,
  userId,
  size = 40,
}: UserAvatarProps) {
  return (
    <View
      className="items-center justify-center rounded-full"
      style={{
        width: size,
        height: size,
        backgroundColor: getColor(userId),
      }}
    >
      <Text style={{ fontSize: size * 0.38, fontWeight: "700", color: "#fff" }}>
        {getInitials(name)}
      </Text>
    </View>
  );
}
