import React,{useContext} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { LoginButton, AccessToken,GraphRequest, GraphRequestManager } from 'react-native-fbsdk';
import {AuthContext} from '../../components/context'

const FaceBookButton = () => {
    const {signIn} = useContext(AuthContext)

_responseInfoCallback = (error, result) => {
    if (error) {
        console.log('Error fetching data: ' + error.toString());
    } else {
        console.log("result : ",result);
    }
    }


const infoRequest = new GraphRequest(
    '/me?fields=email,name,picture',
    null,
    this._responseInfoCallback,
  );


    return (
        <View>
            <LoginButton
            style={{width:"100%",height:30,marginTop:15}}
            contentStyle={{fontSize:17}}
            publishPermissions={['publish_actions']}
            readPermissions={['public_profile']}
            onLoginFinished={
                (error, result) => {
                if (error) {
                    alert("Login failed with error: " + error.message);
                } else if (result.isCancelled) {
                    alert("Login was cancelled");
                } else {
                    AccessToken.getCurrentAccessToken().then(
                        (data) => {
                            new GraphRequestManager().addRequest(infoRequest).start();
                            //console.log(data)
                        }
                    )
                }
                }
            }
            onLogoutFinished={() => alert("User logged out")}/>
    </View>
    )
}

export default FaceBookButton

const styles = StyleSheet.create({})
