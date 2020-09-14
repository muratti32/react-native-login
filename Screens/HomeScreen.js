import React from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'

const HomeScreen = ({navigation}) => {
    return (
        <View style={styles.container}>
            <Text>Homescreen</Text>
            <Button title="go to Details"
                onPress={() => navigation.navigate("details")}
            />
        </View>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    container : {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
})
