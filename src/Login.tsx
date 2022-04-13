import React, { Component, Fragment } from 'react';
import styles from './Style';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { NavigationScreenProp } from 'react-navigation';

import {
    TextInput,
    Image,
    Text,
    View,
    TouchableOpacity,
    Alert,
    SafeAreaView,
    PermissionsAndroid
} from 'react-native';

type Props = {
    navigation: NavigationScreenProp<any,any>
};

export default class LoginForm extends Component<Props> {
    constructor(props: Props) {
        super(props);
        console.log("Process Start")
    }

    state = {
        email: '',
        password: '',
        token: '',
        backgroundColorUser: '#FFFFFF',
        backgroundColorPass: '#FFFFFF',
    };

    

    render() {

        const iconImage = require('../resources/iconLogin.jpeg');

        return (

            <Fragment>
                <SafeAreaView style={{ flex: 0, backgroundColor: '#82bac6' }} />
            
            <SafeAreaView style={styles.safeArea}>
            <View style={styles.loginformcontainer}>

                

                <Image source = { iconImage } style={styles.logo} />
       
                <View style={styles.inputView}>
                    <Text style={styles.loginFieldsText}>Usuario</Text>
                    <TextInput style={[styles.input2, { backgroundColor: this.state.backgroundColorUser }]}
                        underlineColorAndroid="transparent"
                        autoCapitalize="none"
                        onChangeText={value => this.setState({ email: value })}
                        value={this.state.email}>
                    </TextInput>
                </View>

                <View style={styles.inputView}>
                    <Text style={styles.loginFieldsText}>Contraseña</Text>
                    <TextInput style={[styles.input2, { backgroundColor: this.state.backgroundColorPass }]}
                        underlineColorAndroid="transparent"
                        secureTextEntry={true}
                        autoCapitalize="none"
                        onChangeText={(value) => this.setState({ password: value })}
                        value={this.state.password}>
                    </TextInput>
                </View>   
                <TouchableOpacity
                    style={styles.registerScreenButton}
                    onPress={() => this._validateFields()}
                    /*onPress={this._login.bind( this )}*/>
                    <Text style={styles.loginText}>Iniciar Sesión</Text>
                </TouchableOpacity>
                    
            </View>

            </SafeAreaView>
            </Fragment>
        );
    }

    _validateFields() {
        if (this.state.email == '') {
            this.setState({ backgroundColorUser: 'red' });
            this.setState({ backgroundColorPass: '#FFFFFF' });
        } else if (this.state.password == '') {
            this.setState({ backgroundColorUser: '#FFFFFF' });
            this.setState({ backgroundColorPass: 'red' });
        } else {
            if (!this._validateEmail(this.state.email)) {
                this.setState({ backgroundColorUser: 'red' });
                this.setState({ backgroundColorPass: '#FFFFFF' });
                Alert.alert("INGRESE UN EMAIL VALIDO")
            } else {
                this._login();
            }
        }
    }

    _validateEmail = (email: string) => {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    };

   
    _login() {
        fetch('https://reqres.in/api/login' ,{
        method:'POST',
        headers:{
        'Accept':'application/json',
        'Content-Type':'application/json',
        },
        body:JSON.stringify({
            email: this.state.email,
            password: this.state.password
        })

        })
        .then((response) => {

            if (response.ok) {

                response.json().then((data) => {
            
                    this.setState({token: data.token});
                    console.log(this.state.token)
                    this._storeData();

                    this.props.navigation.navigate('Home')
                })
            }  else if (response.status === 400) {
                Alert.alert("  LOGIN FAILED!");
            }

            //this.FunctionToOpenSecondActivity();
            
            /*if (res.respuesta.codigo === '00') {
                /*Alert.alert("global.merchantCode:" + " " + global.merchantCode);*/
                /*global.merchantName = res.detalleUsuario.establecimientoNombre;
                global.merchantCode = res.detalleUsuario.establecimientoCodigo;
                global.userCode = res.detalleUsuario.usuarioCodigo
                global.userType = res.detalleUsuario.tipoUsuario;
                this.FunctionToOpenSecondActivity();
            } else {
                Alert.alert("  mensajeRespuesta:" + " " +  res.respuesta.mensaje);
            }*/
        })      

    }

    _storeData = async () => {
        try {
            await AsyncStorage.setItem('token', this.state.token);
        } catch (error) {
            // Error saving data
        }
      }


}

