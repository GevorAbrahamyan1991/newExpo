import { create } from "zustand";

const initialFilters = {
  company_id: "2",
  page: "1",
  sort_by: "",
  sort_dir: "",
  carats_max: "",
  carats_min: "",
  depth_max: "",
  depth_min: "",
  description: "",
  price_max: "",
  price_min: "",
  stone_type: "",
  table_max: "",
  table_min: "",
  clarity: "",
  color: "",
  cut: "",
  fluorescence: "",
  lab: "",
  polish: "",
  shape: "",
  symmetry: "",
};

const useStore = create((set) => ({
  filters: { ...initialFilters },
  setFilter: (key, value) =>
    set((state) => ({
      filters: {
        ...state.filters,
        [key]: value,
      },
    })),
  resetFilters: () =>
    set(() => ({
      filters: { ...initialFilters },
    })),
}));

export default useStore;
