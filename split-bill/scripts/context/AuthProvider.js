import { Children, createContext, useContext, useState } from "react";

const AuthContext = createContext({
  user: { id: 0, name: "", email: "", phone: "" },
  isLoggedIn: false,
  login: async (email,id, password) => {},
  signup: async (username, email,password, phone) => {},
  logout: () => {},
});

export const useAuth = ()=>useContext(AuthContext);

const AuthProvider = ({children})=>{
    const [user,setUser] = useState(null);
    const [isLoggedIn,setIsLoggedIn] = useState(false);
    const login = async (email,id,password)=>{};
    const signup = async (username,email,password,phone)=>{};
    const logout =  ()=>{};

    return (
    <AuthContext.Provider value={{ user, isLoggedIn, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;