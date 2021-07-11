import { RouteProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParamList } from 'monster-energy-app'
import React from 'react'
import { Details } from '../components'

type DetailsScreenRouteProp = RouteProp<RootStackParamList, 'Details'>
type DetailsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Details'>
type Props = {
  route: DetailsScreenRouteProp
  navigation: DetailsScreenNavigationProp
}

const DetailsScreen = ({
  route: {
    params: { background, logo }
  },
  navigation: { goBack }
}: Props) => (
  <Details
    background={background}
    logo={logo}
    goBack={goBack}
  />
)

export default DetailsScreen