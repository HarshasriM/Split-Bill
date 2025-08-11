import * as SQLite from "expo-sqlite";
import { DatabaseName } from "../../utils/constants";

//connection class is a singleton(design Pattern) class
export default class Connection{
    static #connection = null;
    static async getConnection (){
        if(!this.#connection){
            this.#connection = await SQLite.openDatabaseAsync(DatabaseName.DatabaseName)
            return this.#connection
        }
        return this.#connection;
    }

}