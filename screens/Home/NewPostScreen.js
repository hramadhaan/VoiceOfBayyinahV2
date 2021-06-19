import React, { useEffect } from 'react';
import { View, Text, FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import LottieView from 'lottie-react-native'

import HeaderComponent from '../../components/HeaderComponent';
import * as artikelAction from '../../store/actions/artikel'
import CardItem from '../../components/CardItem';

const NewPostScreen = (props) => {
  const dispatch = useDispatch()
  const artikel = useSelector(state => state.artikel)

  useEffect(() => {
    dispatch(artikelAction.articleFetch())
  }, [dispatch])
  return (
    <View>
      <HeaderComponent navigation={props.navigation} search title='New Post' />
      {artikel.loading ? <LottieView
        style={{
          height: 120,
          alignSelf: 'center'
        }}
        source={require('../../components/Lottie/loading.json')}
        autoPlay
        loop
      /> : <FlatList data={artikel.artikels} keyExtractor={item => `item-new-post-${item.id}`} renderItem={({ item, index }) => {
        return (
          <CardItem item={item} navigation={props.navigation} />
        )
      }} />}
    </View>
  );
};

export default NewPostScreen;
