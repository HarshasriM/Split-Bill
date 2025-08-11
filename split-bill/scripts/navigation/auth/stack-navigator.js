import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthScreens } from "../../../utils/constants";
import Login from "../../screens/auth/Login";
import SignUp from "../../screens/auth/SignUp";

const Stack = createNativeStackNavigator();

const AuthStackNaviagtor = ()=>{
    return (
        <Stack.Navigator>
            <Stack.Screen name={AuthScreens.Login} component={Login}/>
            <Stack.Screen name={AuthScreens.SignUp} component={SignUp}/>
        </Stack.Navigator>
    );

}
export default AuthStackNaviagtor;