'use client'

import { Player, Controls } from '@lottiefiles/react-lottie-player'
import Animater from './loading-animate.json'

export const Loader = () => {
  return <Player autoplay loop src={Animater} style={{ height: '300px', width: '300px' }} />
}
