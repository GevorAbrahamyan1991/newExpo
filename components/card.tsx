import { useCartStore } from "@/stores/cartStore";
import { Link } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { Button } from "react-native-paper";
import { useTailwind } from "tailwind-rn";

interface CardData {
  images: [string];
  carats: number;
  shape_code: string;
  color_code: string;
  price_total: any;
  id: number;
  item: any;
}

type Props = {
  data: CardData;
};

export default function Card({ data }: Props) {
  const { addCart } = useCartStore();

  const [loadingItemId, setLoadingItemId] = useState(null);

  const handleAddToCart = async (item) => {
    setLoadingItemId(item.id);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    addCart(item);
    setLoadingItemId(null);
  };
  const tailwind = useTailwind();

  return (
    <View>
      <Link
        href={{
          pathname: "/(tabs)/diamonds/[id]",
          params: { id: data.id },
        }}
        className="block w-full"
      >
        <View>
          <Text className="text-center text-white font-normal py-4">
            {data.carats} Carat {data.shape_code} Diamond {data.color_code}{" "}
            Color
          </Text>
        </View>
        <View className="flex justify-center items-center w-full text-white">
          <Image
            source={{
              uri: data.images?.[0],
            }}
            className="h-64 w-full !max-w-[80%] border-2 border-white"
            alt="Image Not Found"
          />
        </View>
        <View>
          <Text className="text-white font-bold text-lg text-center py-4">
            ${data.price_total}
          </Text>
        </View>
      </Link>
      <View>
        <Button
          onPress={() => handleAddToCart(data)}
          style={tailwind("bg-red-900")}
          disabled={loadingItemId === data.id}
        >
          <Text>
            {loadingItemId === data.id ? "Processing..." : "Add to cart"}
          </Text>
        </Button>
      </View>
    </View>
  );
}

// const styles = StyleSheet.create({
//   img: {
//     width: 300,
//     height: 300,
//   },
// });
