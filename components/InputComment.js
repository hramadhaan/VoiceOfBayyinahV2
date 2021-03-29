import React, {useEffect, useRef, useState} from 'react';
import {View, Text, TextInput, Image, TouchableOpacity} from 'react-native';
import FeatherIcons from 'react-native-vector-icons/Feather';
import {useDispatch} from 'react-redux';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import * as commentAction from '../store/actions/comment';

const InputComment = ({imageUri, id}) => {
  const inputTextRef = useRef();
  const insets = useSafeAreaInsets();

  const [message, setMessage] = useState();

  const dispatch = useDispatch();

  const sendComment = () => {
    dispatch(commentAction.postComment(id, message));
    inputTextRef.current.clear();
  };

  return (
    <View
      style={{
        flexDirection: 'row',
        height: 48 + insets.bottom,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 12,
        backgroundColor: 'white',
        borderTopWidth: 1,
        borderTopColor: '#eee',
      }}>
      <View style={{flexDirection: 'row'}}>
        <View style={{marginRight: 8}}>
          <Image
            style={{width: 30, height: 30, borderRadius: 39 / 2}}
            source={{uri: imageUri}}
          />
        </View>
        <TextInput
          style={{width: '80%'}}
          ref={inputTextRef}
          placeholder="Tambahkan komentar Anda"
          showSoftInputOnFocus={false}
          onChangeText={(e) => setMessage(e)}
          multiline
        />
      </View>
      <TouchableOpacity
        onPress={() => {
          sendComment();
        }}>
        <FeatherIcons name="send" size={22} color="#3a3a3a" />
      </TouchableOpacity>
    </View>
  );
};

export default InputComment;
