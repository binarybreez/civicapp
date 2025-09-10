import {  Text, View, ScrollView } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

const create = () => {
  return (
    <SafeAreaView>
      <ScrollView>
      <Text>create</Text>
      </ScrollView>
    </SafeAreaView>
  )
}

export default create

