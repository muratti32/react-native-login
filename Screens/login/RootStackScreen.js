import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import {createStackNavigator} from '@react-navigation/stack'

import SingIn from './SingIn'
import SignUp from './SignUp'
import SplashScreen from './SplashScreen'




const RootStack = createStackNavigator()


const RootStackScreen = () => {
    return (
        <RootStack.Navigator headerMode="none">
            <RootStack.Screen name="splash" component={SplashScreen}/>
            <RootStack.Screen name="signin" component={SingIn}/>
            <RootStack.Screen name="signup" component={SignUp}/>
        </RootStack.Navigator>
    )
}

export default RootStackScreen

const styles = StyleSheet.create({})
