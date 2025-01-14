import { create } from "zustand";

const useStore = create((set) => ({
  shapeCode: "",
  setShapeCode: (code) => set({ shapeCode: code }),
}));

export default useStore;
