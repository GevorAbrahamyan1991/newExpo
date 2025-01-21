import { Button, ScrollView, StyleSheet, Text, View } from "react-native";
import useFetchData from "@/hooks/useFetchData";
import Card from "@/components/card";
import { Key } from "react";
import useStore from "@/stores/store";

import MultiSelect from "@/components/search/MultiSelect";

export const selectValidator = (value: any) => {
  if (!value || value.length <= 0) {
    return "Please select a value.";
  }

  return "";
};

export default function Diamonds() {
  const { resetFilters } = useStore();
  const { isLoading, error, data } = useFetchData({
    baseUrl: "https://api-staging.wdpro.app/api/stones.json",
  });

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

            <MultiSelect filter="shape" multiple={true} />
            <MultiSelect filter="color" multiple={false} />
            <View style={styles.container}>
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
