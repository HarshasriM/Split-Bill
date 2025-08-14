import { CREATE_GROUP_MEMBER_QUERY } from "./queries";
import Connection from "../connection";
import { GET_ALL_GROUP_MEMBERS_BY_ID, GET_GROUPS_OF_USER } from "./queries";



export const createGroupMembers = async (arrOfUserId, groupId, db) => {
  if (!arrOfUserId || arrOfUserId.length === 0)
    throw new Error("No user id present");
  try {
    for (const id of arrOfUserId) {
      // insert to groumember
      const result = await db.runAsync(CREATE_GROUP_MEMBER_QUERY, [
        groupId,
        id,
      ]);
      //console.log("New group member created! ", result);
    }
  } catch (error) {
    console.log("Error occurred while creating new group member: ", error);
    throw error;
  }
};



export const getGroupsOfUser = async (userId) => {
  try {
    const db = await Connection.getConnection();

    const result = await db.getAllAsync(GET_GROUPS_OF_USER, +userId);
    //console.log("Groups Of User:", result);
    return result;
  } catch (error) {
    console.log("Error in getGroupsOfUser: ", error);
    throw error;
  }
};

export const getMembersOfGroup = async (groupId) => {
  try {
    const db = await Connection.getConnection();

    const result = await db.getAllAsync(GET_ALL_GROUP_MEMBERS_BY_ID, +groupId);
    //console.log("members Of group:", result);
    return result;
  } catch (error) {
    console.log("Error in getMembersOfGroup: ", error);
    throw error;
  }
};