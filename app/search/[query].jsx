// The naming convention with the square brackets allows us to rename the page when queries are made to the search term

import { useLocalSearchParams } from "expo-router";
import { View, Text, FlatList } from 'react-native'
import React, { useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

import SearchInput from '../../components/SearchInputs'
import EmptyState from '../../components/EmptyState'
import { searchPosts } from '../../lib/appwrite'
import useAppwrite from '../../lib/useAppwrite'
import VideoCard from '../../components/VideoCard'

const Search = () => {
    
    const { query } = useLocalSearchParams()
    const {data: posts, refetch} = useAppwrite(() => searchPosts(query));


    // Used for refreshing videos after a certain time
    useEffect(() => {
        refetch();
    },[query])

    console.log(query, posts)
  return (
    <SafeAreaView className ='bg-primary h-full'>
        <FlatList
            data={posts}
            keyExtractor={(item) => item.$id}
            renderItem={({item}) => (
                <VideoCard 
                    title={item.title}
                    thumbnail={item.thumbnail}
                    video={item.video}
                    // creator={item.creator.username}
                    // avatar={item.creator.avatar}
                />
            )}
            ListHeaderComponent={() => (
                <View className='my-6 px-4'>
                    <Text className='font-pmedium text-sm text-gray-100'>
                        Search Results{"\n"}
                        {query}
                    </Text>
                    <View className='mt-6 mb-8'>
                        <SearchInput initialQuery={query}/>
                    </View>
                </View>
            )}
            ListEmptyComponent={() => (
                <EmptyState
                    title='No videos found'
                    subtitle='No videos found for this search term'
                />
            )}
        />
    </SafeAreaView>
  )
}

export default Search