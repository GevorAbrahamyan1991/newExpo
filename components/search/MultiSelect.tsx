import useFetchData from "@/hooks/useFetchData";
import useStore from "@/stores/store";
import { StyleSheet, View } from "react-native";
import { PaperSelect } from "react-native-paper-select";
import { useTailwind } from "tailwind-rn";

interface Props {
  filter: string;
  multiple: boolean;
}

export default function MultiSelect({ filter, multiple }: Props) {
  const { filters, setFilter, resetFilters } = useStore();
  const { isLoading, error, data } = useFetchData({
    baseUrl:
      "https://api-staging.wdpro.app/api/companies/2/stone-properties.json",
  });

  const transformedArray =
    data?.[filter]?.map((item: string, index: number) => ({
      _id: index,
      value: item,
    })) || [];
  const selectedArrayList = Array.isArray(filters[filter])
    ? transformedArray.filter(({ value }) => filters[filter].includes(value))
    : [];
  const tailwind = useTailwind();

  // const styles = {
  //   paperSelect: tailwind("bg-red-900 w-24 opacity-50"),
  // };

  return (
    <View className="">
      <PaperSelect
        // dialogStyle={tailwind("w-64 bg-red-900")}
        // textInputStyle={tailwind("w-64 bg-red-900 margin-auto")}
        // theme={{ colors: { primary: "red", secondary: "green" } }}
        label={`Select ${filter}`}
        value={Array.isArray(filters[filter]) ? filters[filter].join(", ") : ""}
        onSelection={(value) => {
          const selectedValues = value.selectedList.map(
            (item: { value: string }) => item.value
          );
          setFilter(filter, selectedValues);
        }}
        arrayList={transformedArray}
        selectedArrayList={selectedArrayList}
        // errorText={colorFilter.error}
        multiEnable={multiple}
        textInputMode="flat"
        searchStyle={{ display: "none" }}
        // searchPlaceholder="Search Colors"
        dialogCloseButtonText="Close"
        dialogDoneButtonText="Search"
        // style={{ backgroundColor: "#ffffff" }}
        // labelStyle={{ color: "red", fontWeight: "bold" }} // Style for the label
        // inputStyle={{ padding: 160, borderColor: "gray", borderWidth: 1 }} // Style for the input
      />
    </View>
  );
}

// const styles = StyleSheet.create({
//   paperSelect: {
//     backgroundColor: "red",
//     // opacity: 0,
//   },
// });
