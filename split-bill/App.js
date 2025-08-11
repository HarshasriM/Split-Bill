import React from "react";
import { StatusBar } from "react-native";
import MainNavigator from "./scripts/navigation";

export default function App() {
  return (
    <React.Fragment>
      <StatusBar style="auto"/>
      <MainNavigator/>
    </React.Fragment>
  );
}

