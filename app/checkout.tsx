import React, { useEffect, useState } from "react";
import { Button, Alert, ScrollView } from "react-native";
import {
  initPaymentSheet,
  presentPaymentSheet,
} from "@stripe/stripe-react-native";
import { useCartStore } from "@/stores/cartStore";

export default function Checkout() {
  const [paymentSheetEnabled, setPaymentSheetEnabled] = useState(false);
  const cart = useCartStore.getState().cart;

  async function fetchPaymentSheetParams() {
    try {
      const totalAmount = cart.reduce(
        (total, item) => total + parseInt(item.price_total || 0, 10),
        0
      );

      // Ensure you calculate the totalAmount in cents (Stripe uses cents for USD)
      const amountInCents = totalAmount * 100;

      const formData = new URLSearchParams();
      formData.append("amount", amountInCents.toString()); // Total amount in cents
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

      const { client_secret: clientSecret } = await response.json();

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
    fetchPaymentSheetParams();
  }, []);

  async function openPaymentSheet() {
    const { error } = await presentPaymentSheet();

    if (error) {
      Alert.alert("Payment failed", error.message);
    } else {
      Alert.alert("Payment successful", "Your payment was successful!");
    }
  }

  return (
    <ScrollView>
      <Button
        title="Pay Now"
        disabled={!paymentSheetEnabled}
        onPress={openPaymentSheet}
      />
    </ScrollView>
  );
}
