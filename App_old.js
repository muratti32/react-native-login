import React,{useEffect,useState} from 'react'
import { StyleSheet, Text, View, Button, SafeAreaView } from 'react-native'

import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-community/google-signin';

import Spinner from 'react-native-loading-spinner-overlay';


const App = () => {

  const [showSpinner,setShowSpinner] = useState(true)
  const [isSignedIn,setIsSignedIn] = useState(false)


  useEffect(() => {
    console.log("halo")
    GoogleSignin.configure({
      webClientId: `645662983220-05mhl6ivev3dmgh8d64p6il9j8ehg0kh.apps.googleusercontent.com`,
      offlineAccess: true, 
      forceCodeForRefreshToken: true,
    });

  // getCurrentUserInfo()
    checkIsSignedIn()
  },[])


  const getCurrentUserInfo = async () => {
    console.log( "getCurrentUserInfo" );
  
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

  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const info = await GoogleSignin.signIn();
      setIsSignedIn(true)
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
  

  signOut = async () => {
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
    <SafeAreaView>

        <Spinner
          visible={showSpinner}
          textContent={'Loading...'}
          textStyle={styles.spinnerTextStyle}
        />

    
      <Text>isSignedIn : {isSignedIn?"true":"false"}</Text>
      {
        isSignedIn ? (
          <Button title="sign out" onPress={signOut} />
        ):
        (
          <GoogleSigninButton onPress={signIn} />

        )
      }
    </SafeAreaView>
  )
}

export default App

const styles = StyleSheet.create({
  spinnerTextStyle: {
    color: '#FFF'
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  },
})
