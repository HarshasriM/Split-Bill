import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Tabs } from '../utils/constants';
import GroupStackNavigator from './groups/stack-navigator';
import FriendsStackNavigator from './friends/stack-navigator';
import ActivityStackNavigator from './activity/stack-navigator';
import AccountStackNavigator from './account/stack-navigator';
import Icon from "react-native-vector-icons/Feather";
import AuthStackNaviagtor from './auth/stack-navigator';
import { useAuth } from '../context/AuthProvider';

const Tab = createBottomTabNavigator();


const MainNavigator = ()=>{
    const auth = useAuth();
    if(!auth.isLoggedIn){
        return(
            <NavigationContainer>
                <AuthStackNaviagtor/>
            </NavigationContainer>
        )
    }
    return ( 
        <NavigationContainer>

            <Tab.Navigator screenOptions={{headerShown:false}}>
                <Tab.Screen 
                    options={{
                        tabBarIcon: (props) => <Icon {...props} name="users" size={20} />,
                    }}
                    name={Tabs.Groups} component={GroupStackNavigator} 
                />
                <Tab.Screen 
                    options={{
                        tabBarIcon: (props) => <Icon {...props} name="user" size={20} />,
                    }}
                    name={Tabs.Friends} component={FriendsStackNavigator} />
                <Tab.Screen 
                    options={{
                        tabBarIcon: (props) => <Icon {...props} name="activity" size={20} />,
                    }}
                    name={Tabs.Activity} component={ActivityStackNavigator} />
                <Tab.Screen 
                    options={{
                        tabBarIcon: (props) => <Icon {...props} name="package" size={20} />,
                    }}
                    name={Tabs.Account} component={AccountStackNavigator} />
            </Tab.Navigator>

        </NavigationContainer>
   );
}

export default MainNavigator;