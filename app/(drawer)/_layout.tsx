import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";

export default function DrawerLayout() {
  return (
    // <GestureHandlerRootView>
    <Drawer
      screenOptions={{
        title: "Menu",
      }}
    >
      <Drawer.Screen
        name="about"
        options={{
          drawerLabel: "About",
          title: "overview",
        }}
      />
      <Drawer.Screen
        name="news"
        options={{
          drawerLabel: "News",
          title: "overview",
        }}
      />
    </Drawer>
    // </GestureHandlerRootView>
  );
}
