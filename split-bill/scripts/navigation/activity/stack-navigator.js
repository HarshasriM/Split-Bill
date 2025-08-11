import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ActivityScreen } from "../../utils/constants";
import AllActivities from "../../screens/activity/AllActivities";


const Stack = createNativeStackNavigator();

const ActivityStackNavigator = ()=>{
    return(
        <Stack.Navigator>
            <Stack.Screen name={ActivityScreen.AllActivities} component={AllActivities}/>
        </Stack.Navigator>
    )
}
export default ActivityStackNavigator;