import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AddUserScreen from './screens/AddUserScreen';
import UsersListScreen from './screens/UserListScreen';
import UserDetailScreen from './screens/UserDetailScreen';



const Stack = createStackNavigator();

function MyStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="AddUserScreen" component={AddUserScreen} />
            <Stack.Screen name="UsersListScreen" component={UsersListScreen} />
            <Stack.Screen name="UserDetailScreen" component={UserDetailScreen} />
        </Stack.Navigator>
    );
}



export default function App() {
    return (
        <NavigationContainer>
            <MyStack />
        </NavigationContainer>
    );
}



