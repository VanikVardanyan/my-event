import { FontBody1Accent, FontBody1, FontBody2 } from '@/shared/consts/fontStyles'
import { tss } from 'tss-react/mui'
import {
  Black,
  PurpleBase,
  SlateGreyDarken7,
  White,
  GreyBase,
  TextSlateGreyLighten30,
  TextSlateGreyLighten8,
} from '@/shared/consts/colors'
import { BreakPoints } from '@/shared/consts/common'

export default tss.withName('SignIn').create({
  root: {
    width: '100%',
    height: 'calc(100vh - 62px)',
    display: 'flex',
  },
  bgSection: {
    flex: 1,
    backgroundImage: `url('/signin/background.png')`,
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
  formWrapper: {
    maxWidth: 400,
    minWidth: 300,
    width: '100%',
    margin: 'auto',
    backgroundColor: 'rgba(0, 0, 0, 0.69)',
    padding: 25,
    borderRadius: 10,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'right',

    [`@media (min-width: ${BreakPoints.LARGE})`]: {
      backgroundColor: White,
      padding: '0px',
      borderRadius: '0px',
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
    backgroundImage: `url('/signin/background.png')`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    height: '100%',
    display: 'flex',

    [`@media (min-width: ${BreakPoints.LARGE})`]: {
      backgroundImage: 'none',
      height: 'initial',
      display: 'block',
    },
  },
  formTitle: {
    ...FontBody2,
    marginBottom: 25,
    color: White,
    display: 'none',

    [`@media (min-width: ${BreakPoints.LARGE})`]: {
      color: Black,
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
    color: White,
    textAlign: 'center',

    [`@media (min-width: ${BreakPoints.LARGE})`]: {
      color: GreyBase,
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
  linkForgot: {
    ...FontBody1,
    display: 'flex',
    justifyContent: 'flex-end',
    color: White,
    textDecoration: 'underline',

    [`@media (min-width: ${BreakPoints.LARGE})`]: {
      color: GreyBase,
    },
  },
  signInButton: {},
  registerSection: {
    display: 'block',

    [`@media (min-width: ${BreakPoints.LARGE})`]: {
      display: 'none',
    },
  },
  registerContent: {
    ...FontBody1,
    color: White,
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
