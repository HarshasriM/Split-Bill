import Connection from "./connection";
import { SessionTable } from "./tables/session";
import { UsersTable } from "./tables/users";
import { CreateActivitiesTable } from "./tables/activities";
import { CreateGroupMembersTable } from "./tables/group-members";
import { CreateGroupsTable } from "./tables/group";
import { CreateExpenseSplitsTable } from "./tables/expense-splits";
import { CreateExpensesTable } from "./tables/expenses";
import { CreateFriendsTable } from "./tables/friends";
import { CreatePaymentsTable } from "./tables/payments";

const getAllTables = async () => {
  try {
    const db = await Connection.getConnection();
    const QUERY = `SELECT name FROM sqlite_master WHERE type = 'table'`;
    const result = await db.getAllAsync(QUERY);
    console.log(JSON.stringify(result));
  } catch (error) {
    console.log("Error while getiing all tables: ", error);
    throw error;
  }
};


export const onInitDatabase = async ()=>{
    //1.create tables
    try{
        const db = await Connection.getConnection();
        await db.execAsync(UsersTable);
        await db.execAsync(SessionTable);
        await db.execAsync(CreateGroupsTable);
        await db.execAsync(CreateGroupMembersTable);
        await db.execAsync(CreateActivitiesTable);
        await db.execAsync(CreateExpensesTable);
        await db.execAsync(CreateExpenseSplitsTable);
        await db.execAsync(CreateFriendsTable);
        await db.execAsync(CreatePaymentsTable);
        await getAllTables();
        return;
    }
    catch(error){
        console.log("Error while initalizing Database Tables: ", error);
        throw error;
    }
   
};

export const onErrorIntialisingDatabase =async ()=>{
    alert("Something went wrong!");
};