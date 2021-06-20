import React, { useEffect } from 'react'
import { View, Text, FlatList } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import CardItem from '../components/CardItem'
import LottieView from 'lottie-react-native'

import HeaderComponent from '../components/HeaderComponent'
import * as artikelAction from '../store/actions/artikel'

const PopulerArticleScreen = props => {

    const dispatch = useDispatch()
    const artikel = useSelector(state => state.artikel)

    useEffect(() => {
        dispatch(artikelAction.artikelSortFullPopuler())
    }, [dispatch])

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <HeaderComponent back title='Populer' navigation={props.navigation} search />
            {artikel.loading ? <LottieView
                style={{
                    height: 120,
                    alignSelf: 'center'
                }}
                source={require('../components/Lottie/loading.json')}
                autoPlay
                loop
            /> :
                <FlatList
                    keyExtractor={(item) => `item-popular-screen-${item.id}`}
                    data={artikel.sortPopular}
                    renderItem={({ item, index }) => {
                        return (
                            <CardItem item={item} navigation={props.navigation} />
                        )
                    }}
                />}
        </View>
    )
}

export default PopulerArticleScreen