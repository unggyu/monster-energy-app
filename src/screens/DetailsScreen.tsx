import { DetailsScreenProps } from 'monster-energy-app'
import React from 'react'
import { Details } from '../components'

const DetailsScreen = ({
  route: {
    params: { background, logo }
  },
  navigation: { goBack }
}: DetailsScreenProps) => (
  <Details
    background={background}
    logo={logo}
    goBack={goBack}
  />
)

export default DetailsScreen