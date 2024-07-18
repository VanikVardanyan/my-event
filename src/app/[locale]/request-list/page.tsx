'use client'

import { Box, Grid, Typography, Card, CardContent, CardMedia } from '@mui/material'
import { RequestList } from './ui/list'
import { ProtectedRoute } from '@/shared/lib/protected-router'
import { UserType } from '@/shared/types/user.types'
import { useSelector } from 'react-redux'
import { getProfile } from '@/store/selectors'
import { Loader } from '@/shared/ui/Loader'
import { Suspense } from 'react'
import { Container } from '../styles'
import { useTranslations } from 'next-intl'
import { LoadingOverlay } from '../../../shared/ui/loading-overlay'

const RequestsList = () => {
  const { loading } = useSelector(getProfile)
  const t = useTranslations('RequestList')

  if (loading) return <LoadingOverlay loading />

  return (
    <ProtectedRoute requiredRole={UserType.PROVIDER}>
      <Container>
        <Box>
          <Typography variant="h4" gutterBottom>
            {t('all_requests')}
          </Typography>
          <RequestList />
        </Box>
      </Container>
    </ProtectedRoute>
  )
}

export default RequestsList
