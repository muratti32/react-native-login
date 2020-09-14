import React from 'react'
import { Text,useTheme } from 'react-native-paper'
import { View } from 'react-native'
import {createStackNavigator} from '@react-navigation/stack'


import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import StackHeader from "../components/Header"
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

const Tab = createMaterialBottomTabNavigator();

const Stack = createStackNavigator()

function Feed() {

    return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

        <Text>Feed!</Text>
    </View>
    );
}

function Profile() {
    return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Profile!</Text>
    </View>
    );
}

function Notifications() {
    return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Notifications!</Text>
    </View>
    );
}



const TabScreen = () => {

    const theme = useTheme()

    return (
        <Tab.Navigator
        initialRouteName="Feed"
        labelStyle={{ fontSize: 12 }}
        barStyle={{ backgroundColor: theme.colors.bg }}
        >
        <Tab.Screen
            name="Feed"
            component={Feed}
            options={{
            tabBarLabel: 'Home',
            tabBarColor:"#ff1453",
            tabBarIcon: ({ color }) => (
                <Icon name="home" color={color} size={26} />
            ),
            }}
        />
        <Tab.Screen
            name="Notifications"
            component={Notifications}
            options={{
            tabBarLabel: 'Updates',
            tabBarColor:"#24799e",
            tabBarIcon: ({ color }) => (
                <Icon name="bell" color={color} size={26} />
            ),
            }}
        />
        <Tab.Screen
            name="Profile"
            component={Profile}
            options={{
            tabBarLabel: 'Profile',
            tabBarColor:"#ffe066",
            tabBarIcon: ({ color }) => (
                <Icon name="account" color={color} size={26} />
            ),
            }}
        />
        </Tab.Navigator>
    )
}

export default TabScreen
