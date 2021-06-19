import React, {useEffect, useState} from 'react';
import {View, Text, Button, StatusBar, Alert} from 'react-native';
import {applyMiddleware, combineReducers, createStore} from 'redux';
import logger from 'redux-logger';
import {Provider} from 'react-redux';
import Thunk from 'redux-thunk';
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import * as eva from '@eva-design/eva';
import messaging from '@react-native-firebase/messaging';
import 'react-native-gesture-handler';
import {FeatherIconsPack} from './theme/FeatherIcons';

import {default as theme} from './theme/ui-kitten-theme.json'; // <-- Import app theme
import {default as mapping} from './theme/ui-kitten-theme-mapping.json';
import AppNavigation from './navigation/AppNavigation';
import authReducer from './store/reducers/auth';
import categoryReducer from './store/reducers/category';
import bannerReducer from './store/reducers/banner';
import artikelReducer from './store/reducers/artikel';
import userReducer from './store/reducers/user';
import commentReducer from './store/reducers/comment';

const App = (props) => {
  const rootReducer = combineReducers({
    auth: authReducer,
    category: categoryReducer,
    banner: bannerReducer,
    artikel: artikelReducer,
    user: userReducer,
    comment: commentReducer,
  });
  const store = createStore(rootReducer, applyMiddleware(Thunk, logger));

  messaging().setBackgroundMessageHandler(async (remoteMessage) => {
    console.log('Message handled in the background!', remoteMessage);
  });

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });
    return unsubscribe;
  }, []);

  return (
    <>
      <Provider store={store}>
        <IconRegistry icons={FeatherIconsPack} />
        <ApplicationProvider
          {...eva}
          theme={{...eva.light, ...theme}}
          customMapping={mapping}>
            <StatusBar barStyle='dark-content' />
          <AppNavigation />
        </ApplicationProvider>
      </Provider>
    </>
  );
};

export default App;
