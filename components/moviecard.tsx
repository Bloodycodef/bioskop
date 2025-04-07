import { Link } from "expo-router";
import { Text, Image, TouchableOpacity, View } from "react-native";

const MovieCard = ({
  id,
  poster_path,
  title,
  vote_average,
  release_date,
}: Movie) => {
  const starCount = Math.round(vote_average / 2); // rating dari 10 jadi 5 bintang

  return (
    <Link href={`/movies/${id}`} asChild>
      <TouchableOpacity className="w-[30%] mb-6">
        <Image
          source={{
            uri: poster_path
              ? `https://image.tmdb.org/t/p/w500${poster_path}`
              : "https://placehold.co/600x400/1a1a1a/FFFFFF.png",
          }}
          className="w-full h-52 rounded-lg"
          resizeMode="cover"
        />

        <Text className="text-sm font-bold text-white mt-2" numberOfLines={1}>
          {title}
        </Text>

        {/* Stars dari URL eksternal */}
        <View className="flex-row items-center gap-x-1 mt-1">
          {[...Array(5)].map((_, index) => (
            <Image
              key={index}
              source={{
                uri:
                  index < starCount
                    ? "https://img.icons8.com/ios-filled/50/FFD700/star--v1.png" // bintang penuh
                    : "https://img.icons8.com/ios/50/FFFFFF/star--v1.png", // bintang kosong
              }}
              className="size-4"
              resizeMode="contain"
            />
          ))}
        </View>

        <View className="flex-row items-center justify-between mt-1">
          <Text className="text-xs text-light-300 font-medium">
            {release_date?.split("-")[0]}
          </Text>
          <Text className="text-xs font-medium text-light-300 uppercase">
            Movie
          </Text>
        </View>
      </TouchableOpacity>
    </Link>
  );
};

export default MovieCard;
