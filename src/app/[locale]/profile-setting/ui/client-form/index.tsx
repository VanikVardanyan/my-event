import { TextField } from '@mui/material'
import useStyles, { VisuallyHiddenInput } from './styles'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import { useFormContext } from 'react-hook-form'
import { UserType } from '@/shared/types/user.types'
import { useSelector } from 'react-redux'
import { getProfile } from '@/store/selectors'
import { useTranslations } from 'next-intl'
import { UploadButton } from '../../styles'
import { useAuth } from '@/shared/lib/auth-context'

export const ClientForm = () => {
  const { classes } = useStyles()
  const { profile } = useSelector(getProfile)
  const t = useTranslations('ProfileSetting')
  const { user } = useAuth()

  const [avatarPreview, setAvatarPreview] = useState<string | null>(profile?.avatar || null)

  const { register, formState, reset, setValue } = useFormContext()

  useEffect(() => {
    reset()
    setValue('role', UserType.CLIENT)

    if (profile) {
      setValue('name', profile?.name)
    }
  }, [])

  useEffect(() => {
    if (profile === null && user) {
      setValue('name', user?.displayName || '')
    }
  }, [profile, user])

  const { errors } = formState

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setAvatarPreview(URL.createObjectURL(file))
      setValue('avatar', file)
    }
  }

  return (
    <div className={classes.root}>
      <div className={classes.avatarSection}>
        <Image
          src={avatarPreview || '/default.jpg'}
          width={147}
          height={147}
          alt="Avatar Preview"
          className={classes.avatar}
        />
      </div>
      <div>
        <TextField
          margin="normal"
          required
          fullWidth
          InputLabelProps={{ shrink: true }}
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
    </div>
  )
}
