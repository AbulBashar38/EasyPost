import { Ionicons } from "@expo/vector-icons";
import { useEffect, useRef, useState } from "react";
import { Pressable, TextInput, View } from "react-native";

import { ThemedText } from "@/components/themed-text";

interface CommentInputProps {
  onSubmit: (text: string) => void;
  replyingTo: string | null;
  onCancelReply: () => void;
}

export default function CommentInput({
  onSubmit,
  replyingTo,
  onCancelReply,
}: CommentInputProps) {
  const [text, setText] = useState("");
  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    if (replyingTo) {
      inputRef.current?.focus();
    }
  }, [replyingTo]);

  const handleSubmit = () => {
    const trimmed = text.trim();
    if (!trimmed) return;
    onSubmit(trimmed);
    setText("");
  };

  return (
    <View className="mt-2 gap-1.5">
      {replyingTo && (
        <View className="flex-row items-center gap-2">
          <ThemedText className="!text-muted text-[12px]">
            Replying to{" "}
            <ThemedText className="!text-primary text-[12px] font-medium">
              {replyingTo}
            </ThemedText>
          </ThemedText>
          <Pressable onPress={onCancelReply} hitSlop={8}>
            <Ionicons name="close-circle" size={14} className="text-muted" />
          </Pressable>
        </View>
      )}
      <View className="flex-row items-center gap-2 rounded-xl bg-icon-bg px-3 py-2">
        <TextInput
          ref={inputRef}
          value={text}
          onChangeText={setText}
          placeholder={replyingTo ? "Write a reply..." : "Add a comment..."}
          placeholderTextColor="rgb(var(--color-placeholder))"
          className="flex-1 text-[14px] text-foreground"
          multiline
          maxLength={500}
        />
        <Pressable
          onPress={handleSubmit}
          disabled={!text.trim()}
          hitSlop={8}
          style={{ opacity: text.trim() ? 1 : 0.4 }}
        >
          <Ionicons name="send" size={18} className="text-primary" />
        </Pressable>
      </View>
    </View>
  );
}
