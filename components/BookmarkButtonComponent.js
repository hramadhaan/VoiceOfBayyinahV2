import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, Animated} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useDispatch, useSelector} from 'react-redux';

import * as artikelAction from '../store/actions/artikel';

const BookmarkButtonComponent = ({inputRange, scrollY, data}) => {
  const [isBookmark, setIsBookmark] = useState(false);
  const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

  const artikel = useSelector((state) => state.artikel);

  const {bookmarkArtikel, messages} = artikel;

  const artikelBookmark = bookmarkArtikel.find(
    (bookmark) => bookmark.id === data.id,
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (artikelBookmark) {
      setIsBookmark(true);
    } else {
      setIsBookmark(false);
    }
  }, []);
  return (
    <AnimatedTouchable
      onPress={() => {
        if (isBookmark) {
          dispatch(artikelAction.unBookmarkArtikel(data.id));
          setIsBookmark(false);
        } else {
          dispatch(artikelAction.bookmarkArtikel(data));
          setIsBookmark(true);
        }
      }}
      style={{
        marginRight: 20,
        transform: [
          {
            translateX: scrollY.interpolate({
              inputRange,
              outputRange: [40, 40, 40, 0, 0],
            }),
          },
        ],
      }}>
      {isBookmark ? (
        <Ionicons name="bookmark" size={24} color="grey" />
      ) : (
        <Ionicons name="bookmark-outline" size={24} color="black" />
      )}
    </AnimatedTouchable>
  );
};

export default BookmarkButtonComponent;
