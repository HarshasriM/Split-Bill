import { CREATE_NEW_PAYMENT_QUERY } from "./queries";
import { PaymentStatus } from "../../utils/constants";
import Connection from "../connection";
import { getPaymentStatusOfExpense } from "../expenses/index";
import { updateExpenseSettlelemt } from "../expenses/index";
import { UPDATE_PAYMENT_STATEMENT } from "./queries";
import { GET_SETTLEMENT_BETWEEN_FRIEND } from "./queries";

//adding queries
export const addNewPaymentRecord = async (db, payerId,payeeId,amount,expenseId,status) => {
  try {
    const newPaymentRecord = await db.runAsync(CREATE_NEW_PAYMENT_QUERY, [payerId,payeeId,amount,expenseId,status,]);
    console.log("Payment Record Created!", JSON.stringify(newPaymentRecord));
    return newPaymentRecord?.lastInsertRowId;
  } catch (error) {
    console.log("error occurred in addNewPaymentRecord, err=>", error);
    throw error;
  }
};


//get queries


export const getSettlementBetweenFriend = async (user1, user2) => {
  try {
    const db = await Connection.getConnection();
    const result = await db.getAllAsync(GET_SETTLEMENT_BETWEEN_FRIEND, [
      +user1,
      +user2,
      +user2,
      +user1,
    ]);
    console.log("Settlements between Of Users", result);
    return result;
  } catch (error) {
    console.log("Error in getSettlementBetweenFriend: ", error);
    throw error;
  }
};

//update queries
export const updatePaymentRecord = async (expenseId, userId) => {
  const db = await Connection.getConnection();
  try {
    console.log("Beginning txn");

    db.execAsync("BEGIN");
    const updatePaymentRecord = await db.runAsync(UPDATE_PAYMENT_STATEMENT, [
      expenseId,
      userId,
    ]);

    console.log("Payment Record Updated!", JSON.stringify(updatePaymentRecord));

    // check other users payments
    const payments = await getPaymentStatusOfExpense(expenseId);
    if (payments.length === 0) {
    } else {
      let flag = 0;
      for (const payment of payments) {
        if (payment.status === PaymentStatus.PENDING) {
          flag = 1;
        }
      }
      if (flag == 0) {
        // update the status of expense
        await updateExpenseSettlelemt(expenseId);
      }
    }
    console.log("Commiting txn");

    db.execAsync("COMMIT");
    return updatePaymentRecord;
  } catch (error) {
    console.log("error occurred in updatePaymentRecord, err=>", error);
    console.log("ROLLING BACK txn");
    db.execAsync("ROLLBACK");
    throw error;
  }
};