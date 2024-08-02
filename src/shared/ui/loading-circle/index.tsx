'use client'

import { Player } from '@lottiefiles/react-lottie-player'
import Animater from './loader-animate.json'

import React from 'react'

export const LoadingCircle = (styles?: any) => {
  const defaultStyles = { width: 18, height: 18 }
  return <Player autoplay loop src={Animater} style={defaultStyles} />
}
