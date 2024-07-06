import { View, Text, TextInput, TouchableOpacity, Image, Alert } from 'react-native'
import React, { useState } from 'react'
import { icons } from '../constants'
import { router, usePathname } from 'expo-router'


const SearchInput = ({initialQuery}) => {
    const pathname = usePathname();
    const [query, setQuery] = useState(initialQuery || '');
  return (
    <View className='border border-gray-800 w-full h-12 px-4 bg-gray-900 rounded-lg flex-row items-center space-x-4 '>
        <TextInput
            className="text-base mt-0.5 text-white flex-1 font-pregular"
            value={query}
            placeholder='Search for a Video / Topic'
            placeholderTextColor='#CDCDE0'
            onChangeText={(e) => setQuery(e)}
            
        />
        <TouchableOpacity
            onPress = {() => {
                if(!query){
                    Alert.alert('Error', 'Please enter a search term')
                }

                if(pathname.startsWith('/search'))
                    router.setParams({query})
                
                else 
                    router.push(`/search/${query}`)
                
            }}
        >
            <Image
                source={icons.search}
                className='w-4 h-4'
                resizeMode='contain'
            />
        </TouchableOpacity>
    </View>
  )
}

export default SearchInput
