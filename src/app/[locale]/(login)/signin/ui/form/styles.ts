import { FontBody1Accent, FontBody1, FontBody2, FontCaptionAccent } from '@/shared/consts/fontStyles'
import { tss } from 'tss-react/mui'
import {
  Black,
  SlateGreyDarken7,
  White,
  GreyBase,
  TextSlateGreyLighten30,
  TextSlateGreyLighten8,
  PinkBrownBase,
  PinkBrownLighten30,
  PinkBrownDisabled,
} from '@/shared/consts/colors'
import { BreakPoints } from '@/shared/consts/common'
import { Button, styled } from '@mui/material'

export default tss.withName('SignIn').create({
  formWrapper: {
    maxWidth: '100%',
    minWidth: 300,
    width: '100%',
    backgroundColor: White,
    padding: 25,
    borderRadius: 10,
    margin: '20px auto',

    [`@media (min-width: ${BreakPoints.LARGE})`]: {
      padding: '0px',
      borderRadius: '0px',
      margin: 'auto',
      maxWidth: 400,
    },
  },
  textField: {
    background: White,
    borderRadius: 4,

    '& input': {
      color: 'black',
    },
  },
  formSection: {
    flex: 1,
    alignSelf: 'center',
    padding: '0 10px',
    height: '100%',
    display: 'flex',

    [`@media (min-width: ${BreakPoints.LARGE})`]: {
      height: 'initial',
      display: 'block',
    },
  },
  logoName: {
    ...FontCaptionAccent,
    color: PinkBrownBase,
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
  linkForgot: {
    ...FontBody1,
    display: 'flex',
    justifyContent: 'flex-end',
    color: GreyBase,
    textDecoration: 'underline',
  },
  signInButton: {},
  registerSection: {},
  registerContent: {
    // ...FontBody1,
    color: GreyBase,
    marginTop: 10,
    textAlign: 'center',

    [`@media (min-width: ${BreakPoints.LARGE})`]: {
      textAlign: 'right',
    },
  },
  linkRegister: {
    // ...FontBody1Accent,
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
