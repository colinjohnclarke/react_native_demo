import { View, Text, FlatList, RefreshControl } from "react-native";
import React, { useState, useEffect } from "react";
import { useGlobalContext } from "@/context/globalProvider";
import images from "@/constants/images";
import { SafeAreaView } from "react-native";
import { Image } from "react-native";
import Trending from "../components/Trending";
import SearchInput from "../components/SearchInput";
import { Alert } from "react-native";
import { getAllPosts, getLatestPosts } from "@/lib/appwrite";
import useAppwrite from "../../lib/useAppWrite";
import VideoCard from "../components/VideoCard";
import EmptyState from "../components/EmptyState";

const Home = () => {
  const [refreshing, setRefreshing] = useState(false);
  const { user } = useGlobalContext();

  const { data: posts, refetch } = useAppwrite(getAllPosts);
  const { latestPosts } = useAppwrite(getLatestPosts);

  // const posts = [];
  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  return (
    <SafeAreaView className="bg-primary h-full  ">
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => <VideoCard video={item} />}
        ListHeaderComponent={() => (
          <View>
            <View className="my-6 px-4 space-y-6 border-red">
              <View className="flex-row justify-between ">
                <Text className="font-pmedium text-sm text-white">
                  Welcome ,{user?.username}
                </Text>
                <Text className="text-2xl font-psemibold text-white">
                  Colin
                </Text>
                <View className="justify-between items-start flex-row mb-2">
                  <Image
                    source={images.logoSmall}
                    className="w-9 h-10 "
                    resizeMode="contain"
                  />
                </View>
              </View>
            </View>
            <SearchInput />
            <View className="w-full flex-1 pt-5 pb-8">
              <Text className="text-grey-100 font-pregular text-white text-lg mb-3 mt-5">
                Latest Videos
              </Text>
              <Trending posts={posts ?? []} />
            </View>
          </View>
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={() => (
          <EmptyState
            title="No Videos Found"
            subtitle="Be the first one to upload a video"
          ></EmptyState>
        )}
      ></FlatList>
    </SafeAreaView>
  );
};

export default Home;
