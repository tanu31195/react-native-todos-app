import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./app/screens/HomeScreen";
import TaskDetailScreen from "./app/screens/TaskDetailScreen";
import { Provider } from "react-redux";
import { store, persistor } from "./app/store/redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SCREENS } from "./app/constants";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <NavigationContainer>
            <Stack.Navigator
            screenOptions={{
              headerStyle: {
                backgroundColor: '#d6b7f9'
              },
            }}>
              <Stack.Screen name={SCREENS.HOME.name} component={HomeScreen} />
              <Stack.Screen name={SCREENS.TASK_DETAILS.name} component={TaskDetailScreen} />
            </Stack.Navigator>
          </NavigationContainer>
        </GestureHandlerRootView>
      </PersistGate>
    </Provider>
  );
}
