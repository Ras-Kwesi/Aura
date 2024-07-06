// The naming convention with the square brackets allows us to rename the page when queries are made to the search term

import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

import EmptyState from '../../components/EmptyState'
import { getUserPosts } from '../../lib/appwrite'
import useAppwrite from '../../lib/useAppwrite'
import VideoCard from '../../components/VideoCard'
import {useGlobalContext} from "../../context/GlobalProvider";
import { icons } from "../../constants";
import InfoBox from "../../components/InfoBox";

const Profile = () => {
    
    const { user, setUser, setIsLoggedIn } = useGlobalContext()
    const {data: posts} = useAppwrite(() => getUserPosts(user.$id));

    const logout = (()=> {
        setUser(null);
        setIsLoggedIn(false);
    })

    console.log(user.$id, posts)
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
                    maker={item.maker.username}
                    avatar={item.maker.avatar}
                />
            )}
            ListHeaderComponent={() => (
                <View className='w-full justify-center items-center mt-6 mb-12 px-4'>
                    <TouchableOpacity 
                        className='w-full items-end mb-10'
                        onPress={logout}
                    >
                        <Image 
                            source = {icons.logout}
                            resizeMode="contain"
                            className="w-6 h-6"
                        />
                    </TouchableOpacity>
                    <View className='w-16 h-16 border border-secondary-100 rounded-lg justify-center items-center'>
                        <Image 
                            source ={{uri:user?.avatar}}
                            className='w-[90%] h-[90%] rounded-lg'
                            resizeMode="cover"
                        />
                    </View>
                    <InfoBox 
                        title={user?.username}
                        containerStyle='mt-10'
                        titleStyle='text-lg'
                    />

                    <View className='mt-5 flex-row'>
                        <InfoBox 
                            title={posts.length || 0}
                            subtitle='Posts'
                            containerStyle='mr-12 '
                            titleStyle='text-xl'
                        />
                        <InfoBox 
                            title='1232'
                            subtitle='Followers'
                            containerStyle='ml-5 px-5 items-end'
                            titleStyle='text-lg'
                        />
                    </View>

                </View>
            )}
        />
    </SafeAreaView>
  )
}

export default Profile