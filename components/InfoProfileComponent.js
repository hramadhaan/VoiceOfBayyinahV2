import React from 'react';
import { Dimensions, Image, TouchableOpacity } from 'react-native';
import { Layout, Text } from '@ui-kitten/components';
import Icon from 'react-native-vector-icons/Feather';

const InfoProfileComponent = ({ photoAuth, nameAuth, navigation, typeUser }) => {
  return (
    <Layout
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginHorizontal: 12,
      }}>
      <Layout style={{ flexDirection: 'row' }}>
        <Image
          style={{ width: 45, height: 45, borderRadius: 45 / 2 }}
          source={{ uri: photoAuth }}
        />
        <Layout style={{ flexDirection: 'column', marginLeft: 8 }}>
          <Text style={{ fontSize: 12, fontFamily: 'Poppins-Regular' }}>
            Assalamu'alaikum,
          </Text>
          <Text
            style={{
              marginTop: 3,
            }}
            category="label">
            {nameAuth}
          </Text>
          {typeUser === "1" && <Text style={{fontFamily: 'Poppins-Regular', fontSize: 11, marginTop: 3, color: '#861401'}}>Penulis</Text>}
        </Layout>
      </Layout>
      <TouchableOpacity onPress={() => navigation.navigate('Setting')}>
        <Icon name="settings" size={16} color="black" />
      </TouchableOpacity>
    </Layout>
  );
};

export default InfoProfileComponent;
