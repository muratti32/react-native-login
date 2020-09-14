import React,{useState,useEffect,useContext} from 'react'
import { StyleSheet,  View } from 'react-native'
import { Text, Button } from 'react-native-paper'
import {AuthContext} from '../../components/context'

import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes,
} from '@react-native-community/google-signin';

import Spinner from 'react-native-loading-spinner-overlay';


const GoogleButton = (props) => {

const [showSpinner,setShowSpinner] = useState(true)
const [isSignedIn,setIsSignedIn] = useState(false)

const {signIn} = useContext(AuthContext)


useEffect(() => {
    GoogleSignin.configure({
    webClientId: `645662983220-05mhl6ivev3dmgh8d64p6il9j8ehg0kh.apps.googleusercontent.com`,
    offlineAccess: true, 
    forceCodeForRefreshToken: true,
    });

    checkIsSignedIn()
},[])


const getCurrentUserInfo = async () => {
    try {
    const userInfo = await GoogleSignin.signInSilently();
    console.log( userInfo );
    } catch (error) {
    if (error.code === statusCodes.SIGN_IN_REQUIRED) {
        console.log("user has not signed in yet" );
    } else {
        console.log("// some other error");
        
    }
    }
};

const signInToGoogle = async () => {
    try {
    await GoogleSignin.hasPlayServices();
    const info = await GoogleSignin.signIn();
    setIsSignedIn(true)
    signIn(info.user.email,"null",info.idToken)
    console.log(info);
    } catch (error) {
    if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log("SIGN_IN_CANCELLED :");
        // user cancelled the login flow
    } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log("operation (e.g. sign in) is in progress already :");
        // operation (e.g. sign in) is in progress already
    } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log("play services not available or outdated");
        // play services not available or outdated
    } else {
        console.log("some other error happened : "+error);
        // some other error happened
    }
    }
};


const signOut = async () => {
    try {
    await GoogleSignin.revokeAccess();
    await GoogleSignin.signOut();
    setIsSignedIn(false)
    } catch (error) {
    console.error(error);
    }
};

const checkIsSignedIn = async () => {
    console.log( "setIsSignedIn kontrol ediliyor")
    const isSignedIn = await GoogleSignin.isSignedIn();
    setShowSpinner(false)
    setIsSignedIn(isSignedIn)
    getCurrentUserInfo()
};





    return (
        <View {...props}>
            <GoogleSigninButton
             style={{ width: "100%", height: 48 }}
             size={GoogleSigninButton.Size.Wide}
             color={GoogleSigninButton.Color.Dark}
            onPress={() => signInToGoogle()}/>

           
        </View>
    )
}

export default GoogleButton

const styles = StyleSheet.create({
    signIn: {
        height: 40,
        justifyContent: "space-around",
        borderRadius: 9,
        borderWidth:1,
        borderColor:"#009387",
        borderWidth:1,
        marginTop:15
    
    },
    GoogleButton:{
        flex:1,
        alignItems: 'stretch'
    }
})
