import React, { useCallback, useEffect, useRef, useMemo, useState } from 'react';
import {
  View,
  Dimensions,
  ScrollView,
  Image,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/Feather';
import LottieView from 'lottie-react-native';
import messaging from '@react-native-firebase/messaging';

import * as authAction from '../../store/actions/auth';
import { Layout, Text } from '@ui-kitten/components';
import InfoProfileComponent from '../../components/InfoProfileComponent';
import SearchHomeComponent from '../../components/SearchHomeComponent';
import TreeCategoryComponent from '../../components/TreeCategory';

import * as categoryAction from '../../store/actions/category';
import * as bannerAction from '../../store/actions/banner';
import * as artikelAction from '../../store/actions/artikel';
import * as userAction from '../../store/actions/user';

import CarouselHome from '../../components/CarouselHome';
import PopularComponent from '../../components/PopularComponent';
import BottomSheet, {
  BottomSheetFlatList,
  useBottomSheet,
  BottomSheetBackdrop,
} from '@gorhom/bottom-sheet';

const HomeScreen = (props) => {
  const dispatch = useDispatch();

  const photoAuth = useSelector((state) => state.auth.image);
  const nameAuth = useSelector((state) => state.auth.name);
  const category = useSelector((state) => state.category);
  const banner = useSelector((state) => state.banner);
  const artikel = useSelector((state) => state.artikel);
  const user = useSelector((state) => state.user);

  const [isRefresh, setIsRefreshing] = useState(false);

  // ref
  const bottomSheetRef = useRef();

  // variables
  const snapPoints = useMemo(() => ['0%', '60%', '90%'], []);

  const handleSnapPress = useCallback((index) => {
    bottomSheetRef.current?.snapTo(index);
  }, []);

  const logout = useCallback(async () => {
    try {
      await dispatch(authAction.logout());
    } catch (err) {
      console.log(err);
    }
  });

  const insets = useSafeAreaInsets();

  useEffect(() => {
    dispatch(categoryAction.fetchCategory());
    dispatch(bannerAction.fetchBanner());
    dispatch(artikelAction.artikelSortPopular(5));
    dispatch(userAction.fetchUsers());
  }, [dispatch]);

  const requestPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
      const token = await messaging().getToken();
      console.log('Token Device: ', token);
    }
  };

  const refreshingData = useCallback(async () => {
    setIsRefreshing(true);
    try {
      dispatch(categoryAction.fetchCategory());
      dispatch(bannerAction.fetchBanner());
      dispatch(artikelAction.artikelSortPopular(5));
      dispatch(userAction.fetchUsers());
    } catch (err) {
      console.log(err);
    }
    setIsRefreshing(false);
  }, [dispatch]);

  useEffect(() => {
    requestPermission();
  }, []);

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={isRefresh} onRefresh={refreshingData} />
      }
      style={{
        paddingTop: Math.max(insets.top, 16),
        flex: 1,
        backgroundColor: 'white',
      }}>
      <Layout style={{ flex: 1 }}>
        <InfoProfileComponent nameAuth={nameAuth} photoAuth={photoAuth} navigation={props.navigation} />
        <SearchHomeComponent navigation={props.navigation} />
        {!banner.loading ? (
          <CarouselHome banner={banner.banners} />
        ) : (
          <View style={{ width: Dimensions.get('screen').width, height: 98 }}>
            <LottieView
              source={require('../../components/Lottie/loading.json')}
              autoPlay
              loop
            />
          </View>
        )}
        {category.loading ? (
          <View style={{ width: Dimensions.get('screen').width, height: 98 }}>
            <LottieView
              source={require('../../components/Lottie/loading.json')}
              autoPlay
              loop
            />
          </View>
        ) : (
          <TreeCategoryComponent
            navigation={props.navigation}
            category={category.categories}
            pressLainnya={() => {
              handleSnapPress(2);
            }}
          />
        )}
        {artikel.loading || user.loading ? (
          <View style={{ width: Dimensions.get('screen').width, height: 98 }}>
            <LottieView
              source={require('../../components/Lottie/loading.json')}
              autoPlay
              loop
            />
          </View>
        ) : (
          <PopularComponent
            sortData={artikel.sortArtikels}
            navigation={props.navigation}
          />
        )}
        {!category.loading && (
          <BottomSheet
            ref={bottomSheetRef}
            index={0}
            snapPoints={snapPoints}
            backdropComponent={BottomSheetBackdrop}>
            <BottomSheetFlatList
              data={category.categories}
              keyExtractor={(item) => `bottom-sheet-${item.id}`}
              contentContainerStyle={{
                flex: 1,
                padding: 12,
              }}
              ItemSeparatorComponent={() => {
                return <Layout style={{ marginVertical: 12 }} />;
              }}
              renderItem={({ item, index }) => {
                return (
                  <TouchableOpacity onPress={() => {
                    props.navigation.navigate('CategoryArticle', {
                      title: item.name,
                      id: item.id
                    })
                  }}>
                    <Layout
                      style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <Image
                        source={{ uri: item.image }}
                        style={{ width: 39, height: 39, marginRight: 8 }}
                      />
                      <Text>{item.name}</Text>
                    </Layout>
                  </TouchableOpacity>
                );
              }}
            />
          </BottomSheet>
        )}
      </Layout>
    </ScrollView>
  );
};

export default HomeScreen;
