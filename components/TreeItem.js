import React, {useState} from 'react';
import {Layout, Text} from '@ui-kitten/components';
import {Image, TouchableOpacity} from 'react-native';
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';

const TreeItem = ({text, image, id, lainnya}) => {
  const [showShimmer, setShowShimmer] = useState(false);
  return (
    <TouchableOpacity
      style={{
        alignItems: 'center',
        flex: 1,
      }}
      onPress={id === 'lainnya' ? lainnya : null}>
      <Layout
        style={{
          alignItems: 'center',
          flex: 1,
        }}>
        <Layout
          style={{
            padding: 10,
            borderWidth: 1,
            borderColor: 'rgba(0,0,0,0.2)',
            borderRadius: 10,
            width: 56,
            height: 56,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <ShimmerPlaceholder
            height={39}
            width={39}
            visible={showShimmer}
            LinearGradient={LinearGradient}>
            <Image
              source={{uri: image}}
              onLoadEnd={() => setShowShimmer(true)}
              style={{height: 39, width: 39, resizeMode: 'contain'}}
            />
          </ShimmerPlaceholder>
        </Layout>
        <Text
          style={{
            marginTop: 10,
            fontFamily: 'Poppins-Regular',
            fontSize: 10,
            width: 56,
            textAlign: 'center',
          }}>
          {text}
        </Text>
      </Layout>
    </TouchableOpacity>
  );
};

export default TreeItem;
