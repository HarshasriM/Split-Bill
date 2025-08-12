import Connection from "../connection";
import { CREATE_NEW_GROUP_QUERY } from "./queries";
import { createGroupMembers } from "../group-member/index";


export const createNewGroup = async (group_name, creatorId) => {
  const db = await Connection.getConnection();
  try {
    // verify if the creator of this group is already present
    console.log("Starting TXN");

    await db.execAsync("BEGIN"); // Starts TXN

    const group = await db.runAsync(CREATE_NEW_GROUP_QUERY, [group_name, +creatorId]);
    console.log("Group created!: ", JSON.stringify(group));
    const groupId = group.lastInsertRowId;

    await createGroupMembers([+creatorId], Number(groupId), db);
    console.log("group members created");

    console.log("Commiting TXN");

    await db.execAsync("COMMIT");

    return groupId;
  } catch (error) {
    console.log("TXN Failed");
    await db.execAsync("ROLLBACK"); // Revert Changes
    console.log(error);
    throw error;
  }
};