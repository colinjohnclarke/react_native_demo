import { Text, View } from "react-native";
import React from "react";
import { Link, Redirect, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native-gesture-handler";
import images from "../constants/images";
import { Image } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import CustomButton from "./components/CustomButton";
import { StatusBar } from "expo-status-bar";

const RootLayout = () => {
  return (
    <>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <SafeAreaView className="bg-primary h-full">
          <ScrollView contentContainerStyle={{ height: "100%" }}>
            <View className="w-full justify-center items-center max-h-[85vh] items-center px-4">
              <Image
                className="w-[130px] h-[84px]"
                source={images.logo}
                resizeMode="contain"
              />
              <Image
                className="max-w-[380px] w-full h-[300px]"
                resizeMode="contain"
                source={images.cards}
              />
            </View>

            <View className="relative mt-5">
              <Text className="text-3xl text-white font-bold text-center">
                {" "}
                Discover endless Possibilities with{" "}
                <Text className="text-secondary-200"> Aora</Text>
              </Text>

              <Image
                source={images.path}
                className="w-[136px] h-[15px] absolute -bottom-2 -right-8"
              ></Image>
            </View>

            <View>
              <Text className="text-sm font-pregular mt-7 text-center text-white p-2">
                Where creativity meets innovation: embark on a journey of
                limitless exporation with Aora
              </Text>

              <CustomButton
                containerStyles="w-full mt-7"
                handlePress={() => {
                  router.push("./sign-in");
                }}
                title="Continue with Email"
              ></CustomButton>
            </View>
          </ScrollView>

          <StatusBar backgroundColor="#161622" style="light"></StatusBar>
        </SafeAreaView>
      </GestureHandlerRootView>
    </>
  );
};

export default RootLayout;
