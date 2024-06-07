import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { TextInput } from "react-native-gesture-handler";
import images from "@/constants/images";
import { Image } from "react-native";
import icons from "@/constants/icons";
import CustomButton from "./CustomButton";

const SearchInput = ({
  title,
  value,
  placeholder,
  handleChangeText,
  otherStyles,
  keyboardType,
  secureTextEntry,
}) => {
  const [showPassword, setshowPassword] = useState(false);

  return (
    <View className="border-2 border-black-200 h-16 px-4 bg-black rounded-2xl focus:border-secondary items-center flex-row">
      <TextInput
        className="mt-0.5  text-white flex-1 text-base "
        value={value}
        placeholder="Search for a video topic"
        placeholderTextColor="#7b7b8b"
        onChangeText={handleChangeText}
        secureTextEntry={title === "Password" && !showPassword}
      />

      <TouchableOpacity>
        <Image className="w-5 h-5" resizeMode="contain" source={icons.search} />
      </TouchableOpacity>
    </View>
  );
};

export default SearchInput;
