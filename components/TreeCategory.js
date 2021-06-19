import React from 'react';
import {Layout, Text} from '@ui-kitten/components';
import {FlatList, Image, TouchableOpacity, View} from 'react-native';

import TreeItem from './TreeItem';

const TreeCategoryComponent = ({category, pressLainnya, navigation}) => {
  return (
    <Layout style={{marginVertical: 8, marginHorizontal: 12}}>
      <Text
        category="h6"
        style={{
          fontSize: 16,
          fontFamily: 'Poppins-Bold',
        }}>
        Kategori
      </Text>
      <FlatList
        numColumns={4}
        nestedScrollEnabled
        scrollEnabled={false}
        data={[
          ...category.slice(0, 7),
          {
            id: 'lainnya',
            image:
              'https://firebasestorage.googleapis.com/v0/b/vob-moapps.appspot.com/o/category%2Flainnya.png?alt=media&token=f96427e9-3ae9-46af-9072-a380204a93ef',
            name: 'Lainnya',
          },
          ,
        ]}
        contentContainerStyle={{justifyContent: 'center', marginVertical: 10}}
        ItemSeparatorComponent={() => {
          return <View style={{marginVertical: 4}} />;
        }}
        renderItem={({item, index}) => {
          return (
            <TreeItem
              key={`item-tree-${index}`}
              image={item.image}
              id={item.id}
              text={item.name}
              lainnya={pressLainnya}
              navigation={navigation}
            />
          );
        }}
      />
    </Layout>
  );
};
export default TreeCategoryComponent;
