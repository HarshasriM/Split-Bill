import { PaymentStatus } from "../../utils/constants";
import { activityTextGenerator } from "../../utils/helper";
import {  addNewActivitiesForIndividuals,addNewActivity, } from "../activity/index";
import Connection from "../connection";
import { addNewPaymentRecord } from "../payments/index";
import {CREATE_NEW_EXPENSE_QUERY,CREATE_NEW_EXPENSE_SPLITS_QUERY,} from "./queries";

const addExpenseRecord = async (db, description, amount, paidBy, groupId) => {
  try {
    const newExpense = await db.runAsync(CREATE_NEW_EXPENSE_QUERY, [
      description,
      amount,
      paidBy,
      groupId,
      0,
    ]);
    console.log("Expense Record Created: ", JSON.stringify(newExpense));
    return newExpense?.lastInsertRowId;
  } catch (error) {
    console.log("Error occurred in addExpenseRecord, err=> ", error);
    throw error;
  }
};

const addExpenseSplitRecord = async (db, expenseId, userId, amountOwed) => {
  try {
    const newExpenseSplit = await db.runAsync(CREATE_NEW_EXPENSE_SPLITS_QUERY, [
      expenseId,
      userId,
      amountOwed,
    ]);
    console.log("Expense Record Created: ", JSON.stringify(newExpenseSplit));
    return newExpenseSplit?.lastInsertRowId;
  } catch (error) {
    console.log("Error occurred in addExpenseSplitRecord, err=> ", error);
    throw error;
  }
};

export const addNewExpense = async ( expenseData,amount,description,loggedInUserId,groupId = null) => {
  const db = await Connection.getConnection();
  try {
    db.execAsync("BEGIN");
    console.log("Transaction start!");

    const expense = await addExpenseRecord(db,description,amount,loggedInUserId,groupId);
    console.log("Expense Record Created With ID ", expense);

    const activityText = activityTextGenerator(!groupId ? "individual" : "group",expense,amount,groupId,Object.keys(expenseData));

    if (groupId) {
      await addNewActivity(db, activityText, loggedInUserId);
    } else {
      await addNewActivitiesForIndividuals(
        db,
        activityText,
        Object.keys(expenseData)
      );
    }

    const userIds = Object.keys(expenseData).filter(
      (uid) => +uid !== loggedInUserId
    );

    for (const userId of userIds) {
      const shareAmount = amount * (expenseData[userId] / 100);
      await addExpenseSplitRecord(db, expense, +userId, shareAmount);
      console.log("Split Record Successfully Created!");
      // const activityText = `You were added in expense ${expense} and you need to pay ${shareAmount} to userId ${userId}`;
      // await addNewActivity(db, activityText, +userId);
      await addNewPaymentRecord(db,+userId,+loggedInUserId,shareAmount,expense,PaymentStatus.PENDING);
      console.log("Payment record created!");
     }
    console.log("Splits Created Successfully!");

    db.execAsync("COMMIT");
    console.log("Transaction Complete!");
  } catch (error) {
    console.log("Error occurred in addNewExpense, err=>", error);
    db.execAsync("ROLLBACK");
    console.log("Transaction Failed!, Rolling Back");
    throw error;
  }
};