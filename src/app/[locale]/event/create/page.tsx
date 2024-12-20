'use client'

import { useTranslations } from 'next-intl'
import { Container } from '../../styles'
import { EventTypes, Professions } from '@/shared/types/user.types'
import * as yup from 'yup'
import { Suspense, useEffect, useState } from 'react'
import { getProfile } from '@/store/selectors'
import { useSelector } from 'react-redux'
import { Dispatch } from '@/store/store'
import { Controller, SubmitHandler, useForm, useFieldArray } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { asyncSetProfileThunk } from '@/store/features/profile-slice'
import { addDoc, collection, doc, getDoc, updateDoc } from 'firebase/firestore'
import { db } from '@/shared/lib/firebaseConfig'
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  Typography,
  IconButton,
} from '@mui/material'
import { ArmenianCity } from '@/shared/common/citys'
import { AmdIcon } from '@/shared/icons'
import useStyles, { AddRequestButton } from './styles'
import DeleteIcon from '@mui/icons-material/Delete'
import AddIcon from '@mui/icons-material/Add'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import { Link, useRouter } from '@/navigation'
import { Routes } from '@/shared/routes'
import { useSearchParams } from 'next/navigation'
import { useAuth } from '@/shared/lib/auth-context'
import { IRequestTypes, ServiceSearchStatus } from './types'
import { v4 as uuidv4 } from 'uuid'
import { LoadingOverlay } from '@/shared/ui/loading-overlay'

