import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import moment from 'moment';
import 'moment/locale/id';
moment().locale('id');
import Ionicons from 'react-native-vector-icons/Ionicons';

const CommentItem = ({
  displayName,
  photoURI,
  comment,
  time,
  navigation,
  press,
  showLike,
}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'white',
      }}>
      <View style={{width: '70%', flexDirection: 'row'}}>
        <Image
          source={{uri: photoURI}}
          style={{width: 40, height: 40, borderRadius: 40 / 2, marginRight: 8}}
        />
        <View
          style={{
            flexDirection: 'column',
            flexWrap: 'wrap',
            flexGrow: 1,
            width: '70%',
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              flexWrap: 'wrap',
              width: '70%',
            }}>
            <Text
              style={{
                fontSize: 14,
                fontFamily: 'Poppins-Bold',
                marginRight: 6,
              }}>
              {displayName}
            </Text>
            <Text style={{fontSize: 12, fontFamily: 'Poppins-Regular'}}>
              {comment}
            </Text>
          </View>
          <View style={{flexDirection: 'row', marginTop: 3}}>
            <Text
              style={{
                marginRight: 6,
                fontSize: 12,
                fontFamily: 'Poppins-Regular',
              }}>
              {moment(time, 'LLL').fromNow()}
            </Text>
            {press && (
              <TouchableOpacity onPress={press}>
                <Text
                  style={{
                    fontSize: 12,
                    fontFamily: 'Poppins-Bold',
                    color: '#861401',
                  }}>
                  Balas
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
      {showLike && (
        <View>
          <Ionicons name="heart-outline" size={22} />
        </View>
      )}
    </View>
  );
};

export default CommentItem;
