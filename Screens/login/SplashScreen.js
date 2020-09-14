import React from 'react'
import LinearGradient from 'react-native-linear-gradient';

import { StyleSheet, View,Dimensions,Image,TouchableOpacity} from 'react-native'
import {Headline,Text,useTheme} from 'react-native-paper'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import * as Animatable from 'react-native-animatable'

const SplashScreen = ({navigation}) => {

    const theme = useTheme()

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Animatable.Image 
                    animation="bounceIn"
                    source={require("../../components/assest/logo.png")}
                    style={styles.logo}
                    resizeMode="stretch"
                />
            </View>
            <Animatable.View
            animation="fadeInUp"
            style={[styles.footer,{
                backgroundColor: theme.colors.bg
            }]}>
                
                 <Headline style={styles.title}>Stay connected with everyone</Headline> 
                 <Text style={styles.text}>Sign in with your Account</Text> 
                
                <View style={styles.button} >
                    <TouchableOpacity onPress={() => {navigation.navigate("signin")}}>
                        <LinearGradient colors={['#08d4c4', '#01ab9d']} style={styles.signIn}>
                           <Text style={styles.textSign}>Get Started</Text>
                           <Icon style={styles.textSign} name="chevron-right" size={24}/>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>

            </Animatable.View>
        </View>
    )
}

export default SplashScreen

const {height} = Dimensions.get("screen");
const height_logo = height * 0.28;

const styles = StyleSheet.create({

    container: {
        flex: 1, 
        backgroundColor: '#009387'
    },
    header: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    footer: {
        flex: 1,
        backgroundColor: "#fff",
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingVertical: 50,
        paddingHorizontal: 30
    },
    logo: {
        width: height_logo,
        height: height_logo
    },
    title: {
        color: '#05375a',
        fontSize: 30,
        fontWeight: 'bold'
    },
    text: {
        color: 'grey',
        marginTop:5
    },
    button: {
        alignItems: 'flex-end',
        marginTop: 30
    },
    signIn: {
        width: 150,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        flexDirection: 'row'
    },
    textSign: {
        color: 'white',
        fontWeight: 'bold'
    }
});
