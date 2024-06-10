import { View, Text, SafeAreaView, FlatList, Image } from "react-native";
import React from "react";

import { getUserPosts } from "@/lib/appwrite";
import useAppWrite from "@/lib/useAppWrite";
import SearchInput from "../components/SearchInput";
import VideoCard from "../components/VideoCard";
import EmptyState from "../components/EmptyState";
import { useGlobalContext } from "@/context/globalProvider";
import { TouchableOpacity } from "react-native-gesture-handler";
import icons from "@/constants/icons";
import InfoBox from "../components/InfoBox";
import { router } from "expo-router";
import { signOut } from "@/lib/appwrite";

const Profile = () => {
  const { isLoggedIn, setisLoggedIn, user, setUser, setIsLoading, isLoading } =
    useGlobalContext();

  const { data: posts, refetch } = useAppWrite(() => getUserPosts(user.$id));

  const logout = async () => {
    await signOut();
    setUser(null);
    setisLoggedIn(false);
    router.replace("/sign-in");
  };

  return (
    <SafeAreaView className="bg-primary h-full  ">
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => <VideoCard video={item} />}
        ListHeaderComponent={() => (
          <View className="w-full justify-center items-center mt-6 mb-12 px-4">
            <TouchableOpacity
              className="w-full items=end mb-10"
              onPress={logout}
            >
              <Image resizeMode="contain" source={icons.logout}></Image>
            </TouchableOpacity>
            <View className="w-16 h-16 border border-secondary rounded-lg justify-center items-center">
              <Image
                className="h-[90%] w-[90%] rounded-lg"
                source={{ uri: user?.avatar }}
              />
            </View>
            <InfoBox
              titleStyles="text-lg"
              containerStyles="mt-5 mr"
              title={user?.username}
            />
            <View className="mt-5 flex-row items-center justify-center ">
              <InfoBox
                titleStyles="text-xl"
                containerStyles="mr-10"
                title={posts.length || 0}
                subtitle="Posts"
              />
              <InfoBox
                title="1.2k"
                titleStyles="text-xl"
                subtitle="Followers"
                containerStyles="text-xl"
              ></InfoBox>
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Videos Found"
            subtitle="No videoes found for this search"
          ></EmptyState>
        )}
      ></FlatList>
    </SafeAreaView>
  );
};

export default Profile;
