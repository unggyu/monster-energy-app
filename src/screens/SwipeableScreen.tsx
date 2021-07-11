import React from 'react'
import { SwipeableScreenProps } from 'monster-energy-app'
import { SwipeableDrinks } from '../components'

const SwipeableScreen = ({
  route: {
    params: { item1, item2 }
  },
  navigation: { goBack }
}: SwipeableScreenProps) => (
  <SwipeableDrinks
    item1={item1}
    item2={item2}
    goBack={goBack}
  />
)

export default SwipeableScreen