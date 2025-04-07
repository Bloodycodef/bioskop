import React from "react";
import { View, Text, TouchableOpacity, Platform, Linking } from "react-native";
import { WebView } from "react-native-webview";

type Props = {
  trailerKey: string;
};

const MovieTrailer = ({ trailerKey }: Props) => {
  if (Platform.OS === "web") {
    return (
      <View style={{ height: 300, width: "100%", backgroundColor: "#000" }}>
        <Text className="text-white text-center mt-4">
          YouTube trailer tidak bisa diputar langsung di Web.
        </Text>
        <TouchableOpacity
          onPress={() =>
            Linking.openURL(`https://www.youtube.com/watch?v=${trailerKey}`)
          }
        >
          <Text className="text-accent text-center mt-2 underline">
            Tonton di YouTube
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <WebView
      style={{ height: 300, width: "100%" }}
      javaScriptEnabled
      domStorageEnabled
      source={{ uri: `https://www.youtube.com/embed/${trailerKey}` }}
      allowsFullscreenVideo
    />
  );
};

export default MovieTrailer;
