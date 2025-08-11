import React from "react";
import { StatusBar } from "react-native";
import MainNavigator from "./scripts/navigation";
import AuthProvider from "./scripts/context/AuthProvider";
import { SQLiteProvider } from "expo-sqlite";
import { onErrorIntialisingDatabase, onInitDatabase } from "./scripts/sql/index";
import Fallback from "./scripts/screens/fallback/Fallback";
import { DatabaseName } from "./scripts/utils/constants";


export default function App() {
  return (
    <React.Fragment>
      <StatusBar style="auto"/>
      <React.Suspense fallback={<Fallback />}>
        <SQLiteProvider databaseName={DatabaseName.DatabaseName} onInit={onInitDatabase} onError={onErrorIntialisingDatabase}>
          <AuthProvider>
            <MainNavigator/>
          </AuthProvider>
        </SQLiteProvider>
      </React.Suspense>
    </React.Fragment>
  );
}

