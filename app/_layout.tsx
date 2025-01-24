import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";
import "../global.css";
import { PaperProvider } from "react-native-paper";

import { useColorScheme } from "@/hooks/useColorScheme";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useDimensions } from "@react-native-community/hooks";
import utilities from "../tailwind.json";
import { TailwindProvider } from "tailwind-rn";
import { Button } from "react-native";
import { Text } from "react-native";
import DrawerToggleButton from "expo-router/drawer";
import { StripeProvider } from "@stripe/stripe-react-native";
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const queryClient = new QueryClient();
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <TailwindProvider utilities={utilities}>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <QueryClientProvider client={queryClient}>
          <PaperProvider>
            <StripeProvider publishableKey="pk_test_51QWyKtPCdJTxXoX1534gMXoqZftWDGikQKAcvSwp4Pd7JHX6N3LdKAQvUs0eabz288uZhpKjBZpgkn9Q2efzIgeH00AqxYDd9d">
              <DrawerToggleButton />
            </StripeProvider>
            {/* <Stack>
              <Stack.Screen
                name="(tabs)"
                options={{
                  headerShown: false,
                }}
              />
            </Stack> */}
          </PaperProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </TailwindProvider>
  );
}
