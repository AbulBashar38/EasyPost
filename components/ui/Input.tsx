import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
  TextInput,
  TouchableOpacity,
  View,
  type TextInput as TextInputType,
} from "react-native";

import { ThemedText } from "@/components/themed-text";

interface InputProps {
  icon: keyof typeof Ionicons.glyphMap;
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  onBlur?: () => void;
  error?: string;
  secureTextEntry?: boolean;
  showToggle?: boolean;
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
  keyboardType?: "default" | "email-address";
  returnKeyType?: "next" | "done";
  onSubmitEditing?: () => void;
  inputRef?: React.RefObject<TextInputType | null>;
}

export default function Input({
  icon,
  placeholder,
  value,
  onChangeText,
  onBlur,
  error,
  secureTextEntry: secureTextEntryProp,
  showToggle,
  autoCapitalize = "none",
  keyboardType = "default",
  returnKeyType = "next",
  onSubmitEditing,
  inputRef,
}: InputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [hideText, setHideText] = useState(true);

  const isSecure = showToggle ? hideText : secureTextEntryProp;

  return (
    <View className="mb-1">
      <View
        className={`flex-row items-center rounded-2xl px-4 border-2 h-[54px] ${
          error
            ? "bg-error-light border-error"
            : isFocused
              ? "bg-primary-faded/20 border-primary"
              : "bg-input-bg border-input-border"
        }`}
      >
        <View
          className={`mr-3 h-8 w-8 items-center justify-center rounded-lg ${
            error ? "bg-error/10" : isFocused ? "bg-primary/10" : "bg-icon-bg"
          }`}
        >
          <Ionicons
            name={icon}
            size={18}
            className={
              error
                ? "text-error"
                : isFocused
                  ? "text-primary"
                  : "text-placeholder"
            }
          />
        </View>
        <TextInput
          ref={inputRef}
          className="flex-1 text-base text-foreground"
          placeholder={placeholder}
          placeholderTextColor="rgb(var(--color-placeholder))"
          value={value}
          onChangeText={onChangeText}
          onBlur={() => {
            setIsFocused(false);
            onBlur?.();
          }}
          onFocus={() => setIsFocused(true)}
          secureTextEntry={isSecure}
          autoCapitalize={autoCapitalize}
          keyboardType={keyboardType}
          returnKeyType={returnKeyType}
          onSubmitEditing={onSubmitEditing}
        />
        {showToggle && (
          <TouchableOpacity onPress={() => setHideText(!hideText)} hitSlop={8}>
            <Ionicons
              name={hideText ? "eye-off-outline" : "eye-outline"}
              size={20}
              className="text-placeholder"
            />
          </TouchableOpacity>
        )}
      </View>
      {error && (
        <ThemedText className="text-error text-xs mt-1 ml-4">
          {error}
        </ThemedText>
      )}
    </View>
  );
}
