import { CREATE_NEW_ACTIVITY_QUERY } from "./queries";
import { GET_ACTIVITIES_OF_USER } from "./queries";
import Connection from "../connection";


export const addNewActivity = async (db, activity, userId) => {
  try {
    const activityRecord = await db.runAsync(CREATE_NEW_ACTIVITY_QUERY, [
      activity,
      +userId,
    ]);
    console.log("Activity Created!", JSON.stringify(activityRecord));
    return activityRecord?.lastInsertRowId;
  } catch (error) {
    console.log("Error in addNewActivity,err=>", error);
    throw error;
  }
};

export const addNewActivitiesForIndividuals = async (db, activity, userIds) => {
  try {
    for (const userId of userIds) {
      const activityRecord = await db.runAsync(CREATE_NEW_ACTIVITY_QUERY, [
        activity,
        +userId,
      ]);
      console.log("Activity Created!", JSON.stringify(activityRecord));
    }
    console.log("Acitivites generated!");
  } catch (error) {
    console.log("Error in addNewActivity,err=>", error);
    throw error;
  }
};



export const getActivitiesOfUser = async (userId) => {
  try {
    const db = await Connection.getConnection();
    const result = await db.getAllAsync(GET_ACTIVITIES_OF_USER, [+userId]);
    console.log("Activities of UserId: ", userId, JSON.stringify(result));
    return result;
  } catch (error) {
    console.log("Error occurred in getActivitiesOfUser: err=>", error);
    throw error;
  }
};