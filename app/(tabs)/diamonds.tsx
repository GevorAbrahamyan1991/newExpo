import { Button, ScrollView, StyleSheet, Text, View } from "react-native";
import useFetchData from "@/hooks/useFetchData";
import Card from "@/components/card";
import { Key, useState } from "react";
import useStore from "@/stores/store";
import { Picker } from "@react-native-picker/picker";
import SelectFilter from "@/components/search/SelectFilter";
import { Button as PaperButton, Headline } from "react-native-paper";
import { PaperSelect } from "react-native-paper-select";
import MultiSelect from "@/components/search/MultiSelect";

export const selectValidator = (value: any) => {
  if (!value || value.length <= 0) {
    return "Please select a value.";
  }

  return "";
};

export default function Diamonds() {
  const { filters, setFilter, resetFilters } = useStore();
  const { isLoading, error, data } = useFetchData({
    baseUrl: "https://api-staging.wdpro.app/api/stones.json",
  });

  const [gender, setGender] = useState({
    value: "",
    list: [
      { _id: "1", value: "MALE" },
      { _id: "2", value: "FEMALE" },
      { _id: "3", value: "OTHERS" },
    ],
    selectedList: [],
    error: "",
  });
  const [colorFilter, setColorFilter] = useState({
    value: filters.shape || "",
    list: [
      { _id: "1", value: "AS" },
      { _id: "2", value: "CU" },
      { _id: "3", value: "EC" },
      { _id: "4", value: "HS" },
      { _id: "5", value: "MQ" },
      { _id: "6", value: "OV" },
      { _id: "7", value: "PR" },
      { _id: "8", value: "PS" },
      { _id: "9", value: "RA" },
      { _id: "10", value: "RD" },
      { _id: "11", value: "TR" },
    ],
    selectedList: [],
    error: "",
  });

  const handleColorSelection = (value: any) => {
    setColorFilter({
      ...colorFilter,
      value: value.text,
      selectedList: value.selectedList,
      error: "",
    });
    setFilter("shape", value.text);
  };
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
            <MultiSelect filter="color" multiple={true} />
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
