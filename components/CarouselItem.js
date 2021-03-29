import React, {useState} from 'react';
import {View, Text, Image} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';

const CarouselItem = ({image}) => {
  const [showShimmer, setShowShimmer] = useState(false);

  return (
    <View style={{flex: 1}}>
      <ShimmerPlaceholder
        visible={showShimmer}
        LinearGradient={LinearGradient}
        width={300}
        height={98}>
        <Image
          onLoadEnd={() => setShowShimmer(true)}
          style={{width: 300, height: 98, resizeMode: 'cover'}}
          source={{uri: image}}
        />
      </ShimmerPlaceholder>
    </View>
  );
};

export default CarouselItem;
