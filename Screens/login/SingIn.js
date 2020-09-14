import React,{useState} from 'react'
import { StyleSheet, View,Dimensions,Image,TouchableOpacity,TextInput,Alert,Platform} from 'react-native'
import {Headline,Text,useTheme} from 'react-native-paper'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import * as Animatable from 'react-native-animatable'
import LinearGradient from 'react-native-linear-gradient';
import GoogleButton from './GoogleButton'
import FaceBookLoginButton from './FaceBookButton'

const SignIn = ({navigation}) => {
    const [email,setEmail] = useState("")
    const [isValidEmail,setIsValidEmail] = useState(null)
    const [isValidPassword,setIsValidPassword] = useState(null)
    const [password,setPassword] = useState("")
    const [secureTextEntry,setSecureTextEntry] = useState(false)


    const handleEmail = (text) => {
        setEmail(text)
        // if (validateIsEmail(text)){
        //     setIsValidEmail(true)
        //     setEmail(text)
        // }
        // else{
        //     setEmail("")
        // }
    }
    
    const validateIsEmail = (text) => {
            let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            return reg.test(text)
    }

    const changePasswordVisible = (val) => {
        setSecureTextEntry(x => !x)
    }

    const handleSignIn = () => {
        if (isValidEmail && isValidPassword){
            signIn(email,password,"asdf")
        } else {
            uyariYap()
        }
    }

    const handleOnEndEditing = () => {
        if (validateIsEmail(email)){
            setIsValidEmail(true)
        }
        else{
            setIsValidEmail(false)
        }
    }

    const handleOnEndEditPassword = () => {
        if(password.length < 4)
            setIsValidPassword(false)
        else
            setIsValidPassword(true)
    }
    
    const handleOnChangePassword = (text) => {
        setPassword(text)
    }
    
    const uyariYap = () => {
        Alert.alert("Invalid user!","username or password incorrect",[
            {text: "OKAY"}
        ])
    }

    const theme = useTheme()


    return (
        <View style={styles.container}>
            <View style={styles.header}>
                    <Text style={styles.text_header}> Welcome! </Text>
            </View>
            <Animatable.View style={[styles.footer,{
                backgroundColor:theme.colors.signInFooterBG
            }]}
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
                            keyboardType="email-address"
                            style={styles.textInput}
                            onChangeText={text => handleEmail(text)}
                            onEndEditing={() => handleOnEndEditing()}
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
                    {
                        (isValidEmail !== null && isValidEmail === false) && (
                            <Animatable.View animation="fadeInLeft" duration={500}>
                                <Text style={styles.errorMsg}>user name must be valid email</Text>
                            </Animatable.View>
                        )
                    }
                    
                </View>
                <View>
                    <Text>Password</Text>
                    <View style={styles.action}>
                        <Icon name="shield-lock-outline" size={27} color="#009387"/>
                        <TextInput
                            label="E-Mail"
                            type="outlined"
                            placeholder="password"
                            onChangeText={text => handleOnChangePassword(text) }
                            onEndEditing={() => handleOnEndEditPassword()}
                            secureTextEntry={secureTextEntry ? true: false}
                            style={styles.textInput}
                        />
                        <TouchableOpacity
                        onPress={changePasswordVisible}
                        >
                            <Icon name={secureTextEntry ? "eye-outline" : "eye-off-outline" } size={27} color="#009387"/>
                        </TouchableOpacity>
                    </View>
                    {
                        (isValidPassword !== null && isValidPassword === false ) ? (
                            <Animatable.View animation="fadeInLeft" duration={500}>
                                <Text style={styles.errorMsg}>password minimum length is 4 characters</Text>
                            </Animatable.View>
                        ):
                        null
                        
                    }
                </View>
                <View style={styles.button}>
                    <TouchableOpacity onPress={handleSignIn}>
                        <LinearGradient colors={['#08d4c4', '#01ab9d']} style={styles.signIn}>
                            <Text style={styles.textSign}>Sign in</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>

        
                <TouchableOpacity onPress={() => {navigation.navigate("signup")}}
                style={[styles.signIn,{
                    borderColor:"#009387",
                    borderWidth:1,
                    marginTop:15
                }]}>
                        <Text style={[styles.textSign,{
                            color:"#009387"
                        }]}>Sign up</Text>
                </TouchableOpacity>
                
                <GoogleButton  style={{ marginTop:15}} />

                <FaceBookLoginButton />
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
    },
    errorMsg: {
        color: '#FF0000',
        fontSize: 14,
        marginBottom: 10,
    },
});