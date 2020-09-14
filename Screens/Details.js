import React from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'

const Details = ({navigation}) => {
    return (
        <View style={styles.container}>
            <Text>Details</Text>
            <Button 
                title="goto navigation again"
                onPress={() =>navigation.push("details")}
            />
            <Button 
                title="goto home"
                onPress={() =>navigation.navigate("home")}
            />
            <Button 
                title="go back"
                onPress={() =>navigation.goBack()}
            />
            <Button 
                title="go to top screen"
                onPress={() =>navigation.popToTop()}
            />
            
        </View>
    )
}

export default Details

const styles = StyleSheet.create({
    container : {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
})
