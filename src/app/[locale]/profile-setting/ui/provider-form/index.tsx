import { FormHelperText, TextField, styled } from '@mui/material'
import { MuiTelInput } from 'mui-tel-input'
import useStyles, { VisuallyHiddenInput } from './styles'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import { useFormContext } from 'react-hook-form'
import Select from 'react-select'
import makeAnimated from 'react-select/animated'
import { Countries, Professions, UserType } from '@/shared/types/user.types'
import { useSelector } from 'react-redux'
import { getProfile } from '@/store/selectors'
import { useTranslations } from 'next-intl'
import { UploadButton } from '../../styles'
import { useAuth } from '@/shared/lib/auth-context'
import dynamic from 'next/dynamic'

const WithStyledFlag = styled(MuiTelInput)``

const CustomEditor = dynamic(() => import('@/shared/ui/ck-editor'), { ssr: false })

export const ProviderForm = () => {
  const { classes } = useStyles()
  const animatedComponents = makeAnimated()
  const { profile } = useSelector(getProfile)
  const { user } = useAuth()

  const t = useTranslations()

  const professionsOptions = [
    { value: Professions.Showman, label: t(Professions.Showman) },
    { value: Professions.Photographers, label: t(Professions.Photographers) },
    { value: Professions.Djs, label: t(Professions.Djs) },
    { value: Professions.Musicians, label: t(Professions.Musicians) },
    { value: Professions.EquipmentRental, label: t(Professions.EquipmentRental) },
    { value: Professions.CarsRental, label: t(Professions.CarsRental) },
    { value: Professions.CostumeRental, label: t(Professions.CostumeRental) },
    { value: Professions.floristsDecorators, label: t(Professions.floristsDecorators) },
    { value: Professions.DancersEntertainers, label: t(Professions.DancersEntertainers) },
    { value: Professions.Cake, label: t(Professions.Cake) },
    { value: Professions.Restaurants, label: t(Professions.Restaurants) },
    { value: Professions.Show, label: t(Professions.Show) },
  ]

  const countryOptions = [
    { value: Countries.Armenia, label: Countries.Armenia },
    { value: Countries.Georgia, label: Countries.Georgia },
    { value: Countries.Russia, label: Countries.Russia },
  ]

  const [avatarPreview, setAvatarPreview] = useState<string | null>(profile?.avatar || null)

  const { register, formState, setValue, reset, watch } = useFormContext()

  useEffect(() => {
    reset()

    setValue('role', UserType.PROVIDER)
    if (profile) {
      setValue('name', profile?.name)
      setValue('role', profile?.role)
      setValue('profession', profile?.profession || [])
      setValue('country', profile?.country || '')
      setValue('facebook', profile?.facebook || '')
      setValue('instagram', profile?.instagram || '')
      setValue('youtube', profile?.youtube || '')
      setValue('tiktok', profile?.tiktok || '')
      setValue('phone', profile?.phone || '')
      setValue('email', profile?.email || '')
      setValue('description', profile?.description || '')
    }
  }, [])

  useEffect(() => {
    if (profile === null && user) {
      console.log('user', user)
      setValue('email', user?.email || '')
      setValue('name', user?.displayName || '')
    }
  }, [profile, user])

  const professionWatcher = watch('profession')
  const countryWatcher = watch('country')
  const descriptionValue = watch('description')

  const { errors } = formState

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]

    if (file) {
      setAvatarPreview(URL.createObjectURL(file))
      setValue('avatar', file)
    }
  }

  const professionsSelectHandler = (selectedOptions: any) => {
    setValue(
      'profession',
      selectedOptions.map((item: any) => item.value)
    )
  }

  const countrySelectHandler = (selectedOptions: any) => {
    setValue(
      'country',
      selectedOptions.map((item: any) => item.value)
    )
  }

  const { onChange, ...registerPhone } = register('phone')

  const phoneChangeHandler = (value: string) => {
    setValue('phone', value)
  }

  const phone = watch('phone')

  console.log(register('description'))

  return (
    <div className={classes.root}>
      <div className={classes.nameSection}>
        <div className={classes.avatarWrapper}>
          <div className={classes.avatar}>
            <Image
              src={avatarPreview || '/default.jpg'}
              width={150}
              height={150}
              alt="Avatar Preview"
              className={classes.avatar}
            />
          </div>
          <UploadButton
            // @ts-ignore
            component="label"
            role={undefined}
            variant="contained"
            tabIndex={-1}
            startIcon={<CloudUploadIcon />}
            fullWidth
          >
            {t('upload_avatar')}
            <VisuallyHiddenInput type="file" onChange={handleAvatarChange} />
          </UploadButton>
        </div>

        <div className={classes.avatarSection}>
          <TextField
            required
            fullWidth
            autoCorrect="off"
            {...register('name')}
            label={t('name')}
            placeholder={t('enter_name')}
            type="text"
            autoComplete="off"
            error={!!errors.name}
            helperText={errors?.name?.message as string}
            size="small"
          />
          <WithStyledFlag size="small" onChange={phoneChangeHandler} value={phone} defaultCountry="AM" />
          <TextField
            fullWidth
            autoCorrect="off"
            {...register('email')}
            label={t('email')}
            placeholder={t('enter_email')}
            type="text"
            autoComplete="off"
            error={!!errors.email}
            helperText={errors?.email?.message as string}
            size="small"
          />
          <div className={classes.selectProfession}>
            <Select
              closeMenuOnSelect
              components={animatedComponents}
              options={countryOptions}
              placeholder={t('country')}
              onChange={countrySelectHandler}
              defaultValue={{ label: t(Countries.Armenia), value: Countries.Armenia }}
              isDisabled
              isOptionDisabled={() => countryWatcher && countryWatcher.length >= 2}
            />
            <FormHelperText error>{errors?.country?.message as string}</FormHelperText>
          </div>
        </div>
      </div>
      <div className={classes.selectProfession}>
        <Select
          closeMenuOnSelect={false}
          components={animatedComponents}
          isMulti
          options={professionsOptions}
          placeholder={t('select_profession')}
          onChange={professionsSelectHandler}
          isOptionDisabled={() => professionWatcher && professionWatcher.length >= 2}
          value={professionWatcher?.map((item: any) => ({ label: t(item), value: item }))}
        />
        <FormHelperText error>{errors?.profession?.message as string}</FormHelperText>
      </div>
      {/* <div className={classes.ckEditor}>
        <FormHelperText>{t('describe_yourself')}</FormHelperText>
        <CustomEditor descriptionValue={descriptionValue} setValue={setValue} />
      </div> */}
    </div>
  )
}
