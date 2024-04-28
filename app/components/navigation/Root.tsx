import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeScreen, TaskDetailScreen } from "../../screens";
import { SCREENS } from "../../constants";

const Stack = createNativeStackNavigator();

export default function Root() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#d6b7f9",
        },
      }}
    >
      <Stack.Screen name={SCREENS.HOME.name} component={HomeScreen} />
      <Stack.Screen
        name={SCREENS.TASK_DETAILS.name}
        component={TaskDetailScreen}
      />
    </Stack.Navigator>
  );
}
