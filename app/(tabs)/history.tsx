import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useHistory } from "@/components/historyContext";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";

// URL ikon "save/bookmark" dari sumber publik
const SAVE_ICON_URL =
  "https://img.icons8.com/ios-filled/50/ffffff/bookmark-ribbon.png";

const Save = () => {
  const { history } = useHistory();
  const router = useRouter();

  return (
    <LinearGradient
      colors={["#0f0c29", "#302b63", "#24243e"]}
      className="flex-1 px-5 pt-10"
    >
      <SafeAreaView className="flex-1">
        <Text className="text-white text-3xl font-bold mb-6">
          🎬 Watch History
        </Text>

        {history.length === 0 ? (
          <View className="flex-1 justify-center items-center">
            <Image
              source={{ uri: SAVE_ICON_URL }}
              className="w-14 h-14 mb-4 opacity-80"
              style={{ tintColor: "#aaa" }}
            />
            <Text className="text-neutral-300 text-lg text-center px-6">
              You haven't watched any trailers yet.
            </Text>
          </View>
        ) : (
          <FlatList
            data={history}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                className="flex-row items-center bg-white/5 p-3 rounded-2xl mb-4 shadow-sm"
                onPress={() => router.push(`/movies/${item.id}`)}
              >
                <Image
                  source={{
                    uri: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
                  }}
                  className="w-16 h-24 rounded-lg mr-4"
                />
                <View className="flex-1">
                  <Text
                    className="text-white font-semibold text-base mb-1"
                    numberOfLines={2}
                  >
                    {item.title}
                  </Text>
                  <Text className="text-neutral-400 text-sm">
                    {item.release_date?.split("-")[0]} • {item.runtime} mins
                  </Text>
                </View>
              </TouchableOpacity>
            )}
            contentContainerStyle={{ paddingBottom: 50 }}
          />
        )}
      </SafeAreaView>
    </LinearGradient>
  );
};

export default Save;
