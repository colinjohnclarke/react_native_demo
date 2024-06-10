import React, { useState } from "react";
import { View, Text, Image } from "react-native";
import icons from "@/constants/icons";
import { TouchableOpacity } from "react-native";
import { ResizeMode, Video } from "expo-av";

function VideoCard({
  video: {
    title,
    thumbnail,
    video,
    creator: { avatar, username },
  },
}) {
  const [play, setPlay] = useState();

  return (
    <View className="flex-col items-center px-4 mb-14">
      <View className="flex-row gap-3 items-start">
        <View className="w-[46px] h-[46px] rounded-lg border border-secondary items-center p-0.5">
          <Image
            source={{ uri: avatar }}
            resizeMode="cover"
            className="w-full h-full rounded-lg"
          />
        </View>
        <View className="justify-center flex-1 ml-3 gap-y-1">
          <Text numberOfLines={1} className="text-white font-psemibold text-sm">
            {title}
          </Text>
          <Text className="text-xs text-white ">{username}</Text>
        </View>
        <View className="pt-2">
          <Image
            source={icons.menu}
            className="w-5 h-5"
            resizeMode="contain"
          ></Image>
        </View>
      </View>

      {play ? (
        <Video
          source={{ uri: video }}
          className="w-full h-60 rounded-xl mt-3"
          resizeMode={ResizeMode.CONTAIN}
          useNativeControls
          shouldPlay
          onPlaybackStatusUpdate={(status) => {
            if (status.didJustFinish) {
              setPlay(false);
            }
          }}
        />
      ) : (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => setPlay(true)}
          className="w-full h-60 rounded-xl  mt-3 relative justify-center items-center"
        >
          <Image
            className="w-full h-full mt-3 rounded-xl"
            resizeMode="cover"
            source={{ uri: thumbnail }}
          />
          <Image
            className="w-12 h-12 absolute"
            resizeMode="contain"
            source={icons.play}
          ></Image>
        </TouchableOpacity>
      )}
    </View>
  );
}

export default VideoCard;
