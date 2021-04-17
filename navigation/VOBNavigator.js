import React from 'react';
import { createSharedElementStackNavigator } from 'react-navigation-shared-element';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from '../screens/Home/HomeScreen';
import OnboardingScreen from '../screens/OnboardingScreen';
import SplashScreen from '../screens/SplashScreen';
import NewPostScreen from '../screens/Home/NewPostScreen';
import CustomBottomTabBar from '../components/CustomBottomTabBar';
import { createStackNavigator } from '@react-navigation/stack';
import DetailArtikelScreen from '../screens/DetailArtikelScreen';
import CommentScreen from '../screens/CommentScreen';
import SubCommentScreen from '../screens/SubCommentScreen';
import FavoriteScreen from '../screens/FavoriteScreen';

const FirstStack = createSharedElementStackNavigator();

export const OnBoardingNavigator = (props) => {
  return (
    <FirstStack.Navigator headerMode="none">
      <FirstStack.Screen name="Onboarding" component={OnboardingScreen} />
    </FirstStack.Navigator>
  );
};

const HomeTab = createBottomTabNavigator();

export const HomeTabNavigator = () => {
  return (
    <HomeTab.Navigator tabBar={(props) => <CustomBottomTabBar {...props} />}>
      <HomeTab.Screen name="HomeTab" component={HomeScreen} />
      <HomeTab.Screen
        name="NewPostTab"
        component={NewPostScreen}
        options={{ title: 'New Post' }}
      />
      <HomeTab.Screen name='FavoriteTab' component={FavoriteScreen} options={{ title: 'Favorite' }} />
    </HomeTab.Navigator>
  );
};

const RootStack = createStackNavigator();

export const RootNavigator = () => {
  return (
    <RootStack.Navigator headerMode="none" initialRouteName="Tabs">
      <RootStack.Screen name="Tabs" component={HomeTabNavigator} />
      <RootStack.Screen name="Detail" component={DetailArtikelScreen} />
      <RootStack.Screen name="Comment" component={CommentScreen} />
      <RootStack.Screen name="SubComment" component={SubCommentScreen} />
    </RootStack.Navigator>
  );
};
