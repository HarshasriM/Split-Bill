import React from 'react';
import { View, Text, StyleSheet} from 'react-native';
import GroupAppBar from './GroupAppBar';

const GroupLayout = ({children}) => {
  return (
    <View style={styles.container}>
      <GroupAppBar/>
      <Text style={styles.text}>All Groups</Text>
      <View style={styles.container}>
        {children}
      </View>
    </View>
  );
}

export default GroupLayout;

const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    text:{
        fontWeight:700,
        fontSize:25,
        padding:10,
        color:"#8550b9ff"
    }
})
