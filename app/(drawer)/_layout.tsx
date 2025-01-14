import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";

export default function DrawerLayout() {
  return (
    <GestureHandlerRootView>
      <Drawer>
        <Drawer.Screen
          name="about"
          options={{
            drawerLabel: "About",
            title: "overview",
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}
