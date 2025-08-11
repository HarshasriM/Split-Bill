import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { ActivityIndicator,MD2Colors } from "react-native-paper";

const Fallback = () => {
  return (
    <View style={{ alignItems: "center", justifyContent: "center" }}>
      <Text>SPLIT BILL Application</Text>
      {/*LOGO  */}
      <ActivityIndicator animating={true} color={MD2Colors.red800} />
    </View>
  );
};

export default Fallback;

const styles = StyleSheet.create({});