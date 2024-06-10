import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import FormField from "../components/FormField";
import { Video, ResizeMode } from "expo-av";
import icons from "../../constants/icons";

const Create = () => {
  const [form, setForm] = useState({
    title: "",
    video: null,
    thumbnail: null,
    prompt: "",
  });

  const [uploading, setUploading] = useState(false);

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView className="px-4">
        <Text className="text-2xl text-white font-semibold">Upload Video</Text>

        <FormField
          title="Video Title"
          value={form.title}
          placeholder="Give your video a catchy title"
          handleChangeText={(e) => setForm({ ...form, title: e })}
          otherStyles="mt-10"
        />

        <View className="mt-7 space-y-2">
          <Text className="text-base text-white font-medium">Upload Video</Text>

          <TouchableOpacity>
            {form.video ? (
              <Video
                className="w-full h-64 rounded-2xl"
                source={{ uri: form.video.uri }}
                useNativeControls
                resizeMode={ResizeMode.COVER}
              />
            ) : (
              <View className="h-full h-40 px-4 bg-black-100 rounded-2xl flex justify-center items-center">
                <View className="w-14 h-14 border border-dashed border-secondary-100 flex justify-center items-center">
                  <Image
                    resizeMode="contain"
                    className="w-1/2 h-1/2"
                    source={icons.upload}
                  />
                </View>
              </View>
            )}
          </TouchableOpacity>
        </View>

        <View className="mt-7 space-y-2">
          <Text className="text-base text-white font-medium">
            Thumbnail Image
          </Text>
          <TouchableOpacity>
            {form.thumbnail ? (
              <Video
                className="w-full h-64 rounded-2xl"
                source={{ uri: form.video.uri }}
                useNativeControls
                resizeMode={ResizeMode.COVER}
              />
            ) : (
              <View className="h-full h-40 px-4 bg-black-100 rounded-2xl flex justify-center items-center">
                <View className="w-14 h-14 border border-dashed border-secondary-100 flex justify-center items-center">
                  <Image
                    resizeMode="contain"
                    className="w-1/2 h-1/2"
                    source={icons.upload}
                  />
                </View>
              </View>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Create;
