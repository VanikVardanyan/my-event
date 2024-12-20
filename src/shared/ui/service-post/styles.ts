import {
  GreyBase,
  SlateGreyDarken7,
  SlateGreyBase,
  SlateGreyLighten13,
  White,
  PinkBrownBase,
  PinkBrownLighten30,
  TextGreyDarken7,
  TextGreyBase,
} from '@/shared/consts/colors'
import { FontBody1Accent, FontBody1, FontBody2 } from '@/shared/consts/fontStyles'
import { Button, styled } from '@mui/material'
import { tss } from 'tss-react/mui'
import { BreakPoints } from '../../consts/common'

export default tss.withName('ServicePost').create({
  root: {
    maxWidth: '100%',
    maxHeight: 426,
    width: '100%',
    overflow: 'hidden',
    padding: 9,
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    borderRadius: 6,
    background: '#9747FF2B',

    [`@media (min-width: ${BreakPoints.MEDIUM})`]: {
      maxWidth: 364,
    },
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: 12,
    justifyContent: 'space-between',
    padding: '0 5px',
  },
  headerName: {
    display: 'flex',
    gap: 5,
    alignItems: 'center',
  },
  avatar: {
    borderRadius: '50%',
    flexShrink: 0,
    objectFit: 'contain',
  },
  userName: {
    ...FontBody1Accent,
    color: GreyBase,
  },
  carouselWrapper: {},
  likeActionSection: {
    margin: '4px 0',
  },
  likeCount: {
    ...FontBody1Accent,
    color: GreyBase,
  },
  descriptionWrapper: {
    padding: '0 10px',
    position: 'relative',
  },
  description: {
    ...FontBody1,
    color: TextGreyBase,
    marginTop: 24,
    display: '-webkit-box',
    // ['-webkit-line-clamp']: '2',
    WebkitLineClamp: 2,
    // ['-webkit-box-orient']: 'vertical',
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    marginBottom: 10,
  },
  fullText: {
    WebkitLineClamp: 'none',
    display: 'block',
  },
  showMoreBtn: {
    margin: '24px 0 10px',
    position: 'absolute',
    right: 8,
    bottom: '-18px',
  },
  profession: {
    ...FontBody1,
    color: SlateGreyBase,
  },
  carouselImage: {
    objectFit: 'cover',
    width: '100%',
    borderRadius: 8,
  },
  slider: {
    width: '100%',
  },
  arrowLeft: {
    position: 'absolute',
    width: 28,
    height: 28,
    top: '50%',
    right: 20,
    zIndex: 1000,
    transform: 'translate(10px, -50%)',
    cursor: 'pointer',
    background: White,
    borderRadius: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrowRight: {
    position: 'absolute',
    width: 28,
    height: 28,
    top: '50%',
    zIndex: 1000,
    transform: 'translate(10px, -50%)',
    cursor: 'pointer',
    background: White,
    borderRadius: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  info: {
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
    marginTop: 8,
  },
  name: {
    ...FontBody1,
  },
  handlers: {
    display: 'flex',
    alignItems: 'center',
    gap: 2,
  },
  actions: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
})

export const ReadMoreButton = styled(Button)({
  backgroundColor: PinkBrownBase,
  color: 'white',

  '&:hover': {
    backgroundColor: PinkBrownLighten30,
  },
})
