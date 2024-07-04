import { Button, FormHelperText, TextField, styled, useMediaQuery, useTheme } from '@mui/material'
import { MuiTelInput, classes } from 'mui-tel-input'
import useStyles, { VisuallyHiddenInput } from './styles'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import { useFormContext } from 'react-hook-form'
import Select from 'react-select'
import makeAnimated from 'react-select/animated'
import { Professions, UserType } from '@/shared/types/user.types'
import { useSelector } from 'react-redux'
import { getProfile } from '@/store/selectors'

const WithStyledFlag = styled(MuiTelInput)`
  .${classes.flagContainer} {
    filter: grayscale(100%);
    width: 20px;
  }
`

const professionsOptions = [
  { value: Professions.Showman, label: 'Шоумен' },
  { value: Professions.Photographer, label: 'Фотограф' },
  { value: Professions.Dj, label: 'Диджей' },
  { value: Professions.Musicians, label: 'Музыкант' },
  { value: Professions.EquipmentRental, label: 'Аренда оборудования' },
  { value: Professions.CarsRental, label: 'Аренда автомобилей' },
  { value: Professions.CostumeRental, label: 'Аренда костюмов' },
]

export const ProviderForm = () => {
  const { classes } = useStyles()
  const animatedComponents = makeAnimated()
  const { profile } = useSelector(getProfile)

  const [avatarPreview, setAvatarPreview] = useState<string | null>(profile?.avatar || null)

  const { register, formState, setValue, reset, watch } = useFormContext()

  useEffect(() => {
    reset()

    setValue('role', UserType.PROVIDER)
    if (profile) {
      setValue('name', profile?.name)
      setValue('role', profile?.role)
      setValue('profession', profile?.profession || [])
      setValue('nickname', profile?.nickname || '')
      setValue('facebook', profile?.facebook || '')
      setValue('instagram', profile?.instagram || '')
      setValue('youtube', profile?.youtube || '')
      setValue('tiktok', profile?.tiktok || '')
      setValue('phone', profile?.phone || '')
      setValue('email', profile?.email || '')
      setValue('description', profile?.description || '')
    }
  }, [])

  const professionWatcher = watch('profession')
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

  const { onChange, ...registerPhone } = register('phone')

  const phoneChangeHandler = (value: string) => {
    setValue('phone', value)
  }

  const phone = watch('phone')

  return (
    <div className={classes.root}>
      <div className={classes.nameSection}>
        <div className={classes.avatarWrapper}>
          <div className={classes.avatar}>
            <Image
              src={avatarPreview || '/default.jpg'}
              width={147}
              height={147}
              alt="Avatar Preview"
              className={classes.avatar}
            />
          </div>
          <Button
            component="label"
            role={undefined}
            variant="contained"
            tabIndex={-1}
            startIcon={<CloudUploadIcon />}
            fullWidth
          >
            Загрузить аватар
            <VisuallyHiddenInput type="file" onChange={handleAvatarChange} />
          </Button>
        </div>

        <div className={classes.avatarSection}>
          <TextField
            required
            fullWidth
            autoCorrect="off"
            {...register('name')}
            label={'Имя'}
            placeholder="Введите имя"
            type="text"
            autoComplete="off"
            error={!!errors.name}
            helperText={errors?.name?.message as string}
          />
          <WithStyledFlag onChange={phoneChangeHandler} value={phone} defaultCountry="AM" />
          <TextField
            fullWidth
            autoCorrect="off"
            {...register('nickname')}
            label={'Никнэйм'}
            placeholder="Введите никнэйм"
            type="text"
            autoComplete="off"
            error={!!errors.nickname}
            helperText={errors?.nickname?.message as string}
          />
          <TextField
            fullWidth
            autoCorrect="off"
            {...register('email')}
            label={'email'}
            placeholder="email"
            type="text"
            autoComplete="off"
            error={!!errors.email}
            helperText={errors?.email?.message as string}
          />
        </div>
      </div>
      <div className={classes.selectProfession}>
        <Select
          closeMenuOnSelect={false}
          components={animatedComponents}
          isMulti
          options={professionsOptions}
          placeholder="Выберите тип услуги (макс. 2)"
          onChange={professionsSelectHandler}
          isOptionDisabled={() => professionWatcher && professionWatcher.length >= 2}
          value={professionWatcher?.map((item: any) => ({ label: item, value: item }))}
        />
        <FormHelperText error>{errors?.profession?.message as string}</FormHelperText>
      </div>
      <TextField
        fullWidth
        autoCorrect="off"
        {...register('description')}
        label={'Опишите себя'}
        placeholder="Опишите себя"
        type="text"
        autoComplete="off"
        rows={4}
        multiline
      />
      <div className={classes.network}>
        <TextField
          fullWidth
          autoCorrect="off"
          {...register('facebook')}
          label={'Ссылка на ваш facebook'}
          placeholder="Ссылка на ваш facebook"
          type="text"
          autoComplete="off"
          size="small"
          error={!!errors.facebook}
          helperText={errors?.facebook?.message as string}
        />
        <TextField
          fullWidth
          autoCorrect="off"
          {...register('instagram')}
          label={'Ссылка на ваш instagram'}
          placeholder="Ссылка на ваш instagram"
          type="text"
          autoComplete="off"
          size="small"
          error={!!errors.instagram}
          helperText={errors?.instagram?.message as string}
        />
        <TextField
          fullWidth
          autoCorrect="off"
          {...register('youtube')}
          label={'Ссылка на ваш youtube'}
          placeholder="Ссылка на ваш youtube"
          type="text"
          autoComplete="off"
          size="small"
          error={!!errors.youtube}
          helperText={errors?.youtube?.message as string}
        />
        <TextField
          fullWidth
          autoCorrect="off"
          {...register('tiktok')}
          label={'Ссылка на ваш tiktok'}
          placeholder="Ссылка на ваш tiktok"
          type="text"
          autoComplete="off"
          size="small"
          error={!!errors.tiktok}
          helperText={errors?.tiktok?.message as string}
        />
      </div>
    </div>
  )
}
