import { useState } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material'
import * as yup from 'yup'
import { Professions } from '@/shared/types/user.types'
import { addDoc, collection } from 'firebase/firestore'
import { db } from '@/shared/lib/firebaseConfig'
import { useSelector } from 'react-redux'
import { getProfile } from '@/store/selectors'
import { IRequestTypes } from './types'
import { asyncSetProfileThunk } from '@/store/features/profile-slice'
import { Dispatch } from '@/store/store'
import { useTranslations } from 'next-intl'

interface Iprops {
  handleClose: () => void
}
const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  maxWidth: 400,
  width: 'calc(100% - 10px)',
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: 4,
  p: 4,
}

export const RequestCreateModal = (props: Iprops) => {
  const { handleClose } = props
  const t = useTranslations('Request')
  const m = useTranslations('Menu')
  const shared = useTranslations('Shared')

  const categories = Object.values(Professions).map((item) => ({
    value: item,
    label: m(item.toLowerCase()),
  }))

  const schema = yup.object().shape({
    service: yup.string().required(t('required_field')),
    location: yup.string().required(t('required_field')),
    city: yup.string().required(t('required_field')),
    personQuantity: yup.number().required(t('required_field')),
    amount: yup.string().required(t('required_field')),
    date: yup.string().required(t('required_field')),
  })

  const [category, setCategory] = useState('')
  const { userId } = useSelector(getProfile)
  const dispatch = Dispatch()

  const { handleSubmit, register, formState, control } = useForm<IRequestTypes>({
    defaultValues: {
      city: '',
      service: '',
      location: '',
      personQuantity: 0,
      amount: '',
      date: '',
    },
    resolver: yupResolver(schema),
  })

  const { errors } = formState

  const onSubmit: SubmitHandler<IRequestTypes> = async (data: any) => {
    if (data) {
      await addDoc(collection(db, 'requests'), {
        userId: userId,
        ...data,
        createdAt: new Date(),
        responses: [], // Добавляем пустой массив откликнувшихся пользователей
      }).then((resp) => {
        dispatch(asyncSetProfileThunk())
        handleClose()
      })
    }
  }

  const handleChange = (event: any) => {
    setCategory(event.target.value)
  }

  const formatNumber = (value: string) => {
    return value.replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
  }

  return (
    <Box sx={style}>
      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <Typography id="modal-modal-title" variant="h6" component="h2" mb={2}>
          {t('create_request')}
        </Typography>
        <Grid container spacing={3} mb={2}>
          <Grid item xs={12} sm={10}>
            <TextField
              required
              id="city"
              label={t('city')}
              {...register('city')}
              fullWidth
              size="small"
              autoComplete="off"
              variant="outlined"
              error={!!errors.city}
              helperText={errors.city?.message}
            />
          </Grid>
          <Grid item xs={12} sm={10}>
            <TextField
              required
              id="location"
              label={t('location')}
              {...register('location')}
              fullWidth
              size="small"
              autoComplete="off"
              variant="outlined"
              error={!!errors.location}
              helperText={errors.location?.message}
            />
          </Grid>
          <Grid item xs={12} sm={7}>
            <FormControl fullWidth size="small">
              <InputLabel id="demo-simple-select-label">{t('service')}</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={category}
                {...register('service')}
                error={!!errors.service}
                label={t('select_service')}
                onChange={handleChange}
                fullWidth
              >
                {categories.map((item) => (
                  <MenuItem key={item.label} value={item.value}>
                    {item.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={10}>
            <TextField
              required
              id="personQuantity"
              label={t('person_quantity')}
              {...register('personQuantity')}
              type="number"
              fullWidth
              size="small"
              autoComplete="off"
              variant="outlined"
              error={!!errors.personQuantity}
              helperText={errors.personQuantity?.message}
            />
          </Grid>
          <Grid item xs={12} sm={10}>
            <Controller
              name="amount"
              control={control}
              render={({ field: { onChange, onBlur, value, ref } }) => (
                <TextField
                  required
                  id="amount"
                  type="text"
                  label={t('budget')}
                  onChange={(e) => {
                    const onlyNumbers = e.target.value.replace(/\D/g, '') // Удаляет все нецифровые символы
                    onChange(formatNumber(onlyNumbers))
                  }}
                  onBlur={onBlur}
                  value={value}
                  fullWidth
                  size="small"
                  autoComplete="off"
                  variant="outlined"
                  error={!!errors.amount}
                  helperText={errors.amount?.message}
                  inputRef={ref}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={10}>
            <TextField
              required
              id="data"
              label={t('date')}
              type="date"
              {...register('date')}
              fullWidth
              size="small"
              autoComplete="off"
              variant="outlined"
              error={!!errors.date}
              helperText={errors.date?.message}
            />
          </Grid>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Button variant="contained" type="submit" fullWidth>
            <Typography variant="button">{t('create_request')}</Typography>
          </Button>
          <Button variant="contained" type="button" onClick={handleClose} fullWidth sx={{ mt: 1 }}>
            <Typography variant="button">{shared('cancel')}</Typography>
          </Button>
        </Grid>
      </Box>
    </Box>
  )
}
