import useFetchData from "@/hooks/useFetchData";
import useStore from "@/stores/store";
import { View } from "react-native";
import { PaperSelect } from "react-native-paper-select";

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
  return (
    <View>
      <PaperSelect
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
      />
    </View>
  );
}
