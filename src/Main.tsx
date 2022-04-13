import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { create } from "react-test-renderer";

import Splash from './Splash';
import Home from './MainMenu'
import Login from './Login'

const MainNavigator  = createStackNavigator ({

    Splash : {screen: Splash},
    Home : {screen: Home},
    Login : {screen: Login}


    }, {
        headerMode: 'none',
        navigationOptions: {
            headerVisible: false
        }
});

export default createAppContainer (
    MainNavigator
)