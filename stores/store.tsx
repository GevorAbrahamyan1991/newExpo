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

interface Store {
  filters: typeof initialFilters;
  setFilter: (key: keyof typeof initialFilters, value: string) => void;
  setFilters: (newFilters: Partial<typeof initialFilters>) => void;
  resetFilters: () => void;
}

const useStore = create<Store>((set) => ({
  filters: { ...initialFilters },
  setFilter: (key: keyof typeof initialFilters, value: string) =>
    set((state: any) => ({
      filters: {
        ...state.filters,
        [key]: value,
      },
    })),
  setFilters: (newFilters: Partial<typeof initialFilters>) =>
    set((state: any) => ({
      filters: {
        ...state.filters,
        ...newFilters,
      },
    })),
  resetFilters: () =>
    set(() => ({
      filters: { ...initialFilters },
    })),
}));

export default useStore;
