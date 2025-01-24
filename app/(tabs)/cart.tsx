import { Image, Text, View, ScrollView, TouchableOpacity } from "react-native";

import { useCartStore } from "@/stores/cartStore";
import { useEffect, useState } from "react";
import { Button } from "react-native";
import { Link } from "expo-router";

export default function Cart() {
  const cart = useCartStore((state) => state.cart);
  const { removeCart } = useCartStore();
  const [totalPrice, setTotalPrice] = useState(0);
  const { removeAll } = useCartStore();

  const handleRemoveToCart = (item) => {
    removeCart(item.id);
  };
  const handleRemoveAll = () => {
    removeAll();
  };

  useEffect(() => {
    const total = cart.reduce((sum, item) => sum + Number(item.price_total), 0);
    setTotalPrice(total);
  }, [cart]);

  return (
    <ScrollView>
      <View className="px-6">
        <View className="my-12">
          <Text className="text-white text-center font-bold py-2 text-3xl italic">
            {cart.length > 0 ? "Your Cart" : "Your Cart is Empty"}
          </Text>
          {cart.length > 0 && (
            <Button onPress={() => handleRemoveAll()} title="Remove All" />
          )}
        </View>
        <View>
          {cart.length > 0 &&
            cart.map((item, index) => {
              return (
                <View
                  key={index}
                  className="flex flex-row justify-between items-center my-4"
                >
                  <View className="">
                    <Image
                      source={{
                        uri: item.images?.[0],
                      }}
                      className="h-24 w-24 !max-w-[80%] border-2 border-white"
                      alt="Image Not Found"
                    />
                  </View>
                  <View>
                    <Text className=" text-white font-normal">
                      {item.carats} {item.shape_code} {item.color_code}
                    </Text>
                    <Text className="text-white font-bold text-xl">
                      $ {item.price_total}
                    </Text>
                  </View>
                  <Button
                    title="Remove"
                    onPress={() => handleRemoveToCart(item)}
                  />
                </View>
              );
            })}
        </View>
      </View>
      {cart.length > 0 && (
        <View className="mt-8 pt-8 items-end">
          <View className="w-full max-w-lg px-4">
            <View className="flex-row justify-between mb-2">
              <Text className="text-lg font-medium text-gray-400">
                Subtotal
              </Text>
              <Text className="text-lg font-medium text-gray-400">
                {totalPrice}
              </Text>
            </View>

            <Link
              href="/checkout"
              className="bg-white text-black p-2 text-center font-bold"
            >
              Checkout
            </Link>
          </View>
        </View>
      )}
    </ScrollView>
  );
}
