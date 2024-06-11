import { View, Text, Image, TouchableOpacity, Alert } from "react-native";
import React, { useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import FormField from "../components/FormField";
import { Video, ResizeMode } from "expo-av";
import icons from "../../constants/icons";
import CustomButton from "../components/CustomButton";
import * as DocumentPicker from "expo-document-picker";
import * as ImagePicker from "expo-image-picker";

import { createVideo } from "../../lib/appwrite";
import { useGlobalContext } from "../../context/globalProvider";

const Create = () => {
  const { user } = useGlobalContext();

  const [form, setForm] = useState({
    title: "",
    video: null,
    thumbnail: null,
    prompt: "",
  });

  const [uploading, setUploading] = useState(false);

  const handleSubmit = async () => {
    if (!form.prompt || !form.title || form.thumbnail || !form.video) {
      return Alert.alert("Please fill in all fields");
    }
    setUploading(true);

    try {
      await createVideo({
        ...form,
        userId: user.$id,
      });

      Alert.alert("Success", "Post uploaded");
      router.push("./home");
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setForm({ title: "", video: null, thumbnail: null, prompt: "" });
    }
    setUploading(false);
  };

  const openPicker = async (selectType) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes:
        selectType === "image"
          ? ImagePicker.MediaTypeOptions.Images
          : ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      if (selectType === "image") {
        setForm({ ...form, thumbnail: result.assets[0] });
      }
      if (selectType === "video") {
        setForm({ ...form, video: result.assets[0] });
      }
    }
  };

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

          <TouchableOpacity onPress={() => openPicker("video")}>
            {form.video ? (
              <Video
                className="w-full h-64 rounded-2xl"
                source={{ uri: form.video.uri }}
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
          <TouchableOpacity onPress={() => openPicker("image")}>
            {form.thumbnail ? (
              <Video
                className="w-full h-64 rounded-2xl"
                source={{ uri: form.thumbnail.uri }}
                useNativeControls
                resizeMode={ResizeMode.COVER}
              />
            ) : (
              <View className="w-full h-16 px-4 bg-black-200  rounded-2xl items-center justify-center flex-row space-x-2">
                <Image
                  resizeMode="contain"
                  className="w-5 h-5"
                  source={icons.upload}
                />
                <Text className="text-sm text-white font-pmedium">
                  Choose a file
                </Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        <FormField
          title="AI prompt"
          value={form.promt}
          placeholder="The prompt you used to create this video"
          handleChangeText={(e) => setForm({ ...form, prompt: e })}
          otherStyles="mt-7"
        />

        <CustomButton
          onPress={handleSubmit}
          title="Submit and Publish"
          containerStyles="mt-7"
          isLoading={uploading}
        ></CustomButton>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Create;
