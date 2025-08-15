import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View} from 'react-native';
import { useLayoutEffect,useState } from 'react';
import { Button,IconButton,TextInput } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import { useAuth } from '../../context/AuthProvider';
import Icon from "react-native-vector-icons/MaterialIcons";
import {createNewGroup} from "../../sql/group/index.js"

const AddNewGroup = () => {
  const {user: { id },} = useAuth();
  const [groupName, setGroupName] = useState("");
  const nav = useNavigation();

  const addNewGroup = async () => {
    if (!groupName || groupName.trim() === "") return;

    console.log("Group Name: ", groupName);
    try {
      const groupId = await createNewGroup(groupName, Number(id));
      alert(`Group created with id: ${groupId}`);
    } catch (error) {
      console.log("Error occurred while addNewGroup: ", error);
    }
  };


  const SCREEN_OPTIONS = {
    headerRight: (props) => (
      <Button {...props} mode="contained-tonal" onPress={addNewGroup}>
        Done
      </Button>
    ),
    headerLeft: (props) => (
      <IconButton icon={"arrow-left"} {...props} iconColor="#ffffff" onPress={nav.goBack} />
    ),
    headerShadowVisible: false,
  };
  //once dom is created useEffect is called Before Dom created useLayout Effect is called
  useLayoutEffect(() => {
    nav.setOptions({ ...SCREEN_OPTIONS });
  }, [nav, SCREEN_OPTIONS]);


  return (
    <View style={styles.container}>
      <View style={styles.groupDetails}>
        <View style={styles.photoContainer}>
          <Icon name="add-photo-alternate" style={{color:"#8550b9ff"}} size={30} />
        </View>
        <View style={styles.inputCont}>
          <TextInput
            value={groupName}
            onChangeText={setGroupName}
            mode="flat"
            placeholder="Group Name"
            style={styles.input}
          />
        </View>
      </View>
    </View>
  );
}

export default AddNewGroup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  groupDetails: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    marginTop: 20,
  },
  photoContainer: {
    borderWidth: 2,
    borderRadius: 10,
    borderColor: "#8550b9ff",
    padding: 3,
    marginLeft:10
  },
  inputCont: {
    width: 300,
    maxWidth: 300,
  },
  input: {
    width:280,
    fontSize: 20,
    marginLeft:5
  },
});
