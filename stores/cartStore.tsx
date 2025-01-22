import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface CartItem {
  images: [string];
  carats: number;
  shape_code: string;
  color_code: string;
  price_total: any;
  id: number; // ID is a number
}

interface CartStore {
  cart: CartItem[];
  addCart: (item: Omit<CartItem, "quantity"> & { quantity?: number }) => void;
  removeCart: (id: number) => void;
  removeAll: () => void;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      cart: [],

      addCart: ({
        id,
        carats,
        shape_code,
        color_code,
        price_total,
        images,
        quantity = 1,
      }) =>
        set((state) => ({
          cart: [
            ...state.cart,
            {
              id,
              carats,
              shape_code,
              color_code,
              price_total,
              images,
              quantity,
            },
          ],
        })),

      removeCart: (id) =>
        set((state) => {
          const cartIndex = state.cart.findIndex(
            (cartItem) => cartItem.id === id
          );
          if (cartIndex !== -1) {
            const newCart = [...state.cart];
            newCart.splice(cartIndex, 1);
            return { cart: newCart };
          }
          return state;
        }),

      removeAll: () => set({ cart: [] }),
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
