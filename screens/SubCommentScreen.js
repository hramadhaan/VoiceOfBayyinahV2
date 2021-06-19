import React, { useEffect, useRef } from 'react';
import {
  View,
  KeyboardAvoidingView,
  TouchableOpacity,
  Keyboard,
  FlatList,
  Text,
  ScrollView,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import LottieView from 'lottie-react-native';

import CommentItem from '../components/CommentItem';
import HeaderComponent from '../components/HeaderComponent';
import InputSubComment from '../components/InputSubComment';
import * as actionComment from '../store/actions/comment';

const SubCommentScreen = (props) => {
  const { route } = props;
  const { id } = route.params;

  const dispatch = useDispatch();

  const comment = useSelector((state) => state.comment);
  const commentDetail = comment.comments.find((com) => com.id === id);

  const auth = useSelector((state) => state.auth);

  const flatlistRef = useRef()

  useEffect(() => {
    dispatch(actionComment.fetchSubComment(id));
  }, [dispatch]);

  let render = (
    <FlatList
      ref={flatlistRef}
      data={comment.subComments}
      // initialNumToRender={comment.subComments.length}
      onContentSizeChange={() => flatlistRef.current.scrollToEnd()} // scroll it
      // initialScrollIndex={comment.subComments.length - 1}
      showsVerticalScrollIndicator={false}
      removeClippedSubviews
      keyExtractor={(item, index) => `index-subcomment-${index}`}
      ItemSeparatorComponent={() => {
        return <View style={{ height: 12 }} />;
      }}
      ListEmptyComponent={() => {
        return (
          <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <LottieView
              source={require('../components/Lottie/empty.json')}
              autoPlay
              loop
              style={{ height: 120 }}
            />
            <Text
              style={{
                fontSize: 14,
                fontFamily: 'Poppins-Regular',
                marginTop: 8,
              }}>
              Tidak ada komentar
            </Text>
          </View>
        );
      }}
      contentContainerStyle={{
        marginLeft: 20,
        marginVertical: 8,
      }}
      renderItem={({ item, index }) => {
        return (
          <CommentItem
            showLike={false}
            photoURI={item.imageSender}
            displayName={item.nameSender}
            comment={item.commentSender}
            time={item.time}
            navigation={props.navigation}
          />
        );
      }}
    />
  );

  if (comment.loading) {
    render = (
      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
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

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
      }}>
      <HeaderComponent navigation={props.navigation} title="Comment" />
      <View
        style={{
          paddingHorizontal: 12,
          paddingVertical: 8,
          flex: 1,
          marginBottom: 70,
        }}>
        <CommentItem
          photoURI={commentDetail.imageSender}
          displayName={commentDetail.nameSender}
          comment={commentDetail.commentSender}
          time={commentDetail.time}
          navigation={props.navigation}
        />
        <View style={{ height: 12 }} />
        {render}
      </View>
      <KeyboardAvoidingView
        behavior="position"
        style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }}>
        <InputSubComment imageUri={auth.image} id={id} />
      </KeyboardAvoidingView>
    </View>
  );
};

export default SubCommentScreen;
