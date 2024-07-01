import { View, Text, FlatList } from 'react-native';
import React from 'react';
import * as Animatable from 'react-native-animatable';

const Trending = (posts) => {
  return (
    <FlatList 
        data={posts}
        // data={[{id: 1}, {id: 2}, {id: 3}]}
        keyExtractor={(item) => item.$id}
        renderItem={({item}) => (
            <Text className='text-3xl text-white'>
                {item.id}
                Working
            </Text>
        )}
        horizontal
    />
    // <Text className='text-3xl text-white'>
    //     Trending
    // </Text>
  )
}

export default Trending