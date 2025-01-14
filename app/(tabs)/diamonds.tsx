import { Button, ScrollView, StyleSheet, Text, View } from "react-native";
import useFetchData from "@/hooks/useFetchData";
import Card from "@/components/card";
import { Key } from "react";
import useStore from "@/stores/store";
import { Picker } from "@react-native-picker/picker";

export default function Diamonds() {
  const { filters, setFilter, resetFilters } = useStore();
  const { isLoading, error, data } = useFetchData({
    baseUrl: "https://api-staging.wdpro.app/api/stones.json",
  });
  console.log(data);
  return (
    <View>
      {isLoading ? (
        <Text className="text-white">Loading</Text>
      ) : (
        <ScrollView>
          <View className="">
            <Text className="bg-slate-800 py-8 text-white text-center text-3xl">
              Diamonds
            </Text>
            <View style={styles.container}>
              <Picker
                selectedValue={filters.shape || ""}
                style={styles.picker}
                onValueChange={(value) => setFilter("shape", value)}
              >
                <Picker.Item label="CU" value="CU" />
                <Picker.Item label="RD" value="RD" />
                <Picker.Item label="RA" value="RA" />
                <Picker.Item label="PR" value="PR" />
              </Picker>
              <Picker
                selectedValue={filters.color || ""}
                style={styles.picker}
                onValueChange={(value) => setFilter("color", value)}
              >
                <Picker.Item label="K" value="K" />
                <Picker.Item label="F" value="F" />
              </Picker>
              <Button title="Reset Filters" onPress={resetFilters} />
            </View>
            <View className="grid grid-cols-1 py-12">
              {data.data.map((item: object, index: Key | null | undefined) => {
                return <Card data={data && item} key={index} />;
              })}
            </View>
          </View>
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
  },
  picker: {
    height: 50,
    width: 150,
    backgroundColor: "#e2e8f0",
    color: "black",
    marginTop: 10,
    marginBottom: 10,
  },
});
