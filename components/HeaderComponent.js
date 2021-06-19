import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';

const HeaderComponent = ({ title, search,back, navigation, searchBar, searchText, onSubmit, valueSearch, close, setClose }) => {

  const inset = useSafeAreaInsets()
  const renderSearchBar = (
    <View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        {navigation && (
          <TouchableOpacity
            style={{ position: 'absolute', left: 0 }}
            onPress={() => navigation.goBack()}>
            <Icon name="arrow-back-outline" size={22} />
          </TouchableOpacity>
        )}
        <View style={{ width: '80%', backgroundColor: 'white', height: 20 }}>
          <TextInput placeholder='Apa yang kamu ingin cari ?'
            placeholderTextColor='grey'
            returnKeyType='search'
            numberOfLines={1}
            autoCorrect={false}
            value={valueSearch}
            onSubmitEditing={() => {
              onSubmit()
            }}
            autoFocus
            onChangeText={(value) => {
              searchText(value)
            }} />
        </View>
        <TouchableOpacity style={{ position: 'absolute', right: 0 }} onPress={() => searchText('')}>
          <Icon name="close-outline" size={22} color='black' />
        </TouchableOpacity>
      </View>
    </View>
  )

  return (
    <View
      style={{
        height: 50 * 2,
        width: '100%',
        paddingTop: inset.top,
        paddingHorizontal: 12,
        justifyContent: 'center',
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd'
      }}>
      {searchBar ? renderSearchBar : <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        {back && (
          <TouchableOpacity
            style={{ position: 'absolute', left: 0 }}
            onPress={() => navigation.goBack()}>
            <Icon name="arrow-back-outline" size={22} />
          </TouchableOpacity>
        )}
        {close && (
          <TouchableOpacity
          style={{ position: 'absolute', left: 0 }}
          onPress={() => setClose(false)}>
          <Icon name="close" size={22} />
        </TouchableOpacity>
        )}
        <View>
          <Text
            style={{
              fontSize: 16,
              fontFamily: 'Poppins-Bold',
              lineHeight: 24,
            }}>
            {title}
          </Text>
        </View>
        {search && (
          <TouchableOpacity style={{ position: 'absolute', right: 0 }} onPress={() => { navigation.navigate('Search') }}>
            <Icon name="search-outline" size={22} />
          </TouchableOpacity>
        )}
      </View>}
    </View>
  );
};

export default HeaderComponent;
