import React from 'react';
import { StyleSheet, Text, View } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { ActivityIndicator, FAB } from "react-native-paper";
import { GroupScreens } from "../../utils/constants";
import { useState,useEffect } from 'react';

const GroupItemMain = () => {
  const [loading, setLoading] = useState(false);
  const nav = useNavigation();
  
  const navigateToGroupExpense = () => {
    nav.navigate(GroupScreens.GroupAddExpense);
  };

  return (
    loading ? (
    <ActivityIndicator size={30} style={{ margin: "auto" }} />
  ) : (
    <View style={styles.container}>
      {/* <GroupExpenseList expenses={expenses} /> */}
      <FAB
        onPress={navigateToGroupExpense}
        style={styles.fab}
        label="Add Expense"
        icon={"wallet-plus-outline"}
      />
    </View>
   )
 )
}

export default GroupItemMain;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  fab: { position: "absolute", bottom: 15, right: 5 },
});
