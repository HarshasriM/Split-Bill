import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import GroupAppBar from './GroupAppBar';

const GroupLayout = ({children}) => {
  return (
    <View style={styles.container}>
      <GroupAppBar/>
      <Text style={styles.text}>All Groups</Text>
      <ScrollView style={styles.container}>
        {children}
      </ScrollView>
    </View>
  );
}

export default GroupLayout;

const styles = StyleSheet.create({
    container:{
        flex:1
    },
    text:{
        fontWeight:"500",
    }
})
