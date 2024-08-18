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
} from '@/shared/consts/colors'
import { BreakPoints } from '@/shared/consts/common'
import { styled } from '@mui/system'
import { Button } from '@mui/material'

export default tss.withName('Register').create({
  root: {
    width: '100%',
    height: 'calc(100vh - 62px)',
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
    padding: '0 10px',
    height: '100%',
    display: 'flex',

    [`@media (min-width: ${BreakPoints.LARGE})`]: {
      backgroundImage: 'none',
      height: 'initial',
      display: 'block',
    },
  },
  formWrapper: {
    maxWidth: '100%',
    minWidth: 300,
    width: '100%',
    padding: 25,
    backgroundColor: White,
    borderRadius: 10,
    margin: '20px auto',

    [`@media (min-width: ${BreakPoints.LARGE})`]: {
      padding: '0px',
      borderRadius: '0px',
      margin: 'auto',
      maxWidth: 400,
    },
  },
  formTitle: {
    ...FontBody2,
    marginBottom: 25,
    color: Black,
    display: 'none',

    [`@media (min-width: ${BreakPoints.LARGE})`]: {
      display: 'block',
    },
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
    // ...FontBody1,
    color: White,
    marginTop: 10,
  },
  registerContentForm: {
    // ...FontBody1,
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
})

export const SignInButton = styled(Button)({
  backgroundColor: PinkBrownBase,
  color: 'white',

  '&:hover': {
    backgroundColor: PinkBrownLighten30,
  },

  '&:disabled': {
    backgroundColor: PinkBrownDisabled,
  },
})
