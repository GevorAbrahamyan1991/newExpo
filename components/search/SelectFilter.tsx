import { StyleSheet, View } from "react-native";
import { Picker } from "@react-native-picker/picker";
import useFetchData from "@/hooks/useFetchData";
import useStore from "@/stores/store";

interface Props {
  filter: string;
}

export default function SelectFilter({ filter }: Props) {
  const { filters, setFilter, resetFilters } = useStore();
  const { isLoading, error, data } = useFetchData({
    baseUrl:
      "https://api-staging.wdpro.app/api/companies/2/stone-properties.json",
  });

  return (
    <View style={styles.container}>
      <Picker
        selectedValue={filters[filter]}
        style={styles.picker}
        onValueChange={(value) => {
          setFilter(filter, value);
        }}
      >
        <Picker.Item label="Shape" value="" />;
        {data?.[filter] &&
          data[filter].map((item: string, index: number) => {
            return <Picker.Item key={index} label={item} value={item} />;
          })}
      </Picker>
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
