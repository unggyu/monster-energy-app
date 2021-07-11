import { DrinkScreenProps, RootStackParamList } from 'monster-energy-app'
import React from 'react'
import { DrinkSlider } from '../components'

const DrinkScreen = ({
  navigation
}: DrinkScreenProps) => (
  <DrinkSlider navigation={navigation} />
)

export default DrinkScreen