import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Compiler from "./Compiler";
import Dashboard from "./Dashboard";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Dashboard} />
        <Stack.Screen name="Compiler" component={Compiler} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
