import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'

// Creating folder within parenthesis, its considered a route group allowing adding more screens with a specific layout
// The Auth screens wont have a footer navbar with links to different pages 
const AuthLayout = () => {
  return (
    <>
      <Stack>
        <Stack.Screen name="sign-in" options={{ headerShown: false }} />
        <Stack.Screen name="sign-up" options={{ headerShown: false }} />
      </Stack>
      <StatusBar style="light" backgroundColor='#161622'/>
    </>
  )
}

export default AuthLayout