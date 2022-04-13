import React, { Component  } from 'react'
import { View } from 'react-native'
import LottieView from 'lottie-react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

type Props = {};

export default class Splash extends Component<Props> {
    constructor(props: Props) {
        super(props);
        console.log("Process Start")
    }

    render() {
        return (
                <View 
                    style = {{
                        flex: 1,
                        backgroundColor: '#ffffff'
                    }}
                >
                    <LottieView 
                        source={require('../assets/splash_lottie.json')} 
                        autoPlay 
                        loop = {false}
                        onAnimationFinish = { () =>  {
                            console.log('goto _retrieveToken');
                            this._retrieveToken()
                        }}
                    />
                </View>
        )
    }

    _retrieveToken = async () => {
        try {
            const value = await AsyncStorage.getItem('token');
            console.log(value)
            if (value !== null && value !== '') {
                console.log('token exist. goto Main Menu')
                this.props.navigation.replace('Home')
            } else {
                console.log('token wasnt found. goto Login')
                this.props.navigation.replace('Login')
            }
        } catch (error) {
            // Error retrieving data
        }
    }


}