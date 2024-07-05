import { FontBody1Accent, FontBody1 } from '@/shared/consts/fontStyles'
import { tss } from 'tss-react/mui'
import { Black, PurpleBase, SlateGreyDarken7, White, GreyBase, SlateGreyBase } from '@/shared/consts/colors'

export default tss.withName('SignIn').create({
  root: {
    maxWidth: 400,
    margin: 'auto',
    minWidth: 300,
  },
  googleBtn: {
    ...FontBody1Accent,
    width: '100%',
    padding: 14,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    border: 'none',
    outline: 'none',
    background: Black,
    color: White,
    cursor: 'pointer',
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
    marginBottom: 24,
  },
  linkForgot: {
    ...FontBody1,
    display: 'flex',
    justifyContent: 'flex-end',

    '&:hover': {
      color: PurpleBase,
    },
  },
  signInButton: {
    marginBottom: 20,
  },
  footer: {
    ...FontBody1,
    color: SlateGreyBase,
  },
  linkRegister: {
    ...FontBody1Accent,
    color: PurpleBase,
  },
})
