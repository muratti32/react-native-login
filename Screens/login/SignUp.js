import React,{useState} from 'react'
import { StyleSheet, View,Dimensions,Image,TouchableOpacity,TextInput,StatusBar} from 'react-native'
import {Headline,Text,useTheme} from 'react-native-paper'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import * as Animatable from 'react-native-animatable'
import LinearGradient from 'react-native-linear-gradient';

const SignIn = ({navigation}) => {
    const [email,setEmail] = useState("")
    const [isValidEmail,setIsValidEmail] = useState(false)
    const [password,setPassword] = useState()
    const [secureTextEntry,setSecureTextEntry] = useState(false)

    const handleEmail = (text) => {
        setEmail(text)
        if (validateIsEmail(text)){
            setIsValidEmail(true)
            setEmail(text)
        }
        else{
            setIsValidEmail(false)
            setEmail("")
        }
            

    }
    
    const validateIsEmail = (text) => {
            let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            return reg.test(text)
    }

    const changePasswordVisible = (val) => {
        setSecureTextEntry(x => !x)
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                    <Text style={styles.text_header}> Register Now! </Text>
            </View>
            <Animatable.View style={styles.footer}
            animation="fadeInUpBig">
                <View>
                    <Text>E-mail</Text>
                    <View style={styles.action}>
                        <Icon name="account-cowboy-hat" size={27} color="#009387"/>
                        <TextInput
                            label="E-Mail"
                            autoCapitalize="none"
                            type="outlined"
                            placeholder="your email address"
                            style={styles.textInput}
                            onChangeText={text => handleEmail(text)}
                        />
                        {
                        isValidEmail ?
                            <Animatable.View
                            animation="bounceIn">
                                <Icon name="check-circle-outline" size={27} color="#009387"/>
                            </Animatable.View>
                        :
                            null
                        }
                    </View>
                </View>
                <View>
                    <Text>Password</Text>
                    <View style={styles.action}>
                        <Icon name="shield-lock-outline" size={27} color="#009387"/>
                        <TextInput
                            label="E-Mail"
                            type="outlined"
                            placeholder="password"
                            secureTextEntry={secureTextEntry ? true: false}
                            style={styles.textInput}
                        />
                        <TouchableOpacity
                        onPress={changePasswordVisible}
                        >
                            <Icon name={secureTextEntry ? "eye-outline" : "eye-off-outline" } size={27} color="#009387"/>
                        </TouchableOpacity>
                       
                    </View>
                  
                </View>


                <View>
                    <Text>Password again</Text>
                    <View style={styles.action}>
                        <Icon name="shield-lock-outline" size={27} color="#009387"/>
                        <TextInput
                            label="E-Mail"
                            type="outlined"
                            placeholder="password again"
                            secureTextEntry={secureTextEntry ? true: false}
                            style={styles.textInput}
                        />
                        <TouchableOpacity
                        onPress={changePasswordVisible}
                        >
                            <Icon name={secureTextEntry ? "eye-outline" : "eye-off-outline" } size={27} color="#009387"/>
                        </TouchableOpacity>
                       
                    </View>
                  
                </View>
                <View style={styles.button}>
                    <TouchableOpacity onPress={() => {navigation.navigate("signup")}}>
                        <LinearGradient colors={['#08d4c4', '#01ab9d']} style={styles.signIn}>
                            <Text style={styles.textSign}>Sign Up</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>

        
                <TouchableOpacity onPress={() => {navigation.navigate("signin")}}
                style={[styles.signIn,{
                    borderColor:"#009387",
                    borderWidth:1,
                    marginTop:15
                }]}>
                        <Text style={[styles.textSign,{
                            color:"#009387"
                        }]}>Sign In</Text>
                </TouchableOpacity>

            </Animatable.View>
        </View>
    )
}

export default SignIn


const {height} = Dimensions.get("screen");
const height_logo = height * 0.28;

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        backgroundColor: '#009387'
    },
    header: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    footer: {
        flex: 2,
        backgroundColor: '#fff',
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
        alignItems: 'stretch',
        marginTop: 30
    },
    signIn: {
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 9,
        flexDirection: 'row'
    },
    textSign: {
        color: 'white',
        fontWeight: 'bold'
    },
    text_header: {
        alignSelf:"flex-start",
        color:"white",
        fontSize:37,
        fontWeight: 'bold'
    },
    textInput:{
        flex:1,
        color: '#05375a',
        fontSize:19,
    },
    action: {
        flexDirection:"row",
        alignItems: 'center',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
    }
});