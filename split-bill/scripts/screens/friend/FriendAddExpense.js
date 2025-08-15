import { Dimensions, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Button, Chip, PaperProvider, TextInput } from "react-native-paper";
import SplitByPercentage from "../../components/expense/SplitByPercentage";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import ExpenseDetails from "../../components/expense/ExpenseDetails";
import { addNewExpense } from "../../sql/expenses/index";
import { useAuth } from "../../context/AuthProvider";
import { useRoute } from "@react-navigation/native";

const SplitType = { percentage: "percentage", equally: "equally" };

const FriendAddExpense = () => {
  const { users } = useRoute().params;
  console.log("FriendAddExpense", users);

  const [expenseDesc, setExpenseDesc] = useState("");
  const [expenseAmt, setExpenseAmt] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [splitType, setSetsplitType] = useState(SplitType.equally);
  const [expenseData, setExpenseData] = useState(null);
  const {
    user: { id },
  } = useAuth();

  const splitByPercentage = () => {
    setSetsplitType(SplitType.percentage);
    setModalVisible(true);
  };
  const splitEqually = () => {
    setSetsplitType(SplitType.equally);

    const expData = {};
    const shareEqual = 100 / users.length;
    users.forEach((user) => (expData[`${user.id}`] = shareEqual));
    setExpenseData(expData);
  };

  const onCloseModal = (data) => {
    setExpenseData(data);
    setModalVisible(false);
  };

  const createSplitHandler = async () => {
    try {
      await addNewExpense(expenseData, +expenseAmt, expenseDesc, +id);
      alert("Success");
    } catch (error) {
      console.log(error);
      alert("Failed");
    }
  };

  return (
    <PaperProvider>
      {splitType === SplitType.percentage && (
        <SplitByPercentage
          visible={modalVisible}
          closeModal={onCloseModal}
          users={users}
        />
      )}
      <View>
        <Text>Select Split Type</Text>
        <View style={styles.selectionView}>
          <Chip
            icon={splitType === SplitType.equally ? "check" : ""}
            onPress={splitEqually}
          >
            Equally
          </Chip>
          <Chip
            icon={splitType === SplitType.percentage ? "check" : ""}
            onPress={splitByPercentage}
          >
            Percentage
          </Chip>
        </View>
        <View style={styles.inputBox}>
          <Icon name="receipt" size={30} />
          <TextInput
            style={styles.input}
            mode="flat"
            value={expenseDesc}
            onChangeText={setExpenseDesc}
          />
        </View>
        <View style={styles.inputBox}>
          <Icon name="currency-rupee" size={30} />
          <TextInput
            value={expenseAmt}
            onChangeText={setExpenseAmt}
            keyboardType="number-pad"
            style={styles.input}
            mode="flat"
          />
        </View>
        <Button onPress={createSplitHandler}>Create Split</Button>
        {expenseData && users && (
          <ExpenseDetails
            expenseData={expenseData}
            totalAmount={expenseAmt}
            users={users}
          />
        )}
      </View>
    </PaperProvider>
  );
};

export default FriendAddExpense;

const styles = StyleSheet.create({
  selectionView: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
    gap: 10,
  },
  inputBox: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    marginVertical: 10,
    padding: 10,
  },
  input: {
    width: Dimensions.get("window").width - 150,
  },
});