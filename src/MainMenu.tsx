import  React, { Component, Fragment, useState, useEffect } from 'react';
import { Pressable, View, Text, SafeAreaView } from 'react-native';
import styles from './Style';

type Props = {};

export default class App extends Component {

    
  constructor(props: Props) {
    super(props);
  }


    render() {

      return (
          <Fragment>
            <SafeAreaView style={{ flex: 0, backgroundColor: '#82bac6' }} />
      
              <SafeAreaView style={styles.safeArea}>  
            </SafeAreaView>
        </Fragment>
      );
    }

}

