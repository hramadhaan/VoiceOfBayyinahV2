import React, { useEffect } from 'react'
import { View, Text, StyleSheet, FlatList } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import LottieView from 'lottie-react-native'

import * as articleAction from '../store/actions/artikel'
import HeaderComponent from '../components/HeaderComponent'
import CardItem from '../components/CardItem'

const CategoryArticleScreen = props => {
    const { route, navigation } = props
    const { title, id, populer } = route.params

    const dispatch = useDispatch()

    const artikel = useSelector(state => state.artikel)

    useEffect(() => {
        dispatch(articleAction.artikelSortCategory(id))
    }, [dispatch])

    const searchRender = () => {
        return (
            <View style={{ alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%', paddingHorizontal: 12 }}>
                <LottieView source={require('../components/Lottie/empty.json')} autoPlay loop autoSize />
                <Text style={{fontFamily: 'Poppins-Regular', textAlign: 'center', color: '#444', marginTop: 10}}>Maaf artikel pada kategori {title} tidak dapat ditemukan</Text>
            </View>
        )
    }


    return (
        <View style={{ backgroundColor: 'white', flex: 1 }}>
            <HeaderComponent back navigation={props.navigation} title={title} search />
            {artikel.loading ? <LottieView
                style={{
                    height: 120,
                    alignSelf: 'center'
                }}
                source={require('../components/Lottie/loading.json')}
                autoPlay
                loop
            />
                : <FlatList
                    keyExtractor={(item) => `category-article-${item.id}`}
                    data={artikel.sortCategory}
                    ListEmptyComponent={()=>searchRender()}
                    renderItem={({ item, index }) => {
                        return (
                            <CardItem item={item} navigation={props.navigation} />
                        )
                    }}
                />}
        </View>
    )
}

export default CategoryArticleScreen