import {
  View,
  TextInput,
  Image,
  TextInputSubmitEditingEventData,
  NativeSyntheticEvent,
} from "react-native";

// Ganti ikon lokal dengan URL ikon publik
const SEARCH_ICON_URL =
  "https://img.icons8.com/ios-filled/50/ab8bff/search--v1.png";

interface Props {
  placeholder: string;
  value?: string;
  onChangeText?: (text: string) => void;
  onPress?: () => void;
  onSubmitEditing?: (
    e: NativeSyntheticEvent<TextInputSubmitEditingEventData>
  ) => void;
}

const SearchBar = ({
  placeholder,
  value,
  onChangeText,
  onPress,
  onSubmitEditing,
}: Props) => {
  return (
    <View className="flex-row items-center bg-dark-200 rounded-full px-5 py-4">
      <Image
        source={{ uri: SEARCH_ICON_URL }}
        className="w-5 h-5"
        resizeMode="contain"
        style={{ tintColor: "#AB8BFF" }} // tint untuk warna ikon
      />
      <TextInput
        onPress={onPress}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        onSubmitEditing={onSubmitEditing}
        className="flex-1 ml-2 text-white"
        placeholderTextColor="#A8B5DB"
        returnKeyType="search"
      />
    </View>
  );
};

export default SearchBar;
