import {createNativeStackNavigator} from "@react-navigation/native-stack";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { GroupScreens } from "../../utils/constants";
import AddGroup from "../../screens/group/AddGroup";
import AllGroups from "../../screens/group/AllGroups";
import GroupItemMain from "../../screens/group/GroupItemMain";
import GroupItemPersons from "../../screens/group/GroupItemPersons";
import AddGroupMembers from "../../screens/group/AddGroupMembers";
import GroupAddExpense from "../../screens/group/GroupAddExpense";
import GroupExpenseItem from "../../screens/group/GroupExpenseItem";

const Stack = createNativeStackNavigator();
const Tab = createMaterialTopTabNavigator();

const GroupItemNavigator = () => {
  return (
    <Tab.Navigator 
    screenOptions={{
        tabBarActiveTintColor:"#8550b9ff",
        tabBarInactiveTintColor:"gray",
        tabBarLabelStyle:{fontSize:18,fontWeight:700},
        tabBarIndicatorStyle:{backgroundColor:"#8550b9ff"},
        headerShadowVisible:false
        }} >
      <Tab.Screen
        options={{  
          title: "Splits",
          animationEnabled: true,
        }}
        name={GroupScreens.GroupItemMain}
        component={GroupItemMain}
      />
      <Tab.Screen
        options={{
         title: "Members" }}
        name={GroupScreens.GroupItemPersons}
        component={GroupItemPersons}
      />
    </Tab.Navigator>
  );
};

const GroupStackNavigator = ()=>{
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name={GroupScreens.AllGroups} component={AllGroups} />
            <Stack.Screen 
              options={{
                headerShadowVisible: false,
                headerShown: true,
                headerStyle: {
                    backgroundColor:"#8550b9ff", 
                },
                headerTintColor: '#ffffff',
                }}
              name={GroupScreens.AddGroup} component={AddGroup} />
            <Stack.Screen 
                options={{
                headerShadowVisible: false,
                headerShown: true,
                headerStyle: {
                    backgroundColor:"#8550b9ff", 
                },
                headerTintColor: '#ffffff',
                }}
                name={GroupScreens.GroupItem} component={GroupItemNavigator} />
            <Stack.Screen 
                options={{
                  headerShown:true,
                  headerStyle: {
                    backgroundColor:"#8550b9ff", 
                  },
                  headerTintColor: '#ffffff',
                }}
                name={GroupScreens.AddGroupMembers} component={AddGroupMembers} />
          <Stack.Screen
                options={{ 
                  headerShown: true, 
                  headerShadowVisible: false,
                  headerStyle: {
                    backgroundColor:"#8550b9ff", 
                  },
                  headerTintColor: '#ffffff',
                }}
                name={GroupScreens.GroupAddExpense} component={GroupAddExpense}/>
          <Stack.Screen
                options={{ 
                  headerShown: true, 
                  headerShadowVisible: false,
                  headerStyle: {
                    backgroundColor:"#8550b9ff", 
                  },
                  headerTintColor: '#ffffff',
                }}
                name={GroupScreens.GroupAddExpense} component={GroupExpenseItem}/>
        </Stack.Navigator>
    )
}

export default GroupStackNavigator;