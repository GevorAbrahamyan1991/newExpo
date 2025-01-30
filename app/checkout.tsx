import React, { useEffect, useState } from "react";
import { Button, Alert, ScrollView, Image, View, Text } from "react-native";
import {
  initPaymentSheet,
  presentPaymentSheet,
} from "@stripe/stripe-react-native";
import { useCartStore } from "@/stores/cartStore";
import { useNavigation } from "@react-navigation/native";
import { router } from "expo-router";

export default function Checkout() {
  const [paymentSheetEnabled, setPaymentSheetEnabled] = useState(false);
  const [paymentCompleted, setPaymentCompleted] = useState(false);
  const cart = useCartStore((state) => state.cart);
  const removeAll = useCartStore.getState().removeAll;
  const navigation = useNavigation();

  const [x, setX] = useState("");

  async function fetchPaymentSheetParams() {
    if (paymentCompleted) return;
    try {
      const totalAmount = cart.reduce(
        (total, item) => total + parseInt(item.price_total || 0, 10),
        0
      );

      const amountInCents = totalAmount * 100;

      const formData = new URLSearchParams();
      formData.append("amount", amountInCents.toString());
      formData.append("currency", "usd");
      formData.append("payment_method_types[]", "card");

      const response = await fetch(
        "https://api.stripe.com/v1/payment_intents",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: `Bearer sk_test_51QWyKtPCdJTxXoX1Y5tIj7ZYZAZWY8FFHTQ2uU2JWsd9GutCV0Kpa6mnjsOcbWHTI4txQSyZdz8xRUU6jWiNfW4z00Wm6wk4OW`,
          },
          body: formData.toString(),
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error.message);
      }

      const { id: sessionId, client_secret: clientSecret } =
        await response.json();
      setX(sessionId);
      const { error } = await initPaymentSheet({
        paymentIntentClientSecret: clientSecret,
        merchantDisplayName: "Your Business Name",
        country: "US",
      });

      if (error) {
        console.error("initPaymentSheet error:", error.message);
        Alert.alert("Error", "Failed to initialize payment sheet");
        return;
      }

      setPaymentSheetEnabled(true);
    } catch (error) {
      console.error("Error fetching payment details:", error.message);
      Alert.alert("Error", "An error occurred while fetching payment details");
    }
  }

  useEffect(() => {
    if (!paymentCompleted) {
      fetchPaymentSheetParams();
    }
  }, [cart, paymentCompleted]);

  async function openPaymentSheet() {
    const { error } = await presentPaymentSheet();

    if (error) {
      Alert.alert("Payment failed", error.message);
    } else {
      setPaymentCompleted(true);
      removeAll();
      router.push({ pathname: "/result", params: { x } });

      Alert.alert("Payment Successful", "Your payment was successful.");
      // if (paymentCompleted) {
      // }
    }
  }
  useEffect(() => {
    if (paymentCompleted && cart.length > 0) {
      setPaymentCompleted(false);
    }
  }, [cart, paymentCompleted]);

  return (
    <ScrollView>
      <View className="px-6 mb-8">
        <View className="flex flex-col gap-y-8">
          {cart.length > 0 &&
            cart.map((item, index) => {
              return (
                <View
                  key={index}
                  className="border border-white/50 flex flex-row"
                >
                  <View className="w-1/2 flex justify-center items-center">
                    <Image
                      source={{
                        uri: item.images?.[0],
                      }}
                      className="h-24 w-24 !max-w-[80%]"
                      alt="Image Not Found"
                    />
                  </View>
                  <View className="w-1/2 flex flex-col justify-center items-centert">
                    <Text className=" text-white font-normal text-center">
                      {item.carats} {item.shape_code} {item.color_code}
                    </Text>
                    <Text className="text-white font-bold text-xl text-center">
                      $ {item.price_total}
                    </Text>
                  </View>
                </View>
              );
            })}
        </View>
      </View>
      {/* <Button
        title="Pay Now"
        disabled={!paymentSheetEnabled}
        onPress={openPaymentSheet}
      /> */}
    </ScrollView>
  );
}
