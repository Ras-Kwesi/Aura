import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import { icons } from '../constants'


const SearchInput = ({title, value, handleChangeText, otherStyles, placeholder, ...props}) => {
    const [showPassword, setShowPassword] = useState(false)
  return (
    <View className='border border-gray-800 w-full h-12 px-4 bg-gray-900 rounded-lg flex-row items-center space-x-4 '>
        <TextInput
            className="text-base mt-0.5 text-white flex-1 font-pregular"
            value={value}
            placeholder='Search for a Video / Topic'
            placeholderTextColor='#7b7b8b'
            onChangeText={handleChangeText}
            secureTextEntry={title==='Password' && !showPassword}
            {...props}
        />
        <TouchableOpacity>
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
