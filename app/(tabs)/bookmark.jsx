import { View, Text, FlatList } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import VideoCard from '../../components/VideoCard'

const Bookmark = () => {
  return (
    <SafeAreaView className = 'bg-primary h-full'>
        <FlatList 
            data = '{likes}'
            keyExtractor={(item) => item.$id}
            renderItem = {({item}) => (
                <VideoCard 
                    
                />
            )}
        />
    </SafeAreaView>
  )
}

export default Bookmark