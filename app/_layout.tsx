import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Link, Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import "react-native-reanimated";
import "../global.css";
import { PaperProvider } from "react-native-paper";

import { useColorScheme } from "@/hooks/useColorScheme";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useDimensions } from "@react-native-community/hooks";
import utilities from "../tailwind.json";
import { TailwindProvider } from "tailwind-rn";
import { Button, View } from "react-native";
import { Text } from "react-native";
import DrawerToggleButton from "expo-router/drawer";
import { StripeProvider } from "@stripe/stripe-react-native";
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [open, setOpen] = useState(false);

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
              {/* <Stack>
                <Stack.Screen
                  name="(tabs)"
                  options={{
                    headerShown: false,
                  }}
                />
                <Stack.Screen
                  name="(screens)"
                  options={{
                    headerShown: false,
                  }}
                />
                <Stack.Screen
                  name="result"
                  options={{
                    headerShown: false,
                  }}
                />
              </Stack> */}
              {/* <View
                className={` transition-all duration-300  overflow-hidden fixed left-0 top-0 h-screen bg-slate-800 z-50 ${
                  open ? "w-full" : "w-0"
                }`}
              >
                <Button
                  title="Close"
                  onPress={() => setOpen((prev) => !prev)}
                />

                <View className="mt-12">
                  <Link
                    href="/(tabs)/diamonds"
                    className="text-3xl text-white z-50"
                    onPress={() => setOpen((prev) => !prev)}
                  >
                    Home
                  </Link>
                </View>
              </View>
              <View className="absolute bottom-0 bg-red-500 h-12 w-full flex flex-row justify-between">
                <View>
                  <Button
                    title="menu"
                    onPress={() => setOpen((prev) => !prev)}
                  />
                </View>
                <View className="">
                  <Link
                    className="bg-black p-2 text-white"
                    href="/(tabs)/diamonds"
                  >
                    Diamonds
                  </Link>
                </View>
                <View className="flex flex-col justify-center items-center">
                  <Link className="bg-black p-2 text-white" href="/cart">
                    Cart
                  </Link>
                </View>
              </View> */}
            </StripeProvider>
          </PaperProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </TailwindProvider>
  );
}
