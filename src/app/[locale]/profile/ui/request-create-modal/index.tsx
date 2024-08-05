import { useState } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  Typography,
} from '@mui/material'
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
import { AmdIcon } from '@/shared/icons'
import { ArmenianCity } from '@/shared/common/citys'
import { AddRequestButton } from '@/shared/ui/profile-header/styles'
import CloseIcon from '@mui/icons-material/Close'

interface Iprops {
  handleClose: () => void
}

const closeBtnStyle = {
  position: 'absolute' as const,
  top: 10,
  right: 10,
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
  maxHeight: 'calc(100% - 10px)',
  overflowY: 'auto',
}

export const RequestCreateModal = (props: Iprops) => {
  const { handleClose } = props
  const t = useTranslations('Request')
  const m = useTranslations('Menu')
  const shared = useTranslations('Shared')
  const cityTranslate = useTranslations('Citys')

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
    other: yup.string(),
  })

  const [category, setCategory] = useState('')
  const [city, setCity] = useState('')
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
    // resolver: yupResolver(schema),
  })

  const { errors } = formState

  const onSubmit: SubmitHandler<IRequestTypes> = async (data: any) => {
    if (data) {
      await addDoc(collection(db, 'requests'), {
        userId: userId,
        ...data,
        createdAt: new Date(),
        responses: [],
      }).then(() => {
        dispatch(asyncSetProfileThunk())
        handleClose()
      })
    }
  }

  const handleChange = (event: any) => {
    setCategory(event.target.value)
  }
  const handleChangeCity = (event: any) => {
    setCity(event.target.value)
  }

  const formatNumber = (value: string) => {
    return value.replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
  }

  return (
    <Box sx={style}>
      <IconButton onClick={handleClose} style={closeBtnStyle}>
        <CloseIcon />
      </IconButton>
      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <Typography id="modal-modal-title" variant="h6" component="h2" mb={2}>
          {t('create_request')}
        </Typography>
        <Grid container spacing={3} mb={2}>
          <Grid item xs={12} sm={10}>
            <Grid item xs={12} sm={7}>
              <FormControl fullWidth size="small" style={{ minWidth: 276 }}>
                <InputLabel id="demo-simple-select-label">{t('city')}</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={city}
                  {...register('city')}
                  error={!!errors.city}
                  label={t('city')}
                  onChange={handleChangeCity}
                  fullWidth
                >
                  {ArmenianCity.map((item) => (
                    <MenuItem key={item.label} value={item.value}>
                      {cityTranslate(item.label)}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={10}>
            <TextField
              required
              id="data"
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
          <Grid item xs={12} sm={7}>
            <FormControl fullWidth size="small" style={{ minWidth: 276 }}>
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

          <Grid item xs={12} sm={10}>
            <Controller
              name="amount"
              control={control}
              render={({ field: { onChange, onBlur, value, ref } }) => (
                <FormControl fullWidth>
                  <OutlinedInput
                    id="outlined-adornment-weight"
                    endAdornment={<AmdIcon />}
                    aria-describedby="outlined-weight-helper-text"
                    inputProps={{
                      'aria-label': 'weight',
                    }}
                    size="small"
                    placeholder={t('budget')}
                    required
                    fullWidth
                    onChange={(e) => {
                      const onlyNumbers = e.target.value.replace(/\D/g, '') // Удаляет все нецифровые символы
                      onChange(formatNumber(onlyNumbers))
                    }}
                    value={value}
                    onBlur={onBlur}
                    error={!!errors.amount}
                    inputRef={ref}
                  />
                  <FormHelperText error>{errors.amount?.message as string}</FormHelperText>
                </FormControl>
              )}
            />
          </Grid>
          <Grid item xs={12} sm={10}>
            <TextField
              fullWidth
              autoCorrect="off"
              {...register('other')}
              label={t('description')}
              placeholder={t('description')}
              type="text"
              autoComplete="off"
              rows={4}
              multiline
            />
          </Grid>
        </Grid>
        <Grid item xs={12} sm={4}>
          <AddRequestButton variant="contained" type="submit" fullWidth>
            <Typography variant="button">{t('create_request')}</Typography>
          </AddRequestButton>
          <AddRequestButton variant="contained" type="button" onClick={handleClose} fullWidth sx={{ mt: 1 }}>
            <Typography variant="button">{shared('cancel')}</Typography>
          </AddRequestButton>
        </Grid>
      </Box>
    </Box>
  )
}
