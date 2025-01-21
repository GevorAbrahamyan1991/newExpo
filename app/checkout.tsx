// import React, { useEffect, useState } from "react";
// import { View, Button, StyleSheet, Alert } from "react-native";
// import { useStripe } from "@stripe/stripe-react-native";
// import { useCartStore } from "@/stores/cartStore";

// export default function Checkout() {
//   const [loading, setLoading] = useState(false);
//   const { initPaymentSheet, presentPaymentSheet } = useStripe();
//   const cart = useCartStore.getState().cart;

//   const fetchPaymentSheetParams = async () => {
//     try {
//       const formData = new FormData();
//       formData.append("items", JSON.stringify(cart));

//       const response = await fetch(
//         "http://localhost:3000/api/checkout_sessions",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: formData,
//         }
//       );
//       const { clientSecret, publishableKey } = await response.json();
//       return { clientSecret, publishableKey };
//     } catch (error) {
//       console.error("Error fetching payment sheet params:", error);
//       return null;
//     }
//   };

//   // Initialize the Payment Sheet
//   const initializePaymentSheet = async () => {
//     setLoading(true);
//     const paymentSheetParams = await fetchPaymentSheetParams();

//     if (!paymentSheetParams) {
//       setLoading(false);
//       Alert.alert("Error", "Failed to fetch payment sheet parameters");
//       return;
//     }

//     const { clientSecret, publishableKey } = paymentSheetParams;

//     const initResponse = await initPaymentSheet({
//       paymentIntentClientSecret: clientSecret,
//       merchantDisplayName: "Your Store Name",
//     });

//     if (initResponse.error) {
//       Alert.alert("Error", initResponse.error.message);
//     }
//     setLoading(false);
//   };

//   // Open the Payment Sheet
//   const openPaymentSheet = async () => {
//     if (loading) return;

//     const { error } = await presentPaymentSheet();

//     if (error) {
//       Alert.alert("Payment failed", error.message);
//     } else {
//       Alert.alert("Success", "Your payment was confirmed!");
//     }
//   };

//   useEffect(() => {
//     initializePaymentSheet();
//   }, []);

//   return (
//     <View style={styles.container}>
//       <Button
//         title="Checkout"
//         onPress={openPaymentSheet}
//         disabled={loading}
//         color="#007AFF"
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     padding: 16,
//   },
// });
