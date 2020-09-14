import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import {createStackNavigator} from '@react-navigation/stack'

import HomeScreen from './HomeScreen'
import Details from './Details'
import StackHeader from "../components/Header"


const Stack = createStackNavigator()


const DetailStackScreen = () => {
    return (
            <Stack.Navigator
            headerMode="screen"
            screenOptions={{header: ({scene,previous,navigation}) => 
            (<StackHeader scene={scene} previous={previous} navigation={navigation}/>)}}
            >
                <Stack.Screen name="details" component={Details}/>

         
            </Stack.Navigator>
    )
}

export default DetailStackScreen

const styles = StyleSheet.create({})
