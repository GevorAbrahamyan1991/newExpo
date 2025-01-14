import { Button, ScrollView, StyleSheet, Text, View } from "react-native";
import useFetchData from "@/hooks/useFetchData";
import Card from "@/components/card";
import { Key } from "react";
import useStore from "@/stores/store";
import { Picker } from "@react-native-picker/picker";

export default function Diamonds() {
  const { shapeCode, setShapeCode } = useStore();
  const { isLoading, error, data } = useFetchData({
    url: `https://api-staging.wdpro.app/api/stones.json?company_id=2&page=1&sort_by=&sort_dir=&carats_max=&carats_min=&depth_max=&depth_min=&description=&price_max=&price_min=&stone_type=&table_max=&table_min=&clarity=&color=&cut=&fluorescence=&lab=&polish=&shape=${shapeCode}&symmetry=`,
  });

  const handleSelectShape = (code: string) => {
    setShapeCode(code);
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
            <View style={styles.container}>
              <Picker
                selectedValue={shapeCode}
                style={styles.picker}
                onValueChange={handleSelectShape}
              >
                <Picker.Item label="CU" value="CU" />
                <Picker.Item label="RD" value="RD" />
                <Picker.Item label="RA" value="RA" />
                <Picker.Item label="PR" value="PR" />
              </Picker>
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
  },
});
