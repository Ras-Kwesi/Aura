import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Slot, Stack } from 'expo-router'

const RootLayout = () => {
  return (
    <>
    <Text>Header</Text>
  <Slot />  
  {/* Returns the current child route */}
    <Text>Footer</Text>
    </>
  )
}
export default RootLayout
