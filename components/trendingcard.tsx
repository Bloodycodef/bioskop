import { Link } from "expo-router";
import { View, Text, TouchableOpacity, Image } from "react-native";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

const TrendingCard = ({
  movie,
  index,
}: {
  movie: {
    id: number;
    title: string;
    poster_path: string | null;
  };
  index: number;
}) => {
  return (
    <Link href={`/movies/${movie.id}`} asChild>
      <TouchableOpacity className="w-32 relative pl-5">
        <Image
          source={{
            uri: movie.poster_path
              ? `${IMAGE_BASE_URL}${movie.poster_path}`
              : "https://via.placeholder.com/120x180.png?text=No+Image",
          }}
          className="w-32 h-48 rounded-lg"
          resizeMode="cover"
        />

        {/* Number Badge */}
        <View
          className="absolute -left-3 bottom-9 w-10 h-10 rounded-full items-center justify-center"
          style={{
            backgroundColor: "#8B5CF6", // ungu, bisa diganti gradasi nanti
          }}
        >
          <Text className="text-white font-bold text-xl">{index + 1}</Text>
        </View>

        <Text
          className="text-sm font-bold mt-2 text-light-200"
          numberOfLines={2}
        >
          {movie.title}
        </Text>
      </TouchableOpacity>
    </Link>
  );
};

export default TrendingCard;
