import React, { useEffect, useRef } from 'react';
import {
  View,
  KeyboardAvoidingView,
  FlatList,
  Text,
  Dimensions,
  Alert,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import LottieView from 'lottie-react-native';

import HeaderComponent from '../components/HeaderComponent';
import InputComment from '../components/InputComment';
import * as commentAction from '../store/actions/comment';
import CommentItem from '../components/CommentItem';

const CommentScreen = (props) => {
  const { route } = props;
  const { id } = route.params;

  const insets = useSafeAreaInsets();

  const auth = useSelector((state) => state.auth);
  const comment = useSelector((state) => state.comment);

  const dispatch = useDispatch();
  const flatlistRef = useRef();

  const deleteComment = (idArtikel, idComment) => {
    Alert.alert('Anda yakin ingin menghapus ?', 'Komen tersebut akan dihapus dan tidak akan ditayangkan kembali.', [
      {
        text: 'Ya',
        style: 'destructive',
        onPress: () => dispatch(commentAction.deleteComment(idArtikel, idComment))
      },
      {
        text: 'Tidak',
        style: 'cancel',
        onPress: () => console.log('User tidak jadi menghapus')
      }
    ])
  }

  useEffect(() => {
    dispatch(commentAction.fetchComment(id));
  }, [dispatch]);

  let render = (
    <>
      <FlatList
        ref={flatlistRef}
        data={comment.comments}
        initialNumToRender={comment.comments.length}
        style={{ marginBottom: 48 + insets.bottom }}
        keyExtractor={(item, index) => `comment-index-${index}`}
        onContentSizeChange={() => flatlistRef.current.scrollToEnd()} // scroll it
        ItemSeparatorComponent={() => {
          return <View style={{ height: 12 }} />;
        }}
        contentContainerStyle={{
          paddingHorizontal: 12,
          paddingVertical: 8,
        }}
        renderItem={({ item, index }) => {
          return (
            <CommentItem
              showLike={true}
              deleteComment={() => deleteComment(id, item.id)}
              isAdmin={!!(auth.typeUser === "1" || auth.uid === item.uidSender)}
              photoURI={item.imageSender}
              displayName={item.nameSender}
              comment={item.commentSender}
              time={item.time}
              navigation={props.navigation}
              press={() =>
                props.navigation.navigate('SubComment', {
                  id: item.id,
                })
              }
            />
          );
        }}
      />
    </>
  );

  if (auth.loading || comment.loading) {
    render = (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <LottieView
          style={{
            height: 90,
          }}
          source={require('../components/Lottie/loading.json')}
          autoPlay
          loop
        />
      </View>
    );
  }

  if (comment.comments.length === 0) {
    render = (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <LottieView
          source={require('../components/Lottie/empty.json')}
          autoPlay
          loop
          style={{ height: 120 }}
        />
        <Text
          style={{ fontSize: 14, fontFamily: 'Poppins-Regular', marginTop: 8 }}>
          Tidak ada komentar di artikel ini
        </Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <HeaderComponent back navigation={props.navigation} title="Comment" />
      {render}
      <KeyboardAvoidingView
        behavior="position"
        style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }}>
        <InputComment imageUri={auth.image} id={id} />
      </KeyboardAvoidingView>
    </View>
  );
};

export default CommentScreen;
