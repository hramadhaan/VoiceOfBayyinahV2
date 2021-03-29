import React, {useEffect, useState, useRef, useCallback} from 'react';
import {
  View,
  Text,
  ImageBackground,
  Dimensions,
  Image,
  StyleSheet,
  Animated,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import LottieView from 'lottie-react-native';
import Snackbar from 'react-native-snackbar';
import moment from 'moment';
import 'moment/locale/id';
moment().locale('id');

import * as artikelAction from '../store/actions/artikel';
import Icon from 'react-native-vector-icons/Feather';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CardItem from '../components/CardItem';
import LikeButtonComponent from '../components/LikeButtonComponent';
import BookmarkButtonComponent from '../components/BookmarkButtonComponent';

const {width, height} = Dimensions.get('screen');

const DetailArtikelScreen = (props) => {
  const {route} = props;
  const {id} = route.params;

  const insets = useSafeAreaInsets();

  const dispatch = useDispatch();
  const artikel = useSelector((state) => state.artikel);
  const {artikelData, likeArtikel, messages} = artikel;
  const category = useSelector((state) =>
    state.category.categories.find((cat) => cat.id === artikelData.idCategory),
  );
  const penulis = useSelector((state) =>
    state.user.users.find((user) => user.id === artikelData.idPenulis),
  );

  const [shimmer, setShimmer] = useState(false);

  useEffect(() => {
    dispatch(artikelAction.artikelDetail(id));
    dispatch(artikelAction.fetchLikeArtikel(id));
    dispatch(artikelAction.fetchBookmark());
  }, [dispatch]);

  const showToast = useCallback(() => {
    if (messages === 'success') {
      Snackbar.show({
        text: 'Berhasil menambahkan ke Favorite',
        duration: Snackbar.LENGTH_LONG,
        action: {
          text: 'Lihat Favorite',
          textColor: 'yellow',
          onPress: () => {
            // KE FAVORITE
            props.navigation.navigate('NewPostTab');
          },
        },
      });
    }
  }, [messages]);

  useEffect(() => {
    showToast();
  }, [showToast]);

  // ANIMATION
  const [bottomActions, setBottomActions] = useState(null);
  const scrollY = useRef(new Animated.Value(0)).current;

  const topEdge = bottomActions?.y - height + bottomActions?.height;

  const inputRange = [-1, 0, topEdge - 40, topEdge, topEdge + 1];

  let render = (
    <View
      style={{
        paddingTop: Math.max(insets.top, 16),
        paddingBottom: Math.max(insets.bottom, 16),
        backgroundColor: 'white',
      }}>
      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  y: scrollY,
                },
              },
            },
          ],
          {useNativeDriver: true},
        )}>
        <View>
          <ShimmerPlaceholder
            LinearGradient={LinearGradient}
            visible={shimmer}
            height={150}
            width={width}>
            <ImageBackground
              onLoadEnd={() => setShimmer(true)}
              source={{uri: artikelData.imageUrl}}
              style={{height: 150, width: width}}>
              {shimmer && (
                <>
                  <View
                    style={{
                      position: 'absolute',
                      width: width,
                      height: 150,
                      backgroundColor: 'rgba(0,0,0,0.55)',
                    }}
                  />
                  <View style={{paddingHorizontal: 14, paddingTop: 14}}>
                    <Icon
                      name="arrow-left"
                      size={20}
                      onPress={() => props.navigation.goBack()}
                      color="white"
                    />
                    <Text
                      style={{
                        marginTop: 5,
                        fontSize: 16,
                        fontFamily: 'Poppins-Bold',
                        color: 'white',
                        lineHeight: 24,
                      }}>
                      {artikelData.judul}
                    </Text>

                    <View
                      style={{
                        backgroundColor: 'rgba(134,20,1,1)',
                        paddingHorizontal: 16,
                        paddingVertical: 2,
                        alignSelf: 'flex-start',
                        marginTop: 5,
                      }}>
                      <Text
                        numberOfLines={1}
                        style={{color: 'white', fontFamily: 'Poppins-Regular'}}>
                        {category.name}
                      </Text>
                    </View>
                    <Text
                      style={{
                        color: 'white',
                        fontFamily: 'Poppins-Regular',
                        marginTop: 5,
                      }}>
                      #{artikelData.hashtag}
                    </Text>
                  </View>
                </>
              )}
            </ImageBackground>
          </ShimmerPlaceholder>
          {/* BODY CONTENT */}

          <View
            style={{
              width: width,
              backgroundColor: 'white',
              paddingHorizontal: 14,
              paddingTop: 10,
              marginTop: -25,
              borderTopLeftRadius: 25,
              borderTopRightRadius: 25,
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <View style={{flexDirection: 'row'}}>
                {penulis && (
                  <Image
                    source={{uri: penulis.photoURL}}
                    style={{width: 45, height: 45, borderRadius: 45 / 2}}
                  />
                )}
                {penulis && (
                  <View style={{flexDirection: 'column', marginLeft: 8}}>
                    <Text style={{fontSize: 14, fontFamily: 'Poppins-Bold'}}>
                      {penulis.displayName}
                    </Text>
                    <Text style={{fontFamily: 'Poppins-Regular'}}>
                      {moment(artikelData.time, 'LLL').fromNow()}
                    </Text>
                  </View>
                )}
              </View>
            </View>
            {/* PART ONE */}
            <View style={{marginTop: 10}}>
              <Text style={{fontFamily: 'Poppins-Bold', fontSize: 14}}>
                Part 1
              </Text>
              <Text style={{fontFamily: 'Poppins-Regular', textAlign: 'auto'}}>
                {artikelData.partOne}
              </Text>
            </View>

            {/* PART TWO */}

            {artikelData.partTwo !== '' && (
              <View style={{marginTop: 10}}>
                <Text style={{fontFamily: 'Poppins-Bold', fontSize: 14}}>
                  Part 2
                </Text>
                <Text
                  style={{fontFamily: 'Poppins-Regular', textAlign: 'auto'}}>
                  {artikelData.partTwo}
                </Text>
              </View>
            )}

            {/* PART THREE */}

            {artikelData.partThree !== '' ? (
              <View style={{marginTop: 10}}>
                <Text style={{fontFamily: 'Poppins-Bold', fontSize: 14}}>
                  Part 3
                </Text>
                <Text
                  style={{fontFamily: 'Poppins-Regular', textAlign: 'auto'}}>
                  {artikelData.partThree}
                </Text>
              </View>
            ) : null}
          </View>
          <View
            onLayout={(ev) => {
              setBottomActions(ev.nativeEvent.layout);
            }}
            style={[styles.bottomActions, {backgroundColor: 'white'}]}
          />
          <View style={{paddingHorizontal: 14, backgroundColor: 'white'}}>
            <Text
              style={{
                fontSize: 18,
                fontFamily: 'Poppins-Bold',
              }}>
              Artikel Populer
            </Text>
            <FlatList
              data={artikel.sortArtikels}
              keyExtractor={(item) => `key-load-favorite-${item.id}`}
              renderItem={({item, index}) => {
                if (item.id === id) {
                  return null;
                }
                return <CardItem item={item} navigation={props.navigation} />;
              }}
            />
          </View>
        </View>
      </Animated.ScrollView>
      {bottomActions && (
        <Animated.View
          style={[
            styles.bottomActions,
            {
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              transform: [
                {
                  translateY: scrollY.interpolate({
                    inputRange,
                    outputRange: [0, 0, 0, 0, -1],
                  }),
                },
              ],
            },
          ]}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <LikeButtonComponent idArtikel={artikelData.id} />
            <Animated.Text
              style={{
                fontFamily: 'Poppins-Regular',
                marginLeft: 3,
                opacity: scrollY.interpolate({
                  inputRange,
                  outputRange: [0, 0, 0, 1, 1],
                }),
                transform: [
                  {
                    translateY: scrollY.interpolate({
                      inputRange,
                      outputRange: [80, 80, 80, 0, 0],
                    }),
                  },
                ],
              }}>
              {likeArtikel.length}
            </Animated.Text>
            <Animated.View
              style={{
                marginLeft: 10,
                opacity: scrollY.interpolate({
                  inputRange,
                  outputRange: [0, 0, 0, 1, 1],
                }),
                transform: [
                  {
                    translateY: scrollY.interpolate({
                      inputRange,
                      outputRange: [80, 80, 80, 0, 0],
                    }),
                  },
                ],
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Ionicons name="eye-outline" size={24} />
              <Text
                style={{
                  fontFamily: 'Poppins-Regular',
                  marginLeft: 3,
                }}>
                {artikelData.countView}
              </Text>
            </Animated.View>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Animated.View
              style={{
                opacity: scrollY.interpolate({
                  inputRange,
                  outputRange: [0, 0, 0, 1, 1],
                }),
                transform: [
                  {
                    translateY: scrollY.interpolate({
                      inputRange,
                      outputRange: [80, 80, 80, 0, 0],
                    }),
                  },
                ],
              }}>
              <TouchableOpacity
                onPress={() =>
                  props.navigation.navigate('Comment', {
                    id: id,
                  })
                }>
                <Ionicons
                  name="chatbox-ellipses-outline"
                  size={24}
                  style={{marginRight: 20}}
                />
              </TouchableOpacity>
            </Animated.View>
            <BookmarkButtonComponent
              inputRange={inputRange}
              scrollY={scrollY}
              data={artikelData}
            />
            {bottomActions && (
              <Animated.View
                style={{
                  opacity: scrollY.interpolate({
                    inputRange,
                    outputRange: [0, 0, 0, 1, 1],
                  }),
                  transform: [
                    {
                      translateY: scrollY.interpolate({
                        inputRange,
                        outputRange: [80, 80, 80, 0, 0],
                      }),
                    },
                  ],
                }}>
                <TouchableOpacity onPress={() => alert('Share')}>
                  <Ionicons name="share-social-outline" size={24} />
                </TouchableOpacity>
              </Animated.View>
            )}
          </View>
        </Animated.View>
      )}
    </View>
  );

  if (artikel.loading) {
    render = (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <LottieView
          source={require('../components/Lottie/loading.json')}
          style={{height: 98}}
          autoPlay
          loop
        />
      </View>
    );
  }

  return render;
};

const styles = StyleSheet.create({
  bottomActions: {
    height: 60,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
});

export default DetailArtikelScreen;
