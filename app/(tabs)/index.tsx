import {
  ActivityIndicator,
  FlatList,
  Text,
  View,
  SafeAreaView,
} from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";

import useFetch from "@/services/useFetch";
import { fetchMovies, fetchTrendingMovies } from "@/services/api";

import MovieCard from "@/components/moviecard";
import TrendingCard from "@/components/trendingcard";

export default function Index() {
  const {
    data: trendingMovies,
    loading: trendingLoading,
    error: trendingError,
  } = useFetch(fetchTrendingMovies);

  const {
    data: movies,
    loading: moviesLoading,
    error: moviesError,
  } = useFetch(() => fetchMovies({ query: "" }));

  const isLoading = trendingLoading || moviesLoading;
  const isError = trendingError || moviesError;

  return (
    <LinearGradient
      colors={["#1a1a2e", "#16213e", "#0f3460"]}
      style={{ flex: 1 }}
    >
      <SafeAreaView style={{ flex: 1 }}>
        {isLoading && (
          <ActivityIndicator
            size="large"
            color="#FFD700"
            style={{ marginTop: 20 }}
          />
        )}

        {isError && (
          <Text
            style={{ color: "white", marginTop: 10, paddingHorizontal: 16 }}
          >
            Error: {moviesError?.message || trendingError?.message}
          </Text>
        )}

        {!isLoading && !isError && (
          <FlatList
            data={movies}
            keyExtractor={(item, index) =>
              item.id?.toString() ?? index.toString()
            }
            renderItem={({ item }) => <MovieCard {...item} />}
            numColumns={3}
            columnWrapperStyle={{
              justifyContent: "flex-start",
              gap: 20,
              paddingHorizontal: 16,
              marginBottom: 10,
            }}
            contentContainerStyle={{ paddingBottom: 100 }}
            ListHeaderComponent={
              <View style={{ marginTop: 10 }}>
                <Text
                  style={{
                    color: "white",
                    fontSize: 18,
                    fontWeight: "bold",
                    marginLeft: 16,
                    marginBottom: 10,
                  }}
                >
                  Trending Movies
                </Text>
                <FlatList
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  data={trendingMovies}
                  contentContainerStyle={{ gap: 26, paddingHorizontal: 16 }}
                  renderItem={({ item, index }) => (
                    <TrendingCard movie={item} index={index} />
                  )}
                  keyExtractor={(item, index) =>
                    item.id ? item.id.toString() : index.toString()
                  }
                />

                <Text
                  style={{
                    color: "white",
                    fontSize: 18,
                    fontWeight: "bold",
                    marginTop: 24,
                    marginLeft: 16,
                    marginBottom: 10,
                  }}
                >
                  Latest Movies
                </Text>
              </View>
            }
          />
        )}
      </SafeAreaView>
    </LinearGradient>
  );
}
