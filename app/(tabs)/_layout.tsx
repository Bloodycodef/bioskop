import { Tabs } from "expo-router";
import { View, Platform } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

function TabIcon({
  focused,
  iconName,
}: {
  focused: boolean;
  iconName: React.ComponentProps<typeof FontAwesome>["name"];
}) {
  return (
    <View style={{ alignItems: "center", justifyContent: "center" }}>
      <FontAwesome
        name={iconName}
        size={24}
        color={focused ? "#FFD700" : "#A8B5DB"}
      />
    </View>
  );
}

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarItemStyle: {
          justifyContent: "center",
          alignItems: "center",
        },
        tabBarStyle: {
          backgroundColor: "#0F0D23",
          height: Platform.OS === "ios" ? 90 : 70,
          paddingBottom: Platform.OS === "ios" ? 20 : 10,
          borderTopWidth: 1,
          borderColor: "#1C1A36",
          elevation: 10,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.2,
          shadowRadius: 6,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} iconName="home" />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} iconName="search" />
          ),
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} iconName="history" />
          ),
        }}
      />
    </Tabs>
  );
}
