import Card from "@/components/card";
import useFetchData from "@/hooks/useFetchData";
import { useLocalSearchParams } from "expo-router";
import { StyleSheet, Text, View, Image } from "react-native";

export default function ID() {
  const { id } = useLocalSearchParams();

  const { isLoading, error, data } = useFetchData({
    baseUrl: `https://api-staging.wdpro.app/api/stones/${id}.json`,
  });

  return (
    <View>
      {isLoading ? (
        <Text>Loading...</Text>
      ) : (
        <View>
          <View>
            <Text className="text-center text-white font-normal py-4">
              {data.carats} Carat {data.shape_code} Diamond {data.color_code}{" "}
              Color {data.id}
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
      )}
    </View>
  );
}
