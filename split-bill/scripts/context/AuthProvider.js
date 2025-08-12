import { createContext, useContext,useEffect, useState } from "react";
import { isStringValid } from "../utils/helper";
import {createUser, getUserById} from "../sql/auth/user/index"
import { createNewSession ,deleteSessions,getSession} from "../sql/auth/sessions/index";


const AuthContext = createContext({
  user: { id: 0, name: "", email: "", phone: "" },
  isLoggedIn: false,
  login: async (email,id, password) => {},
  signup: async (username, email,phone,password) => {},
  logout: () => {},
});

export const useAuth = ()=>useContext(AuthContext);




const AuthProvider = ({children})=>{
    const [user,setUser] = useState(null);
    const [isLoggedIn,setIsLoggedIn] = useState(false);

    useEffect(() => {
    async function checkSession() {
      //get old session
        const sessions = await getSession();
        console.log("Prev Sessions: ", JSON.stringify(sessions));

        //if no sessions just return
        if (!sessions && sessions.length === 0) {
          return;
        }

        //if session length > 0 delelte and return
        if (sessions.length > 1) {
          await deleteSessions();
          return;
            }

          // if only one session existes find user using user_Id
          const user = await getUserById(sessions[0].user_id);
          if (!user) {
            return;
          }

          setUser(user);
          setIsLoggedIn(true);
        }
        checkSession();
    }, []);
    const login = async (id,password)=>{
      if (!isStringValid([password]) || !id || id === 0) {
      console.log("Id or Password Invalid");
      return;
      }

      try {
        // find a user by id
        const user = await getUserById(id);
        console.log("User retrieved successfully: ", JSON.stringify(user));

        if(!user){
          console.log("user doesnot exists");
          alert("user doesnot exists check UserId");
          return
        }
        // verify password
        const isPasswordCorrect = user.password === password;
        if (!isPasswordCorrect) {
          console.log("Incorrect password");
          alert("Incorrect Password");
          return;
        }

        // create session
        console.log("Creating session!");
        await deleteSessions();
        const session = await createNewSession(user?.id);
        console.log("Session created successfully: ", session);

        setUser(user);
        setIsLoggedIn(true);
      } catch (error) {
        console.log("error while login: ", error);
        throw error;
      }
    };


    const signup = async (username,email,phone,password)=>{
      if (!isStringValid([password,username,email,phone])) {
      console.log("Id or Password Invalid");
      return;
      }
       try {
        // create new user
        const user = await createUser(username, email, phone, password);
        console.log("User is created successfully");

        // create new session
        console.log("Creating session!");
        await deleteSessions();
        const session = await createNewSession(user?.id);
        console.log("Session created successfully: ", session);


        // update state
        setUser(user);
        setIsLoggedIn(true);


      } catch (error) {
        console.log("Error while signup: ", error);
        throw error;
      }
    };

    const logout =  async ()=>{
      try {
        setIsLoggedIn(false);
        setUser(null);
        await deleteSessions();
      } catch (error) {
        console.log("Error while logging out, err=>", error);
        return;
      }
    };

    return (
    <AuthContext.Provider value={{ user, isLoggedIn, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;