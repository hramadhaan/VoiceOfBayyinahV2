import React from 'react';
import { FlatList, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { Card, Layout, Text } from '@ui-kitten/components';

import PopularItem from './PopularItem';

const PopularComponent = ({ sortData, navigation }) => {
  return (
    <Layout style={{ marginHorizontal: 12, marginBottom: 20 }}>
      <Layout
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 12,
        }}>
        <Text
          category="h6"
          style={{
            fontSize: 16,
            fontFamily: 'Poppins-Bold',
          }}>
          Populer
        </Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('PopulerArticle', {
              title:'Populer',
            })
          }}>
          <Text
            style={{
              fontSize: 10,
              fontFamily: 'Poppins-Regular',
              alignItems: 'center',
            }}>
            See All
        </Text>
        </TouchableOpacity>
      </Layout>
      <FlatList
        nestedScrollEnabled
        data={sortData}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={Dimensions.get('screen').width - 60 + 16}
        decelerationRate={0.6}
        snapToAlignment="center"
        ItemSeparatorComponent={() => {
          return <Layout style={{ margin: 8 }} />;
        }}
        keyExtractor={(item, index) => `popular-item-${item.id}`}
        renderItem={({ item, index }) => {
          return <PopularItem item={item} navigation={navigation} />;
        }}
      />
    </Layout>
  );
};

export default PopularComponent;
