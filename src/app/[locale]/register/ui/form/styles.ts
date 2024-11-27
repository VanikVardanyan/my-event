import { FontBody1Accent, FontBody1, FontBody2 } from '@/shared/consts/fontStyles'
import { tss } from 'tss-react/mui'
import {
  Black,
  SlateGreyDarken7,
  White,
  GreyBase,
  SlateGreyBase,
  TextSlateGreyLighten8,
  TextSlateGreyLighten30,
  PinkBrownBase,
  PinkBrownLighten30,
  PinkBrownDisabled,
  SlateGreyLighten34,
} from '@/shared/consts/colors'
import { BreakPoints } from '@/shared/consts/common'
import { styled } from '@mui/system'
import { Button } from '@mui/material'

export default tss.withName('Register').create({
  root: {
    width: '100%',
    display: 'flex',
  },
  bgSection: {
    flex: 1,
    backgroundImage: `url('/register/background.png')`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'right',
    justifyContent: 'center',
    alignItems: 'center',
    display: 'none',

    [`@media (min-width: ${BreakPoints.LARGE})`]: {
      display: 'flex',
    },
  },
  bgContent: {
    borderRadius: 10,
    padding: '12px',
    backgroundColor: 'rgba(0, 0, 0, 0.69)',
    color: White,
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center',
  },
  formSection: {
    flex: 1,
    alignSelf: 'center',
    padding: 10,
    height: '100%',
    display: 'flex',

    [`@media (min-width: ${BreakPoints.LARGE})`]: {
      backgroundImage: 'none',
      height: 'initial',
      display: 'block',
    },
  },
  fieldGroup: {
    display: 'flex',
    gap: 25,
    flexDirection: 'column',

    [`@media (min-width: ${BreakPoints.LARGE})`]: {
      flexDirection: 'row',
      gap: 14,
    },
  },

  formWrapper: {
    maxWidth: '100%',
    minWidth: 300,
    width: '100%',
    padding: 10,
    margin: '20px auto',
    background: '#F7F7F7',
    border: `1px solid #C8C8C8`,
    borderRadius: 16,

    [`@media (min-width: ${BreakPoints.LARGE})`]: {
      margin: 'auto',
      maxWidth: 400,
      padding: 25,
    },
  },
  formTitle: {
    ...FontBody2,
    fontWeight: 700,
    fontSize: 24,
    margin: '25px 0',
    color: Black,
    display: 'block',
    textAlign: 'center',
  },
  googleBtn: {
    ...FontBody1Accent,
    width: '100%',
    padding: 14,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
    outline: 'none',
    background: White,
    color: TextSlateGreyLighten8,
    cursor: 'pointer',
    border: `1px solid ${TextSlateGreyLighten30}`,
    borderRadius: 6,
  },
  withEmail: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 10,
    margin: '34px auto',
  },
  withEmailText: {
    ...FontBody1,
    color: GreyBase,

    textAlign: 'center',
  },
  textField: {
    background: White,
    borderRadius: 4,

    '& input': {
      color: 'black',
    },

    '& p': {
      background: '#F7F7F7',
      margin: 0,
      width: '100%',
    },
  },
  line: {
    height: 1,
    background: SlateGreyDarken7,
    flex: 1,
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: 25,
  },
  signInButton: {},
  footer: {
    ...FontBody1,
    color: SlateGreyBase,
  },
  registerSection: {
    display: 'block',
  },
  registerContent: {
    color: White,
    marginTop: 10,
  },
  registerContentForm: {
    color: Black,
    marginTop: 10,
  },
  linkRegister: {
    ...FontBody1Accent,
    textDecoration: 'underline',
  },
  title: {
    ...FontBody1Accent,
  },
  toggleWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: 25,
    background: SlateGreyLighten34,
    padding: 4,
    borderRadius: 8,
    gap: 10,
  },
})
