import { View } from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { ActivityIndicator} from "react-native-paper";
import { getSettlementBetweenFriend } from "../../sql/payments/index";
import GroupExpenseList from "../../components/groups/GroupExpenseList";
import { FriendsScreens } from "../../utils/constants";

const FriendPage = () => {
  const nav = useNavigation();
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);

  const {
    params: { users },
  } = useRoute();

  const navigateToFriendExpense = () => {
      nav.navigate(FriendsScreens.FriendAddExpense);
    };

  useLayoutEffect(() => {
    getSettlementBetweenFriend(users[0].id, users[1].id)
      .then((d) => setExpenses(d))
      .then(() => setLoading(false))
      .catch((err) => console.log(err));

    nav.addListener("focus", () => {
      getSettlementBetweenFriend(users[0].id, users[1].id)
        .then((d) => setExpenses(d))
        .then(() => setLoading(false))
        .catch((err) => console.log(err));
    });
  }, []);

  return loading ? (
    <ActivityIndicator size={30} style={{ margin: "auto" }} />
  ) : (
    <View style={{ flex: 1 }}>
      <GroupExpenseList expenses={expenses} isFriend={true} />
      <FAB
        onPress={navigateToFriendExpense}
        style={styles.fab}
        label="Add Expense"
        icon={"wallet-plus-outline"}
      />
    </View>
  );
};

export default FriendPage;
const styles = StyleSheet.create({
  fab: { position: "absolute", bottom: 15, right: 5 },
});