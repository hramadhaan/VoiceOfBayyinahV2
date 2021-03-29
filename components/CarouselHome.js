import React, {useEffect, useRef, useState} from 'react';
import {View, Text, Image, Dimensions} from 'react-native';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import {useDispatch, useSelector} from 'react-redux';

import * as bannerAction from '../store/actions/banner';
import CarouselItem from './CarouselItem';

const CarouselHome = ({banner}) => {
  const carouselRef = useRef();

  const [entries, setEntries] = useState();
  const [activeSlide, setActiveSlide] = useState();

  const {width} = Dimensions.get('screen');

  return (
    <View style={{marginTop: 20, marginBottom: -20}}>
      <Carousel
        ref={carouselRef}
        data={banner}
        onSnapToItem={(index) => setActiveSlide(index)}
        itemWidth={300}
        autoplay
        loop
        sliderWidth={width}
        renderItem={({item, index}) => {
          return (
            <CarouselItem key={`index-carousel-${index}`} image={item.image} />
          );
        }}
      />
      <Pagination
        dotsLength={banner.length}
        activeDotIndex={activeSlide}
        dotStyle={{
          width: 10,
          height: 10,
          borderRadius: 5,
          backgroundColor: '#861401',
        }}
        inactiveDotStyle={
          {
            // Define styles for inactive dots here
          }
        }
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
      />
    </View>
  );
};

export default CarouselHome;
