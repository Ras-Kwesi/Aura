import { View, Text, FlatList, Image, RefreshControl, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

import { images } from '../../constants'
import SearchInput from '../../components/SearchInputs'
import Trending from '../../components/Trending'
import EmptyState from '../../components/EmptyState'
import { getAllPosts, getLatestPosts } from '../../lib/appwrite'
import useAppwrite from '../../lib/useAppwrite'
import VideoCard from '../../components/VideoCard'

const Home = () => {
    
    const {data: posts, refetch} = useAppwrite(getAllPosts);
    const {data: latestPosts} = useAppwrite(getLatestPosts);


    // Used for refreshing videos after a certain time
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = async () => {
        // Recall videos -> if any new videos appear
        setRefreshing(true);
        await refetch();
        setRefreshing(false)
        
    }

    // console.log('\nlatestPosts\n\n', latestPosts)
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
                <View className='my-6 px-4 space-y-6'>
                    <View className='justify-between items-start flex-row mb-6'>
                        <Text className='font-pmedium text-sm text-gray-100'>
                            Welcome Back{"\n"}
                            Username
                        </Text>
                        <View>
                            <Image
                                source={images.logoSmall}
                                className='w-9 h-10'
                                resizeMode='contain'
                                />
                        </View>
                    </View>
                    <SearchInput/>
                    <View className='w-full flex-1 pt-5 pb-8'>
                        <Text className='text-gray-200 font-pregular mb-3'>
                            Latest Videos
                        </Text>
                        <Trending posts={latestPosts ?? []} />
                    </View>
                </View>
            )}
            ListEmptyComponent={() => (
                <EmptyState
                    title='No videos found'
                    subtitle='No videos created yet'
                />
            )}
            refreshControl={<RefreshControl 
                refreshing={refreshing} 
                onRefresh={onRefresh}/>}
        />
    </SafeAreaView>
  )
}

export default Home