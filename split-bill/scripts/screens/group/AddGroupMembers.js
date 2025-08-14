import { Dimensions, StyleSheet, Text, View } from "react-native";
import { useEffect, useLayoutEffect, useState } from "react";
import SelectContacts from "../../components/friends/SelectContacts";
import { useNavigation } from "@react-navigation/native";
import { useAppState } from "../../context/AppStateProvider";
import { Button } from "react-native-paper";
import { createNewGroupMembersTransaction } from "../../sql/group/index";

const AddGroupMembers = () => {
  const [selectedContacts, setSelectedContacts] = useState([]);
  const nav = useNavigation();
  const { selectedGroup } = useAppState();

  const addNewMembers = async () => {
    if (selectedContacts.length === 0) {
      console.log("Adding members", selectedContacts);
      console.log("No contacts");
      return;
    }
    //console.log("Adding members", selectedContacts);

    try {
      await createNewGroupMembersTransaction(
        selectedContacts,
        selectedGroup.id
      );
      alert("Success");
    } catch (error) {
      console.log(error);
    }
  };

  useLayoutEffect(() => {
    nav.setOptions({
      title: selectedGroup?.name,
    });
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.text}>Add New members </Text>
        <Button style={styles.button} mode="contained" onPress={addNewMembers}>Add</Button>
      </View>
      <SelectContacts
        selectedContacts={selectedContacts}
        setSelectedContacts={setSelectedContacts}
      />
    </View>
  );
};

export default AddGroupMembers;

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get("window").width - 50,
    marginHorizontal:"auto",
    paddingTop: 20,
  },
  innerContainer:{
    flexDirection:"row",
    justifyContent:"space-between",
    marginVertical:20
  },
  text: {
    fontSize: 25,
    fontWeight:800,
    color:"#8550b9ff"
  },
  button:{
    width:90,
  }
});