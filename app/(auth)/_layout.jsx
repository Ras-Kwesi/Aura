import { View, Text } from 'react-native'
import React from 'react'

// Creating folder within parenthesis, its considered a route group allowing adding more screens with a specific layout
// The Auth screens wont have a footer navbar with links to different pages 
const AuthLayout = () => {
  return (
    <View>
      <Text>AuthLayout</Text>
    </View>
  )
}

export default AuthLayout