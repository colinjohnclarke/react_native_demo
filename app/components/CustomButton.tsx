import { View, Text } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native";

interface CustomButtonProps {
  title: string;
  containerStyles?: string;
  handlePress: () => void;
  textStyles?: string;
  isLoading?: boolean;
}

export default function CustomButton({
  title,
  containerStyles,
  handlePress,
  textStyles,
  isLoading,
}: CustomButtonProps) {
  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.7}
      disabled={isLoading}
      className={`bg-secondary rounded-xl min-h-[62px] justify-center items-center ${containerStyles} ${
        isLoading ? "opacity-50" : ""
      } `}
    >
      <Text
        className={`text-primary font-psemibold text-grey-100 text-center ${textStyles} `}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}
