import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import * as authAction from '../store/actions/auth';
import {useDispatch} from 'react-redux';

const SplashScreen = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const tryLogin = async () => {
      const userData = await AsyncStorage.getItem('userData');
      console.log(userData);
      if (!userData) {
        // props.navigation.navigate('Auth');
        dispatch(authAction.setDidTryAL());
      } else {
        const transformedData = JSON.parse(userData);
        const {uid, email, name, image, typeUser} = transformedData;
        dispatch(authAction.authentication(uid, email, name, image, typeUser));
      }
    };
    tryLogin();
  }, [dispatch]);

  return (
    <View style={styles.main}>
      <Text>Ini Splash Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default SplashScreen;
