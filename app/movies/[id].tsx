import {
  View,
  Text,
  Image,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";

import useFetch from "@/services/useFetch";
import { fetchMovieDetails } from "@/services/api";
import MovieTrailer from "@/components/MovieTrailer";
import { useHistory } from "@/components/historyContext";
import { LinearGradient } from "expo-linear-gradient";

interface MovieInfoProps {
  label: string;
  value?: string | number | null;
}

const MovieInfo = ({ label, value }: MovieInfoProps) => (
  <View className="flex-col items-start justify-center mt-5">
    <Text className="text-light-200 font-normal text-sm">{label}</Text>
    <Text className="text-light-100 font-bold text-sm mt-2">
      {value || "N/A"}
    </Text>
  </View>
);

const Details = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const [isPlaying, setIsPlaying] = useState(false);
  const { addToHistory } = useHistory();

  const { data: movie, loading } = useFetch(() =>
    fetchMovieDetails(id as string)
  );

  const trailerKey =
    movie?.videos?.results?.find(
      (video) => video.type === "Trailer" && video.site === "YouTube"
    )?.key || null;

  if (loading) {
    return (
      <SafeAreaView className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#fff" />
      </SafeAreaView>
    );
  }

  if (!movie?.id) {
    return (
      <SafeAreaView className="flex-1 justify-center items-center">
        <Text className="text-white">Movie data not available.</Text>
      </SafeAreaView>
    );
  }

  return (
    <LinearGradient
      colors={["#1a1a2e", "#16213e", "#0f3460"]}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
        <View>
          {!isPlaying ? (
            <>
              <Image
                source={{
                  uri: `https://image.tmdb.org/t/p/w500${
                    movie.poster_path ?? ""
                  }`,
                }}
                className="w-full h-[550px] rounded-b-3xl"
                resizeMode="cover"
              />

              <TouchableOpacity
                className="absolute bottom-6 right-6 rounded-full size-14 bg-white/80 flex items-center justify-center shadow-lg"
                onPress={() => {
                  setIsPlaying(true);
                  addToHistory({
                    id: movie.id,
                    title: movie.title ?? "No Title",
                    poster_path: movie.poster_path ?? "",
                    backdrop_path: movie.backdrop_path ?? "",
                    overview: movie.overview ?? "No overview available.",
                    release_date: movie.release_date ?? "",
                    vote_average: movie.vote_average ?? 0,
                    vote_count: movie.vote_count ?? 0,
                    popularity: movie.popularity ?? 0,
                    original_language: movie.original_language ?? "N/A",
                    genre_ids: [],
                    video: movie.video ?? false,
                    adult: movie.adult ?? false,
                  });
                }}
              >
                <Text style={{ fontSize: 24 }}>▶️</Text>
              </TouchableOpacity>
            </>
          ) : trailerKey ? (
            <MovieTrailer trailerKey={trailerKey} />
          ) : (
            <Text className="text-white text-center mt-4">
              Trailer tidak tersedia.
            </Text>
          )}
        </View>

        <View className="px-5 mt-6">
          <Text className="text-white font-bold text-2xl">{movie.title}</Text>

          <View className="flex-row items-center gap-x-2 mt-2">
            <Text className="text-light-200 text-sm">
              {movie.release_date?.split("-")[0] ?? "N/A"}
            </Text>
            <Text className="text-light-200 text-sm">•</Text>
            <Text className="text-light-200 text-sm">{movie.runtime} min</Text>
          </View>

          <View className="flex-row items-center bg-dark-100 px-3 py-1 rounded-lg gap-x-2 mt-3">
            <Text className="text-lg">⭐</Text>
            <Text className="text-white font-bold text-sm">
              {Math.round(movie.vote_average ?? 0)}/10
            </Text>
            <Text className="text-light-200 text-xs">
              ({movie.vote_count ?? 0} votes)
            </Text>
          </View>

          <MovieInfo label="Overview" value={movie.overview} />
          <MovieInfo
            label="Genres"
            value={movie.genres?.map((g) => g.name).join(" • ")}
          />

          <View className="flex flex-row justify-between w-full mt-4 gap-6">
            <MovieInfo
              label="Budget"
              value={`$${(movie.budget ?? 0) / 1_000_000}M`}
            />
            <MovieInfo
              label="Revenue"
              value={`$${Math.round((movie.revenue ?? 0) / 1_000_000)}M`}
            />
          </View>

          <MovieInfo
            label="Production Companies"
            value={movie.production_companies?.map((c) => c.name).join(" • ")}
          />
        </View>
      </ScrollView>

      <TouchableOpacity
        className="absolute bottom-5 left-5 right-5 bg-accent rounded-xl py-4 flex flex-row items-center justify-center shadow-md"
        onPress={router.back}
      >
        <Text className="mr-2 rotate-180 text-white text-lg">⬅️</Text>
        <Text className="text-white font-semibold text-base">Go Back</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

export default Details;
