import React from 'react';
import {Layout, Text, Input} from '@ui-kitten/components';
import {Dimensions, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

const SearchHomeComponent = (props) => {
  const {width} = Dimensions.get('screen');
  return (
    <TouchableOpacity
      onPress={() => alert('Hello')}
      style={{marginTop: 14, paddingHorizontal: 12}}>
      <Layout
        style={{
          width: width,
          height: 36,
          paddingHorizontal: 10,
          alignItems: 'center',
          flexDirection: 'row',
          borderRadius: 10,
        }}
        level="2">
        <Icon name="search" size={20} color="rgba(0,0,0,0.5)" />
        <Text style={{marginLeft: 19, color: 'rgba(0,0,0,0.5)'}}>
          Cari Artikel
        </Text>
      </Layout>
    </TouchableOpacity>
  );
};

export default SearchHomeComponent;
