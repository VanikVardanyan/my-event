'use client'

import { Box, Grid, Typography, Card, CardContent, CardMedia } from '@mui/material'
import { RequestList } from './ui/list'
import { ProtectedRoute } from '@/shared/lib/protected-router'
import { UserType } from '@/shared/types/user.types'
import { useSelector } from 'react-redux'
import { getProfile } from '@/store/selectors'
import { Loader } from '@/shared/ui/Loader'

const RequestsList = () => {
  const { loading } = useSelector(getProfile)

  if (loading) return <Loader />

  return (
    <ProtectedRoute requiredRole={UserType.PROVIDER}>
      <Box>
        <Typography variant="h4" gutterBottom>
          Все запросы
        </Typography>
        <RequestList />
      </Box>
    </ProtectedRoute>
  )
}

export default RequestsList
