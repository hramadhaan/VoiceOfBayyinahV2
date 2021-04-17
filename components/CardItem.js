import React, {useState} from 'react';
import {Layout, Text} from '@ui-kitten/components';
import {Image, StyleSheet, Dimensions, TouchableOpacity} from 'react-native';
import moment from 'moment';
import 'moment/locale/id';
import {useDispatch, useSelector} from 'react-redux';
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';
moment().locale('id');

import * as artikelAction from '../store/actions/artikel';

const CardItem = ({item, navigation}) => {
  const dispatch = useDispatch();
  const category = useSelector((state) =>
    state.category.categories.find((cat) => cat.id === item.idCategory),
  );

  const name = useSelector((state) =>
    state.user.users.find((user) => user.id === item.idPenulis),
  );

  const [showShimmer, setShowShimmer] = useState(true);

  const openDetail = (id, currentView) => {
    dispatch(artikelAction.increaseViewArtikel(id, currentView));
    navigation.push('Detail', {
      id: item.id,
    });
  };

  return (
    <TouchableOpacity
      style={{
        borderColor: '#aaa',
        borderRadius: 10,
        elevation: 5,
        shadowColor: '#ccc',
        shadowOffset: {width: 0, height: 1},
        shadowOpacity: 0.8,
        shadowRadius: 2,
        marginBottom: 12,
      }}
      onPress={() => {
        openDetail(item.id, item.countView);

        navigation.navigate('Detail', {
          id: item.id,
        });
      }}>
      <Layout>
        {/* <ShimmerPlaceholder
          style={{borderTopLeftRadius: 12, borderTopRightRadius: 12}}
          LinearGradient={LinearGradient}
          visible={showShimmer}
          width={Dimensions.get('screen').width - 12}
          height={99.83}> */}
          <Image
            source={{uri: item.imageUrl}}
            style={{
              width: '100%',
              height: 99.83,
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
            }}
            // onLoadEnd={() => setShowShimmer(true)}
          />
        {/* </ShimmerPlaceholder> */}
        <Layout
          style={{
            padding: 12,
            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 10,
          }}>
          <Layout style={{flexDirection: 'row'}}>
            <Text style={styles.text}>{name && name.displayName}</Text>
            <Text style={[styles.text, {marginLeft: 4}]}>
              {moment(item.time, 'LLL').fromNow()}
            </Text>
          </Layout>
          <Text
            category="h6"
            style={{
              fontFamily: 'Poppins-Bold',
              fontSize: 14,
              color: 'black',
              lineHeight: 21,
            }}>
            {item.judul}
          </Text>
          <Text
            style={{
              fontFamily: 'Poppins-Regular',
              fontSize: 10,
              color: '#aaa',
            }}
            numberOfLines={1}>
            {item.partOne}
          </Text>
          <Layout
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 14 / 2,
              marginBottom: -14 / 2,
            }}>
            <Text
              style={{
                backgroundColor: '#861401',
                padding: 4,
                color: 'white',
                fontFamily: 'Poppins-Regular',
                fontSize: 10,
                lineHeight: 15,
                borderRadius: 3,
              }}
              numberOfLines={2}>
              {category && category.name}
            </Text>
            <Text
              style={{
                fontSize: 10,
                fontFamily: 'Poppins-SemiBold',
              }}>
              Read More...
            </Text>
          </Layout>
        </Layout>
      </Layout>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Poppins-Regular',
    fontSize: 9,
    color: 'rgba(170,170,170,1)',
  },
});

export default CardItem;
