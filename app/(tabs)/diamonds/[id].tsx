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
    <View style={styles.container}>
      {isLoading ? (
        <Text style={styles.loadingText}>Loading...</Text>
      ) : error ? (
        <Text style={styles.errorText}>Error: {error.message}</Text>
      ) : (
        data && (
          <View>
            <View>
              <Text style={styles.diamondInfo}>
                {data.carats} Carat {data.shape_code} Diamond {data.color_code}{" "}
                Color {data.id}
              </Text>
            </View>
            <View style={styles.imageContainer}>
              <Image
                source={{
                  uri: data.images?.[0],
                }}
                style={styles.image}
                accessibilityLabel="Image Not Found"
              />
            </View>
            <View>
              <Text style={styles.priceText}>${data.price_total}</Text>
            </View>
          </View>
        )
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000", // Assuming a dark background
  },
  loadingText: {
    color: "#fff",
  },
  errorText: {
    color: "red",
  },
  diamondInfo: {
    textAlign: "center",
    color: "#fff",
    fontWeight: "normal",
    paddingVertical: 16,
  },
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  image: {
    height: 256, // Adjusted height
    width: "100%",
    maxWidth: "80%",
    borderWidth: 2,
    borderColor: "#fff",
  },
  priceText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
    paddingVertical: 16,
  },
});
