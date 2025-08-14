import React from 'react';
import { View, Text ,StyleSheet,TouchableOpacity} from 'react-native';
import { Dimensions } from 'react-native';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
import { GroupScreens } from "../../utils/constants";
import { useAppState } from '../../context/AppStateProvider';



const GroupListRenderItem = ({group}) => {
//   console.log("GROUP", group);

  const { setSelectedGroup } = useAppState();
  const nav = useNavigation();

  const navigateToGroupScreen = () => {
    setSelectedGroup({ id: group.id, name: group.group_name });
    nav.navigate(GroupScreens.GroupItem);
    // nav.navigate(GroupScreens.GroupItem,{group});
  };
  return (
     <TouchableOpacity onPress={navigateToGroupScreen} style={styles.container}>
      <View style={styles.groupContainer}>
        <View style={styles.itemContainer}>
          <Text style={styles.groupText}>{group.group_name}</Text>
          <Text style={styles.smallText}>
            Created At: {new Date(group.created_at).toLocaleDateString()}
          </Text>
        </View>
        <View style={styles.iconContainer}>
          <Icon style={{ color: "#5e5656ff" }} name="account" size={20} />
          <Text style={styles.smallText}>{3}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default GroupListRenderItem;

const styles = StyleSheet.create({
  container: {
    marginVertical:1,
    padding: 10,
    borderTopWidth: 1.2,
    borderBottomWidth:1.2,
    borderColor:"#8550b9ff",
    width: Dimensions.get("window").width
  },
  itemContainer: {
    flex: 1,
    height: 50,
    maxHeight: 100,
  },
  groupContainer: { flexDirection: "row" },
  groupText: {
    color: "#5e5656ff",
    fontSize: 20,
    fontWeight: "500",
  },
  smallText: {
    color: "#5e5656ff",
    fontWeight: "500",
  },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 4,
  },
});
