import { View, Text, TouchableOpacity, Alert } from "react-native";
import React, { useState } from "react";
import { TextInput } from "react-native-gesture-handler";
import images from "@/constants/images";
import { Image } from "react-native";
import icons from "@/constants/icons";
import CustomButton from "./CustomButton";
import { usePathname } from "expo-router";
import { router } from "expo-router";

const SearchInput = ({ initialQuery }) => {
  const pathName = usePathname();

  const [query, setQuery] = useState(initialQuery || "");

  return (
    <View className="border-2 border-black-200 h-16 px-4 bg-black rounded-2xl focus:border-secondary items-center flex-row">
      <TextInput
        className="mt-0.5  text-white flex-1 text-base "
        value={query}
        placeholder="Search for a video topic"
        placeholderTextColor="#CDCDE0"
        onChangeText={(e) => setQuery(e)}
        // secureTextEntry={title === "Password" && !showPassword}
      />

      <TouchableOpacity
        onPress={() => {
          if (!query) {
            return Alert.alert("Missing qery", "Please input search");
          }

          if (pathName.startsWith("./search")) {
            router.setParams({ query });
            setParams({ query });
          } else router.push(`/search/${query}`);
        }}
      >
        <Image className="w-5 h-5" resizeMode="contain" source={icons.search} />
      </TouchableOpacity>
    </View>
  );
};

export default SearchInput;
