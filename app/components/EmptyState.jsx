import { View, Text } from "react-native";
import React from "react";
import images from "../../constants/images";
import { Image } from "react-native";
import CustomButton from "./CustomButton";
import { router } from "expo-router";

const EmptyState = ({ title, subtitle }) => {
  return (
    <View className="justify-center items-center">
      <Image
        className="w-[270px] h-[215px]"
        resizeMode="contain"
        source={images.empty}
      />
      <Text className="text-2xl font-psemibold text-white mt-2">{title}</Text>
      <Text className="font-pmedium text-sm text-white">{subtitle}</Text>
      <CustomButton
        title="Create Video"
        handlePress={() => router.push("./create")}
        containerStyles="w-full my-5"
      />
    </View>
  );
};

export default EmptyState;
