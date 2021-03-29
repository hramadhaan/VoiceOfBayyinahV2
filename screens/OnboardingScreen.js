import React from 'react';
import {
  View,
  Text,
  FlatList,
  Dimensions,
  Image,
  Platform,
  Animated,
  TouchableOpacity,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import {useDispatch} from 'react-redux';
import crashlytics from '@react-native-firebase/crashlytics';

import * as authAction from '../store/actions/auth';

const {width, height} = Dimensions.get('screen');

const ONBOARDING_DATA = [
  {
    id: '1',
    judul: 'Students of Quran',
    deskripsi:
      'VOB telah dinikmati lebih dari 2000 Students of Quran setiap harinya. Yuk ikut menikmati VOB sekarang',
    gambar: require('../assets/image/onboarding/onboarding_pertama.png'),
  },
  {
    id: '2',
    judul: 'Amalkan Doa',
    deskripsi: `Ihdinashshiraathal-mustaqiim. Itu doa di setiap raka'at salat. VoB membantu Anda berusaha untuk mengamalkan doa itu.`,
    gambar: require('../assets/image/onboarding/onboarding_kedua.png'),
  },
  {
    id: '3',
    judul: 'Temukan Artikel Bermanfaat',
    deskripsi:
      'Anda bisa menikmati konten VOB secara terstruktur di aplikasi ini. Dimanapun kapanpun.',
    gambar: require('../assets/image/onboarding/onboarding_ketiga.png'),
  },
  {
    id: '4',
    judul: 'Ayo! Tunggu apa lagi ?',
    deskripsi:
      'Chef VOB meringkas ceramah ustadz Nouman Ali Khan di Bayyinah TV untuk dapat anda nikmati dalam genggaman.',
    gambar: require('../assets/image/onboarding/onboarding_keempat.png'),
  },
];

const ScrollIndicator = ({scrollX}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        position: 'absolute',
        bottom: 45,
        left: 20,
      }}>
      {ONBOARDING_DATA.map((item, index) => {
        const inputRange = [
          (index - 1) * width,
          index * width,
          (index + 1) * width,
        ];
        const scale = scrollX.interpolate({
          inputRange,
          outputRange: [0.8, 1.4, 0.8],
          extrapolate: 'clamp',
        });
        return (
          <Animated.View
            key={`indicator-${index}`}
            style={{
              height: 10,
              width: 14,
              borderRadius: 5,
              backgroundColor: '#861401',
              margin: 5,
              transform: [{scale}],
            }}
          />
        );
      })}
    </View>
  );
};

const Footer = ({scrollX}) => {
  return (
    <View
      style={{
        position: 'absolute',
        height: 97,
        width,
        bottom: 0,
        left: 0,
        right: 0,
        alignItems: 'center',
      }}>
      <ScrollIndicator scrollX={scrollX} />
    </View>
  );
};

const OnboardingScreen = (props) => {
  const scrollX = React.useRef(new Animated.Value(0)).current;
  const [index, setIndex] = React.useState(0);
  const ref = React.useRef();
  console.log(index);

  const dispatch = useDispatch();

  const signIn = () => {
    dispatch(authAction.login());
  };

  return (
    <View style={{flex: 1}}>
      <Animated.FlatList
        ref={ref}
        onMomentumScrollEnd={(ev) =>
          setIndex(Math.floor(ev.nativeEvent.contentOffset.x / width, 1))
        }
        data={ONBOARDING_DATA}
        keyExtractor={(item) => item.id}
        scrollEventThrottle={32}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {useNativeDriver: true},
        )}
        horizontal
        decelerationRate={Platform.OS === 'ios' ? 'fast' : 0.2}
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        renderItem={({item, index}) => {
          if ((index + 1) % 2 === 1) {
            return (
              <View
                style={{
                  width,
                  justifyContent: 'center',
                  paddingHorizontal: 21,
                  paddingVertical: 31,
                }}>
                <Text
                  style={{
                    fontSize: 24,
                    fontWeight: 'bold',
                    color: '#861401',
                    fontFamily: 'Poppins-Bold',
                  }}>
                  {item.judul}
                </Text>
                <Text
                  style={{
                    fontSize: 15,
                    marginTop: 12,
                    fontFamily: 'Poppins-Regular',
                    lineHeight: 32,
                  }}>
                  {item.deskripsi}
                </Text>
                <Image source={`${item.gambar}`} style={{marginTop: 35}} />
              </View>
            );
          } else if ((index + 1) % 2 === 0) {
            return (
              <View
                style={{
                  width,
                  justifyContent: 'center',
                  paddingHorizontal: 21,
                  paddingVertical: 31,
                }}>
                <Image source={`${item.gambar}`} />
                <Text
                  style={{
                    fontSize: 24,
                    fontWeight: 'bold',
                    color: '#861401',
                    marginTop: 32,
                    fontFamily: 'Poppins-Bold',
                  }}>
                  {item.judul}
                </Text>
                <Text
                  style={{
                    fontSize: 15,
                    marginTop: 12,
                    fontFamily: 'Poppins-Regular',
                    lineHeight: 32,
                  }}>
                  {item.deskripsi}
                </Text>
              </View>
            );
          }
        }}
      />
      <ScrollIndicator scrollX={scrollX} />
      {index === 3 ? (
        <View style={{position: 'absolute', bottom: 38, right: 20}}>
          <TouchableOpacity
            style={{
              padding: 10,
              backgroundColor: '#861401',
              borderRadius: 15,
            }}
            onPress={() => {
              signIn();
              // crashlytics().crash();
            }}>
            <Text
              style={{
                fontFamily: 'Poppins-Regular',
                fontSize: 14,
                color: 'white',
              }}>
              SIGN IN
            </Text>
          </TouchableOpacity>
        </View>
      ) : Platform.OS === 'ios' ? (
        <View style={{position: 'absolute', bottom: 38, right: 20}}>
          <TouchableOpacity
            onPress={() => {
              ref?.current?.scrollToOffset({
                offset: (index + 1) * width,
                animated: true,
              });
            }}
            style={{
              padding: 10,
              backgroundColor: '#861401',
              borderRadius: 15,
            }}>
            <Text
              style={{
                fontFamily: 'Poppins-Regular',
                fontSize: 14,
                color: 'white',
              }}>
              Lanjutkan
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={{position: 'absolute', bottom: 50, right: 20}}>
          <TouchableOpacity
            onPress={() => {
              // submit()
              //   .then((result) => {
              //     console.log(result);
              //   })
              //   .catch((err) => console.log(err));
            }}>
            <Text>SIGN IN</Text>
          </TouchableOpacity>
        </View>
      )}
      {index !== 3 && (
        <View style={{position: 'absolute', top: 50, right: 20}}>
          <TouchableOpacity
            onPress={() => {
              ref?.current?.scrollToOffset({
                offset: 4 * width,
                animated: true,
              });
            }}>
            <Text
              style={{
                fontSize: 16,
                fontFamily: 'Poppins-Regular',
              }}>
              SKIP
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default OnboardingScreen;
