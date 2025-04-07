import { Stack } from "expo-router";
import "./globals.css";
import { HistoryProvider } from "@/components/historyContext";

export default function RootLayout() {
  return (
    <HistoryProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="movies/[id]" options={{ headerShown: false }} />
      </Stack>
    </HistoryProvider>
  );
}
