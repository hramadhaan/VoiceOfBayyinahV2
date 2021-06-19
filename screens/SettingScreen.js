import React, { useState } from 'react'
import { View, Text, TouchableOpacity, Modal, Image, ScrollView, Linking, Alert } from 'react-native'
import FeatherIcons from 'react-native-vector-icons/Feather'
import { useDispatch } from 'react-redux'

import HeaderComponent from '../components/HeaderComponent'
import * as authAction from '../store/actions/auth'

const TextParagraph = [
    'Vob dan AoQ adalah bagian dari komunitas NAK Indonesia dan Yayasan Bayyinah Qur’an Indonesia.',
    'Voice of Bayyinah (VoB) berdiri pada 17 Juni 2020, awalnya bernama Lessons from Bayyinah’s Production (LBP). Atas masukan para anggota, LBP berubah nama menjadi VoB pada 20 Agustus 2020 yang bertepatan dengan tahun baru Islam 1442 H.',
    'Tujuan VoB adalah untuk menghadirkan mutiara hikmah yang bersumber dari Bayyinah TV setiap hari. Termasuk akhir pekan dan hari libur. Karena petunjuk-Nya adalah seperti air. Kita membutuhkannya setiap hari.',
    'Bayyinah TV adalah program berbayar yang berisi lebih dari 2,000 jam pelajaran dalam bentuk video yang diperbarui setiap bulannya. Di Bayyinah TV, Ustaz Nouman Ali Khan memberikan bimbingan melalui sebuah pendekatan yang praktis untuk mempelajari Al-Qur’an.',
    'Arabic of the Quran (AoQ) berdiri pada 5 September 2020 sebagai sebuah grup belajar bahasa Arab. Tujuan awal didirikannya adalah untuk menyambut program Dream Live, kelas belajar bahasa Arab online yang diadakan oleh Bayyinah yang rencananya dimulai pada 2 Oktober 2020.',
    'Materi pembelajaran bahasa Arab di AoQ menggunakan kurikulum Bayyinah TV dengan materi yang sudah disesuaikan dengan konteks keindonesiaan dan ketimuran.'
]

const SettingScreen = props => {
    const dispatch = useDispatch()
    const [showModal, setShowModal] = useState(false)

    const logout = () => {
        Alert.alert('Apakah Anda yakin ingin keluar ?', null, [
            {
                text: 'Ya',
                style: 'destructive',
                onPress: () => dispatch(authAction.logout())
            }, {
                text: 'Tidak',
                style: 'default',
                onPress: () => console.log('User canceled logout')
            }
        ])
    }

    const listViewRender = (iconName, name, onPress) => {
        return (
            <TouchableOpacity onPress={() => onPress()}>
                <View style={{ flexDirection: 'row', marginHorizontal: 18, marginVertical: 8, alignItems: 'center', paddingVertical: 4 }}>
                    <FeatherIcons name={iconName} size={20} style={{ marginRight: 8 }} />
                    <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 14 }}>{name}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    const renderModal = () => {
        return (
            <View>
                <HeaderComponent title='Tentang Kami' close setClose={setShowModal} />
                <ScrollView style={{ paddingHorizontal: 12 }}>
                    <Image source={require('../assets/image/vob_icons.png')} style={{ alignSelf: 'center', marginTop: 12 }} />
                    <View style={{ marginVertical: 12 }}>
                        <Text style={{ fontFamily: 'Poppins-Bold', fontSize: 14, marginVertical: 4 }}>Tentang Voice of Bayyinah</Text>
                        {TextParagraph.map((item, index) => {
                            return <Text style={{ fontFamily: 'Poppins-Regular', marginVertical: 4 }} key={`text-${index}`}>{item}</Text>
                        })}
                    </View>
                    <View style={{ marginBottom: 150 }}>
                        <Text style={{ fontFamily: 'Poppins-Bold', fontSize: 14, marginVertical: 4 }}>Profil Penulis</Text>
                        <Text style={{ fontFamily: 'Poppins-Regular', marginVertical: 4 }}>
                            Klik <Text onPress={() => Linking.openURL('https://nakindonesia.com/profil-penulis/')} style={{ fontFamily: 'Poppins-Bold', textDecorationLine: 'underline' }}>disini </Text>untuk melihat profil dari penulis Voice of Bayyinah
                    </Text>
                    </View>
                </ScrollView>
            </View>
        )
    }

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <HeaderComponent navigation={props.navigation} title='Pengaturan' />
            <View style={{}}>
                {listViewRender('info', 'Tentang Kami', () => {
                    setShowModal(true)
                })}
                {listViewRender('log-out', 'Logout', () => {
                    logout()
                })}
            </View>
            <Modal animationType='slide' transparent={false} visible={showModal} onRequestClose={() => setShowModal(!showModal)} >
                {renderModal()}
            </Modal>
        </View>
    )
}

export default SettingScreen