import { Button, styled } from '@mui/material'
import { tss } from 'tss-react/mui'
import {
  Black,
  DarkBlueBase,
  DarkBlueDarken16,
  DarkBlueDarken4,
  DarkBlueDisabled,
  GreyBase,
  PinkBrownBase,
  PinkBrownDisabled,
  PinkBrownLighten30,
  SlateGreyDarken7,
  TextSlateGreyLighten30,
  TextSlateGreyLighten8,
  White,
} from '../../consts/colors'
import { BreakPoints } from '../../consts/common'
import { FontBody1, FontBody1Accent, FontBody2 } from '../../consts/fontStyles'

export default tss.withName('SignInModal').create({
  root: {},
  formWrapper: {
    maxWidth: '100%',
    minWidth: 300,
    width: '100%',
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
    height: '100%',
    display: 'flex',

    [`@media (min-width: ${BreakPoints.LARGE})`]: {
      height: 'initial',
      display: 'block',
    },
  },
  formTitle: {
    ...FontBody2,
    marginBottom: 25,
    color: Black,
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
    margin: '20px auto',
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
    marginTop: 15,
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

export const LoginButton = styled(Button)({
  backgroundColor: PinkBrownBase,
  color: White,
  borderRadius: 16,

  '&:hover': {
    backgroundColor: PinkBrownLighten30,
    border: `1px solid ${TextSlateGreyLighten30}`,
  },
})

export const SignInButton = styled(Button)({
  backgroundColor: DarkBlueBase,
  color: 'white',

  '&:hover': {
    backgroundColor: DarkBlueDarken4,
  },

  '&:disabled': {
    backgroundColor: DarkBlueDisabled,
  },
})
