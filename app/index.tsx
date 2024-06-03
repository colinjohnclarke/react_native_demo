import { Text, View } from "react-native";
import React from "react";
import { Link } from "expo-router";

const RootLayout = () => {
  return (
    <View className="flex-1 items-center justify-center bg-red">
      <Text className="text-5xl font-pblack">hello</Text>
      <Link href="/profile"> Go to profile</Link>
    </View>
  );
};

export default RootLayout;
