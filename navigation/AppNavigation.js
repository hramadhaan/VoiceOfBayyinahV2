import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import analytics from '@react-native-firebase/analytics';

import {
  HomeTabNavigator,
  OnBoardingNavigator,
  RootNavigator,
} from './VOBNavigator';
import SplashScreen from '../screens/SplashScreen';

const AppNavigation = (props) => {
  const isAuth = useSelector((state) => !!state.auth.uid);
  const didTryAutoLogin = useSelector((state) => state.auth.didTryAutoLogin);

  const routeNameRef = React.useRef();
  const navigationRef = React.useRef();

  return (
    <NavigationContainer ref={navigationRef}>
      {isAuth && <RootNavigator />}
      {!isAuth && didTryAutoLogin && <OnBoardingNavigator />}
      {!isAuth && !didTryAutoLogin && <SplashScreen />}
      {/* <SplashScreen /> */}
    </NavigationContainer>
  );
};

export default AppNavigation;