const CreateEvent = () => {
  const t = useTranslations()
  const [loading, setLoading] = useState(false)
  const { classes } = useStyles()
  const router = useRouter()
  const searchParams = useSearchParams()
  const { user } = useAuth()

  const searchId = searchParams.get('id')
  const isHasPrevData = localStorage.getItem('prevData')

  const categories = Object.values(Professions).map((item) => ({
    value: item,
    label: t(item.toLowerCase()),
  }))

  const eventTypes = Object.values(EventTypes).map((item) => ({
    value: item,
    label: t(item.toLowerCase()),
  }))

  const schema = yup.object().shape({
    title: yup.string().required(),
    type: yup.string().required(),
    city: yup.string().required(),
    date: yup.string().required(),
    location: yup.string().required(),
    personQuantity: yup.number().required().min(1),
    services: yup
      .array()
      .of(
        yup.object().shape({
          service: yup.string().required(),
          amount: yup.string().required(),
          id: yup.string().required(),
          status: yup.mixed<ServiceSearchStatus>().oneOf(Object.values(ServiceSearchStatus)).required(),
          selections: yup
            .array()
            .of(
              yup.object().shape({
                isInstagram: yup.boolean(),
                id: yup.string().required(),
                avatar: yup.string(),
                name: yup.string().required(),
                userName: yup.string(),
              })
            )
            .required(),
          respondents: yup
            .array()
            .of(
              yup.object().shape({
                userId: yup.string().required(),
                userName: yup.string().required(),
                avatar: yup.string(),
                isApprove: yup.boolean().required(),
              })
            )
            .required(),
        })
      )
      .required(),
    other: yup.string(),
  })

  const { userId } = useSelector(getProfile)
  const dispatch = Dispatch()
  const uniqueId = uuidv4()

  const { handleSubmit, register, formState, control, setValue, watch } = useForm<IRequestTypes>({
    defaultValues: {
      title: '',
      type: '',
      city: '',
      date: '',
      location: '',
      personQuantity: 0,
      services: [
        { service: '', amount: '', status: ServiceSearchStatus.Todo, id: uniqueId, selections: [], respondents: [] },
      ],
      other: '',
    },
    resolver: yupResolver(schema),
  })

  const setValues = (data: any) => {
    setValue('title', data.title)
    setValue('type', data.type)
    setValue('city', data.city)
    setValue('date', data.date)
    setValue('location', data.location)
    setValue('personQuantity', data.personQuantity)
    setValue('services', data.services)
    setValue('other', data.other)
  }

  const countryWatch = watch('city')
  const typesWatch = watch('type')

  const fetchRequest = async () => {
    if (!user || searchId === null) {
      setLoading(false)
      return
    }
    const docRef = doc(db, 'requests', searchId)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      const requestData: any = docSnap.data()
      if (requestData.userId === user.uid) {
        setValues(requestData)
        setLoading(false)
      } else {
        router.push(Routes.Profile)
      }
    } else {
      setLoading(false)
    }
    setLoading(false)
  }

  const goToBack = () => {
    router.back()
  }

  useEffect(() => {
    if (searchId && user) {
      setLoading(true)
      fetchRequest()
    }
  }, [searchId, user])

  useEffect(() => {
    if (localStorage.getItem('prevData') && user?.uid) {
      const requestData = JSON.parse(localStorage.getItem('prevData') as string)
      setValues(requestData)
      localStorage.removeItem('prevData')
    }
  }, [user?.uid])

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'services',
  })

  const { errors } = formState

  const onSubmit: SubmitHandler<IRequestTypes> = async (data: IRequestTypes) => {
    setLoading(true)
    if (!userId) {
      setLoading(false)
      localStorage.setItem('prevData', JSON.stringify(data))
      router.push(Routes.Signin)
      return
    }

    try {
      if (searchId) {
        const docRef = doc(db, 'requests', searchId as string)
        const docSnap = await getDoc(docRef)

        if (docSnap.exists() && docSnap.data().userId === userId) {
          // Обновляем существующий документ
          await updateDoc(docRef, {
            ...data,
            updatedAt: new Date(),
          })
          dispatch(asyncSetProfileThunk())
          router.push(Routes.Profile)
        } else {
          setLoading(false)
        }
      } else {
        // Создаем новый документ
        await addDoc(collection(db, 'requests'), {
          userId,
          ...data,
          createdAt: new Date(),
          responses: [],
        })
        dispatch(asyncSetProfileThunk())
        router.push(Routes.Profile)
      }
    } catch (error) {
      console.error('Error adding/updating document: ', error)
    } finally {
      setLoading(false)
    }
  }

  const formatNumber = (value: string) => {
    return value.replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
  }

  if (loading) return <LoadingOverlay loading />

  return (
    <Container>
      <Box component="form" onSubmit={handleSubmit(onSubmit)} className={classes.form}>
        <Typography id="modal-modal-title" variant="h6" component="h2" mb={2}>
          {searchId ? t('event_edit') : t('create_event')}
        </Typography>
        <Grid container spacing={3} mb={2}>
          <Grid item xs={12} sm={10}>
            <TextField
              required
              InputLabelProps={{ shrink: searchId || isHasPrevData ? true : undefined }}
              id="title"
              label={t('title')}
              {...register('title')}
              fullWidth
              size="small"
              autoComplete="off"
              variant="outlined"
              error={!!errors.title}
              helperText={errors.title?.message}
            />
          </Grid>
          <Grid item xs={12} sm={10}>
            <FormControl fullWidth size="small" style={{ minWidth: 276 }}>
              <InputLabel id="demo-simple-select-label">{t('event_types')}</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={typesWatch}
                {...register('type')}
                error={!!errors.type}
                label={t('event_types')}
                fullWidth
              >
                {eventTypes.map((item) => (
                  <MenuItem key={item.label} value={item.value}>
                    {item.label}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText error>{errors.type?.message}</FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={10}>
            <FormControl fullWidth size="small" style={{ minWidth: 276 }}>
              <InputLabel id="demo-simple-select-label">{t('city')}</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={countryWatch}
                {...register('city')}
                error={!!errors.city}
                label={t('city')}
                fullWidth
              >
                {ArmenianCity.map((item) => (
                  <MenuItem key={item.label} value={item.value}>
                    {t(item.label)}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText error>{errors.city?.message}</FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={10}>
            <TextField
              required
              id="date"
              type="date"
              {...register('date')}
              fullWidth
              size="small"
              autoComplete="off"
              variant="outlined"
              error={!!errors.date}
              helperText={errors.date?.message}
              label={t('date')}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12} sm={10}>
            <TextField
              required
              id="location"
              InputLabelProps={{ shrink: searchId || isHasPrevData ? true : undefined }}
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
          {fields.map((field, index) => (
            <Grid key={field.id} item xs={12} sm={10} className={classes.selectAction}>
              <Grid item xs={12} sm={12}>
                <FormControl fullWidth size="small">
                  <InputLabel id="demo-simple-select-label">{t('service')}</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    defaultValue={field.service}
                    {...register(`services.${index}.service`)}
                    error={!!errors.services?.[index]?.service}
                    label={t('select_service')}
                    fullWidth
                  >
                    {categories.map((item) => (
                      <MenuItem key={item.label} value={item.value}>
                        {item.label}
                      </MenuItem>
                    ))}
                  </Select>
                  <FormHelperText error>{errors.services?.[index]?.service?.message}</FormHelperText>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={12}>
                <Controller
                  name={`services.${index}.amount`}
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
                        error={!!errors.services?.[index]?.amount}
                        inputRef={ref}
                      />
                      <FormHelperText error>{errors.services?.[index]?.amount?.message}</FormHelperText>
                    </FormControl>
                  )}
                />
              </Grid>
              <IconButton
                aria-label="remove"
                onClick={() => remove(index)}
                disabled={fields.length === 1}
                className={classes.deletedServicesBtn}
              >
                <DeleteIcon />
              </IconButton>
            </Grid>
          ))}
          <Grid item xs={12} sm={10}>
            <Button
              variant="outlined"
              type="button"
              onClick={() =>
                append({
                  service: '',
                  amount: '',
                  status: ServiceSearchStatus.Todo,
                  id: uniqueId,
                  selections: [],
                  respondents: [],
                })
              }
            >
              <AddIcon /> {t('add_service')}
            </Button>
          </Grid>
          <Grid item xs={12} sm={10}>
            <TextField
              fullWidth
              autoCorrect="off"
              InputLabelProps={{ shrink: searchId || isHasPrevData ? true : undefined }}
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
        <div className={classes.actionBlock}>
          <AddRequestButton variant="contained" type="submit" startIcon={<AddCircleOutlineIcon />}>
            <Typography variant="button">{searchId ? t('save') : t('create_event')}</Typography>
          </AddRequestButton>
          <Button variant="outlined" type="button" onClick={goToBack}>
            <Typography variant="button">{searchId ? t('come_back') : t('cancel')}</Typography>
          </Button>
        </div>
      </Box>
    </Container>
  )
}

const CreateEventWrapper = () => (
  <Suspense fallback={<LoadingOverlay loading />}>
    <CreateEvent />
  </Suspense>
)

export default CreateEventWrapper
