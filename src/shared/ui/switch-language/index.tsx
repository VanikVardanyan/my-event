'use client'

import * as React from 'react'
import { usePathname } from 'next/navigation'
import { useRouter } from 'next/navigation'
import { useLocale, useTranslations } from 'next-intl'
import { IconButton, Menu, MenuItem } from '@mui/material'
import { tss } from 'tss-react/mui'
import { Languages } from '../../types/common'
import { EngFlagIcon, HyFlagIcon, LanguageIcon, RusFlagIcon } from '../../icons'
import styles from './styles.module.scss'

const useStyles = tss.create({
  switchButton: {
    height: 40,
    border: 'none',
    borderRadius: 4,
  },
  lngItem: {
    padding: 0,
    minHeight: 'inherit',
  },
})

function removeLanguageFromURL(url: string) {
  const parts = url.split('/')

  // Регулярное выражение для проверки, что часть строки является кодом языка (2 или 3 символа)
  const langRegex = /^[a-zA-Z]{2,3}$/

  // Если URL состоит из двух частей и вторая часть является кодом языка
  if (parts.length === 2 && langRegex.test(parts[1])) {
    return '/'
  }

  // Если URL состоит из более чем двух частей и вторая часть является кодом языка
  if (parts.length > 2 && langRegex.test(parts[1])) {
    parts.splice(1, 1)
  }

  return parts.join('/')
}

export const SwitchLanguage = React.memo(() => {
  const router = useRouter()
  const pathname = usePathname()
  const locale = useLocale()
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const openPopup = Boolean(anchorEl)
  const openPopupHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const { classes } = useStyles()

  const handleClose = () => {
    setAnchorEl(null)
  }

  const t = useTranslations('Language')

  const createHandleMenuClick = (lng: string) => {
    return () => {
      router.replace(`/${lng}/${removeLanguageFromURL(pathname)}`)
      setTimeout(() => {
        window.location.reload()
      }, 1000)
    }
  }

  return (
    <div>
      <IconButton
        id="basic-button-menu"
        aria-controls={openPopup ? 'basic-menu-anchor' : undefined}
        aria-haspopup="true"
        aria-expanded={openPopup ? 'true' : undefined}
        onClick={openPopupHandler}
        className={classes.switchButton}
      >
        <span className={styles.languageText}>{t(locale)}</span> <LanguageIcon style={{ width: 30, height: 30 }} />
      </IconButton>
      <Menu
        id="basic-menu-anchor"
        anchorEl={anchorEl}
        open={openPopup}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
        sx={{
          top: '10px',
          '& ul': {
            padding: '5px',
          },
        }}
      >
        <MenuItem
          onClick={createHandleMenuClick(Languages.RU)}
          disabled={locale === Languages.RU}
          className={classes.lngItem}
        >
          <RusFlagIcon style={{ width: 30, height: 30 }} />
        </MenuItem>
        <MenuItem
          onClick={createHandleMenuClick(Languages.EN)}
          disabled={locale === Languages.EN}
          className={classes.lngItem}
        >
          <EngFlagIcon />
        </MenuItem>
        <MenuItem
          onClick={createHandleMenuClick(Languages.HY)}
          disabled={locale === Languages.HY}
          className={classes.lngItem}
        >
          <HyFlagIcon />
        </MenuItem>
      </Menu>
    </div>
  )
})
