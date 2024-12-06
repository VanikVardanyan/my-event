import { tss } from 'tss-react'
import { FontBody1 } from '@/shared/consts/fontStyles'
import { TextGreyLighten25 } from '@/shared/consts/colors'
import { ResumeStatus } from './types'

export const useStyles = tss.withName('ProfileProfessionCard').create({
  root: {
    maxWidth: 404,
    width: '100%',
    borderRadius: 8,
    boxShadow: ' 0px 1px 17.6px 0px rgba(141, 141, 141, 0.25);',
    padding: 16,
  },
  section: {
    ...FontBody1,
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
    marginBottom: 32,
  },
  date: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
  },
  professionSection: {
    ...FontBody1,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 8,
    marginBottom: 32,
  },
  textGrey: {
    color: TextGreyLighten25,
  },
  [ResumeStatus.Approve]: {
    background: 'rgba(196, 255, 180, 1)',
    color: 'rgba(0, 149, 6, 1)',
  },
  [ResumeStatus.Pending]: {
    background: 'rgba(255, 245, 152, 1)',
    color: 'rgba(255, 152, 0, 1)',
  },
  [ResumeStatus.Cancel]: {
    background: 'rgba(252, 189, 189, 1)',
    color: 'rgba(255, 0, 29, 1)',
  },
  status: {
    ...FontBody1,
    padding: '8px 24px',
    borderRadius: 49,
    width: 'max-content',
  },
})
