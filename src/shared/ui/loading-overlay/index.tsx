// 'use client'

import { Player } from '@lottiefiles/react-lottie-player'
import Animater from './loader-animate.json'

import React from 'react'
import CircularProgress from '@mui/material/CircularProgress'
import { tss } from 'tss-react/mui'

const useStyles = tss.create(() => ({
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  content: {
    position: 'relative',
    zIndex: 10,
  },
}))

interface LoadingOverlayProps {
  loading: boolean
  children?: React.ReactNode
}

export const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ loading, children }) => {
  const { classes } = useStyles()

  return (
    <div className={classes.content}>
      {loading && (
        <div className={classes.overlay}>
          <Player autoplay loop src={Animater} style={{ height: '300px', width: '300px' }} />
        </div>
      )}
      {children && children}
    </div>
  )
}
