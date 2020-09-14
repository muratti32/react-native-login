/*
Stack screen default animasyonlarını react-native-paper ile değiştirmek
için bunu kullanıyoruz.
*/
import React from 'react'
import { View, StatusBar, TouchableOpacity } from 'react-native'
import {Avatar,Appbar,useTheme} from 'react-native-paper'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

const Header = ({scene,previous,navigation}) => {
    const {options} = scene.descriptor

    const title = options.headerTitle !== undefined ? 
    options.headerTitle : 
    options.title !== undefined ?
    options.title : scene.route.name

    const theme = useTheme()

    return (
        <Appbar.Header
        style={{backgroundColor:theme.colors.bg}}
        >
            <StatusBar backgroundColor={theme.colors.statusBarBG} barStyle={ theme.dark ? "light-content" : "dark-content"}/>
            { previous ? (
                    <Appbar.BackAction
                        onPress={() => navigation.goBack()}
                    />
                ):(
                    <TouchableOpacity
                    onPress={() => {navigation.toggleDrawer()}}>
                
                            <Avatar.Icon
                                color={theme.colors.menuIconColor}
                                icon="menu"
                                size={45}
                                backgroundColor={theme.colors.bg}
                            />

                    </TouchableOpacity>
                )}
                <Appbar.Content
                    titleStyle={{alignSelf:"center"}}
                    title ={previous ? title : <Icon size={40} name="facebook"/>}
                />
        </Appbar.Header>
    )
}

export default Header
