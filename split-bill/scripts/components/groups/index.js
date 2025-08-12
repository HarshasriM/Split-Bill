import { StyleSheet, View } from "react-native";
import GroupLayout from "./GroupLayout";
import GroupList from "./GroupList";

const GroupContent = () => {
  return (
    <GroupLayout>
      <View>
        <GroupList />
      </View>
    </GroupLayout>
  );
};

export default GroupContent;

const styles = StyleSheet.create({});