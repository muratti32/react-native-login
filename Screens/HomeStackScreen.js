import React from 'react'
import { View, Text } from 'react-native'
import {createStackNavigator} from '@react-navigation/stack'

import HomeScreen from './HomeScreen'
import Details from './Details'
import Tabs from './TabScreen'
import Icon from 'react-native-vector-icons/MaterialIcons'
import StackHeader from "../components/Header"

const Stack = createStackNavigator()


const HomeStackScreen = ({navigation}) => {
    return (
        <Stack.Navigator
            headerMode="screen"
            screenOptions={{header: ({scene,previous,navigation}) => 
            (<StackHeader scene={scene} previous={previous} navigation={navigation}/>)}}
        >
            <Stack.Screen name="home" component={Tabs}  />
        </Stack.Navigator>
    )
}

export default HomeStackScreen
