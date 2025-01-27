import { useCartStore } from "@/stores/cartStore";
import { Text } from "react-native";

export default function Result() {
  const removeAll = useCartStore.getState().removeAll;
  //   removeAll();
  return <Text className="text-white text-center text-2xl font-bold">Ok</Text>;
}
