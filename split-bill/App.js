import React from "react";
import { StatusBar } from "react-native";
import MainNavigator from "./scripts/navigation";
import AuthProvider from "./scripts/context/AuthProvider";

export default function App() {
  return (
    <React.Fragment>
      <StatusBar style="auto"/>
      <AuthProvider>
        <MainNavigator/>
      </AuthProvider>
    </React.Fragment>
  );
}

