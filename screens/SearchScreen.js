import React, { useEffect, useState } from 'react'
import { View, Text, FlatList } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import LottieView from 'lottie-react-native'

import * as artikelAction from '../store/actions/artikel'
import HeaderComponent from '../components/HeaderComponent'
import CardItem from '../components/CardItem'

const SearchScreen = props => {

    const [searchText, setSearchText] = useState('')

    const dispatch = useDispatch()
    const artikel = useSelector(state => state.artikel)

    const submitText = () => {
        dispatch(artikelAction.searchArticle(searchText.toString()))
    }

    useEffect(() => { dispatch(artikelAction.artikelSortCategoryInit()) }, [dispatch])

    const searchRender = () => {
        return (
            <View style={{ alignItems: 'center', justifyContent: 'center', paddingHorizontal: 12 }}>
                <LottieView source={require('../components/Lottie/searching.json')} autoPlay loop autoSize />
                <Text style={{fontFamily: 'Poppins-Regular', textAlign: 'center', color: '#444', marginTop: 10}}>{
                    searchText === '' ? 'Harap isi kolom pencarian diatas' : `Maaf pencarian pada ${searchText} tidak dapat ditemukan.`
                }</Text>
            </View>
        )
    }

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <HeaderComponent navigation={props.navigation} searchBar searchText={setSearchText} onSubmit={() => submitText()} valueSearch={searchText} />
            {artikel.loading ?
                <LottieView
                    style={{
                        height: 120,
                        alignSelf: 'center'
                    }}
                    source={require('../components/Lottie/loading.json')}
                    autoPlay
                    loop
                /> : <FlatList
                    keyExtractor={(item) => `item-search-${item.id}`}
                    data={artikel.searchArtikel}
                    ListEmptyComponent={searchRender}
                    renderItem={({ item, index }) => {
                        return (
                            <CardItem item={item} navigation={props.navigation} />
                        )
                    }}
                />}

        </View>
    )
}

export default SearchScreen