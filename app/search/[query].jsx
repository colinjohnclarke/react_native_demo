import { View, Text, SafeAreaView, FlatList } from "react-native";
import React, { useEffect } from "react";
import { useLocalSearchParams } from "expo-router";
import { searchPosts } from "@/lib/appwrite";
import useAppWrite from "@/lib/useAppWrite";
import SearchInput from "../components/SearchInput";
import VideoCard from "../components/VideoCard";
import EmptyState from "../components/EmptyState";

const Search = () => {
  const { query } = useLocalSearchParams();
  const { data: posts, refetch } = useAppWrite(() => searchPosts(query));

  useEffect(() => {
    refetch();
  }, [query]);

  return (
    <SafeAreaView className="bg-primary h-full  ">
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => <VideoCard video={item} />}
        ListHeaderComponent={() => (
          <View>
            <View className="my-6 px-4 ">
              <Text className="font-pmedium text-sm text-white">
                Search Results
              </Text>
              <Text className="text-2xl font-psemibold text-white">
                {query}
              </Text>
            </View>
            <View className=" mt-6 mb-8">
              <SearchInput initialQuery={query} />
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

export default Search;
