import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import { icons } from '../constants'


const FormField = ({title, value, handleChangeText, otherStyles, placeholder, ...props}) => {
    const [showPassword, setShowPassword] = useState(false)
  return (
    <View className={`mb-4 ${otherStyles}`}>
      <Text className="text-lg text-white mb-2">
        {title}
      </Text>
      <View className='border border-red-400 w-full h-12 px-4 bg-gray-900 rounded-lg flex-row items-center'>
          <TextInput
              className="flex-1 text-lg text-white"
              value={value}
              placeholder={placeholder}
              placeholderTextColor='#7b7b8b'
              onChangeText={handleChangeText}
              secureTextEntry={title==='Password' && !showPassword}
              {...props}
          />
          {title === 'Password' && (
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                  <Image
                      source={showPassword ? icons.eye : icons.eyeHide}
                      className='w-6 h-6'
                      resizeMode='contain'
                  />
              </TouchableOpacity>
          )}
      </View>
    </View>
  )
}

export default FormField
