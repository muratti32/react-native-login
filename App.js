import React,{useState,useEffect,useMemo,useReducer} from 'react'
import { StyleSheet, ActivityIndicator,View,Alert} from 'react-native'

import {NavigationContainer,DarkTheme,DefaultTheme} from '@react-navigation/native'

import {createDrawerNavigator} from '@react-navigation/drawer'

import {DefaultTheme as PaperDefaultTheme,
  DarkTheme as PaperDarkTheme, 
  Provider as PaperProvider} from 'react-native-paper'

import {AuthContext} from './components/context'

import AsyncStorage from '@react-native-community/async-storage';

import RootStackScreen from "./Screens/login/RootStackScreen"
import DetailStack from './Screens/DetailStackScreen'
import HomeStack from './Screens/HomeStackScreen'
import DrawerContent from './components/DrawerContent'

import types from './components/Types'
import Users from './components/model/Users'


const Drawer = createDrawerNavigator()

const App = () => {
    // const [token,setToken] = useState(null)
    // const [isLoading,setIsLoading] = useState(true)

    const defaultTheme =  {
      ...DefaultTheme,
      ...PaperDefaultTheme,
      colors: {
        ...DefaultTheme.colors,
        ...PaperDefaultTheme.colors,
        bg:"#009387",
        signInFooterBG: "#fff",
        menuIconColor:"#fff",
        statusBarBG:"#009387"
      },
    }
  
    const darkTheme =  {
      ...DarkTheme,
      ...PaperDarkTheme,
      colors: {
          ...DarkTheme.colors,
          ...PaperDarkTheme.colors,
          bg:"#001",
          menuIconColor:"#fff",
          signInFooterBG: "#001",
          statusBarBG:"#001"
      },
    }

    const [isDarkTheme,setIsDarkTheme] = useState(false)

    const theme = isDarkTheme ? darkTheme : defaultTheme



    const initialLoginValue = {
      userToken : null,
      isLoading : true,
      userName : null,
    }

    const loginReducer = (prevState, action) => {
      switch (action.type) {
        case types.RETRIEVE_TOKEN : return {
            ...prevState,
            userToken : action.userToken,
            isLoading : false,

        };
        case types.LOGIN : return {
          ...prevState,
          userName : action.userName,
          userToken : action.userToken,
          isLoading : false,
        }
        case types.LOGOUT : return {
          ...prevState,
          userName : null,
          userToken : null,
          isLoading : false,
        }
        case types.REGISTER : return {
          ...prevState,
          userName : action.userName,
          userToken : action.userToken,
          isLoading : false,
        }

      }
    }

    const [loginState,dispatch] = useReducer(loginReducer,initialLoginValue)

    const authContext = useMemo(() => ({
      signIn : (userName,password,userToken) => {
        storeToken(userToken)
        dispatch({type:types.REGISTER, userName: 'user', userToken: userToken} )
      },
      signOut : () => {
        // setToken(null)
        // setIsLoading(false)
        removeToken()
        dispatch({type:types.LOGOUT} )
      },
      signUp: () => {
        // setToken("sdf")
        // setIsLoading(false)
      },
      toggleTheme : () => {
        setIsDarkTheme(isDark => !isDark)
      }
    }),[])


    useEffect(() => {
        setTimeout(() => {
            let userToken = null
             getToken()
              .then(token => {
                userToken = token
                if(userToken !== null)
                  dispatch({type:types.REGISTER,  userToken: userToken} )
              })
              dispatch({type:types.REGISTER,  userToken: userToken} )
            
        },1000)
    },[])


    const storeToken = async (value) => {
      try {
        await AsyncStorage.setItem(types.ASYNC_KEY, value)
      } catch (e) {
        console.log("saving asyncstorage : ",e)
      }
    }


   const getToken = async () => {
      try {
        const value = await AsyncStorage.getItem(types.ASYNC_KEY)
        if(value !== null) {
          // value previously stored
        }
        return value
      } catch(e) {
        // error reading value
      }
    }

    const removeToken = async () => {
      try {
          AsyncStorage.clear()
          console.log("deleted ")
      }catch (e) {
        console.log(e)
      }
    }

 
    const isUserExist = (userName,password) => {
        const user = Users.find(item => item.username === userName && item.password === password)
        const isExist =  user !== undefined ? true : false
        
        if(isExist === false) {
          uyariYap()
        }
        return isExist
    }
    
    const uyariYap = () => {
      Alert.alert("Invalid user!","username or password incorrect",[
        {text: "OKAY"}
      ])
    }
    
    
    
    if(loginState.isLoading){
      return(
        <View style={{alignItems: 'center',flex:1,justifyContent: 'center'}}>
            <ActivityIndicator size="large"/>
        </View>
      )
    }

    return (
      <PaperProvider theme={theme}>
        <AuthContext.Provider value={authContext}>
          <NavigationContainer theme={theme}>
            {
              loginState.userToken !== null ? (
                <Drawer.Navigator initialRouteName="Home" drawerContent={() => <DrawerContent />}>
                  <Drawer.Screen name="homestack" component={HomeStack} />
                  <Drawer.Screen name="details" component={DetailStack} />
                </Drawer.Navigator>
              )
              : 
                <RootStackScreen />          
            }
            
      

          </NavigationContainer> 
        </AuthContext.Provider>
      </PaperProvider>


    )
}

export default App

const styles = StyleSheet.create({})
