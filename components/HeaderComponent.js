import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';

const HeaderComponent = ({title, search, navigation}) => {
  const inset = useSafeAreaInsets();
  return (
    <View
      style={{
        height: 53,
        width: '100%',
        marginTop: inset.top,
        paddingHorizontal: 12,
        justifyContent: 'center',
        backgroundColor: 'white',
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        {navigation && (
          <TouchableOpacity
            style={{position: 'absolute', left: 0}}
            onPress={() => navigation.goBack()}>
            <Icon name="arrow-back-outline" size={22} />
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
          <TouchableOpacity style={{position: 'absolute', right: 0}}>
            <Icon name="search-outline" size={22} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default HeaderComponent;
