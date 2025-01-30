import { useCartStore } from "@/stores/cartStore";
import { router, useLocalSearchParams } from "expo-router";
import { Text } from "react-native";

export default function Result() {
  const { x } = useLocalSearchParams();
  return <Text className="text-white text-center text-2xl font-bold">{x}</Text>;
}
