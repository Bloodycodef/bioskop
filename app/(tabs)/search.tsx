import { useState, useEffect } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams } from "expo-router";
import useFetch from "@/services/useFetch";
import { fetchMovies } from "@/services/api";

import SearchBar from "@/components/searchbar";
import MovieDisplayCard from "@/components/moviecard";
import { LinearGradient } from "expo-linear-gradient";

// Ganti icon search dengan URL publik
const SEARCH_ICON_URL =
  "https://img.icons8.com/ios-filled/50/ffffff/search--v1.png";

const Search = () => {
  const params = useLocalSearchParams();
  const queryFromURL = typeof params.query === "string" ? params.query : "";
  const [searchQuery, setSearchQuery] = useState(queryFromURL);

  const {
    data: movies = [],
    loading,
    error,
    refetch: loadMovies,
    reset,
  } = useFetch(() => fetchMovies({ query: searchQuery }), false);

  const handleSearch = (text: string) => {
    setSearchQuery(text);
  };

  useEffect(() => {
    if (queryFromURL && queryFromURL !== searchQuery) {
      setSearchQuery(queryFromURL);
    }
  }, [queryFromURL]);

  useEffect(() => {
    const timeoutId = setTimeout(async () => {
      if (searchQuery.trim()) {
        await loadMovies();
      } else {
        reset();
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  return (
    <LinearGradient
      colors={["#0f0c29", "#302b63", "#24243e"]}
      className="flex-1"
    >
      <SafeAreaView className="flex-1">
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          className="flex-1"
        >
          {/* Search Bar */}
          <View className="px-5 pt-5 pb-3">
            <SearchBar
              placeholder="Search for a movie..."
              value={searchQuery}
              onChangeText={handleSearch}
            />
          </View>

          {/* Movie List */}
          <FlatList
            className="px-5"
            data={movies}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <MovieDisplayCard {...item} />}
            numColumns={3}
            columnWrapperStyle={{
              justifyContent: "flex-start",
              gap: 16,
              marginVertical: 16,
            }}
            contentContainerStyle={{ paddingBottom: 100, paddingTop: 10 }}
            ListHeaderComponent={
              <>
                {loading && (
                  <ActivityIndicator
                    size="large"
                    color="#fff"
                    className="my-4"
                  />
                )}

                {error && (
                  <Text className="text-red-500 my-3">
                    Error: {error.message}
                  </Text>
                )}

                {!loading &&
                  !error &&
                  searchQuery.trim() &&
                  movies?.length! > 0 && (
                    <Text className="text-xl text-white font-bold mb-2">
                      Showing results for{" "}
                      <Text className="text-accent">{searchQuery}</Text>
                    </Text>
                  )}
              </>
            }
            ListEmptyComponent={
              !loading && !error ? (
                <View className="mt-16 items-center">
                  <Image
                    source={{ uri: SEARCH_ICON_URL }}
                    className="w-12 h-12 mb-4 opacity-80"
                    style={{ tintColor: "#aaa" }}
                  />
                  <Text className="text-center text-gray-400 text-base px-6">
                    {searchQuery.trim()
                      ? "No movies found for your search."
                      : "Start typing to search for movies."}
                  </Text>
                </View>
              ) : null
            }
          />
        </KeyboardAvoidingView>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default Search;
