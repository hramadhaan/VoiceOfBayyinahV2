import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useDispatch, useSelector} from 'react-redux';

import * as artikelAction from '../store/actions/artikel';

const LikeButtonComponent = ({idArtikel}) => {
  const [isLike, setIsLike] = useState(false);

  const auth = useSelector((state) => state.auth);

  const artikel = useSelector((state) =>
    state.artikel.likeArtikel.find((artikel) => artikel.id === auth.uid),
  );

  useEffect(() => {
    if (artikel) {
      setIsLike(true);
    } else {
      setIsLike(false);
    }
  }, []);

  const dispatch = useDispatch();
  return (
    <TouchableOpacity
      onPress={() => {
        if (isLike) {
          dispatch(artikelAction.unlikeArtikel(idArtikel));
          setIsLike(false);
        } else {
          dispatch(artikelAction.likeArtikel(idArtikel));
          setIsLike(true);
        }
      }}>
      {isLike ? (
        <Ionicons name="heart" size={24} color="#F23434" />
      ) : (
        <Ionicons name="heart-outline" size={24} />
      )}
    </TouchableOpacity>
  );
};

export default LikeButtonComponent;
