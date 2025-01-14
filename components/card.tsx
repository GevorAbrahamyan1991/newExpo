import { StyleSheet, Text, View, Image } from "react-native";

interface CardData {
  images: [string];
  carats: number;
  shape_code: string;
  color_code: string;
  price_total: any;
}

type Props = {
  data: CardData;
};

export default function Card({ data }: Props) {
  return (
    <View>
      <View>
        <Text className="text-center text-white font-normal py-4">
          {data.carats} Carat {data.shape_code} Diamond {data.color_code} Color
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
    </View>
  );
}

// const styles = StyleSheet.create({
//   img: {
//     width: 300,
//     height: 300,
//   },
// });
