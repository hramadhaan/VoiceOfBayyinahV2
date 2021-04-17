import React, { useEffect } from 'react'
import { View, Text, FlatList } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import LottieView from 'lottie-react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import CardItem from '../components/CardItem'
import * as artikelAction from '../store/actions/artikel'

const FavoriteScreen = props => {
    const artikel = useSelector(state => state.artikel)
    const dispatch = useDispatch()
    const { loading, bookmarkArtikel } = artikel

    const insets = useSafeAreaInsets()

    useEffect(() => {
        dispatch(artikelAction.fetchBookmark())
    }, [dispatch])

    let render = (
        <FlatList data={bookmarkArtikel} renderItem={({ item, index }) => {
            return (
                <CardItem item={item} navigation={props.navigation} />
            )
        }} />
    )

    if (loading) {
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
        )
    }

    if (bookmarkArtikel.length === 0) {
        render = (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff' }}>
                <LottieView
                    source={require('../components/Lottie/favorite.json')}
                    autoPlay
                    loop
                    style={{ height: 120 }}
                />
                <Text
                    style={{ fontSize: 14, fontFamily: 'Poppins-Regular', marginTop: 8 }}>
                    Anda belum menambahkan artikel ke Favorite
            </Text>
            </View>
        )
    }

    return (
        <View style={{
            paddingTop: Math.round(insets.top, 18),
            flex: 1,
            backgroundColor: '#fff',
            paddingHorizontal: 12
        }}>{render}</View>
    )
}

export default FavoriteScreen