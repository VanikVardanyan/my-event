import { GreyBase, SlateGreyDarken7, SlateGreyBase, SlateGreyLighten13, White } from '@/shared/consts/colors'
import { FontBody1Accent, FontBody1 } from '@/shared/consts/fontStyles'
import { tss } from 'tss-react/mui'

export default tss.withName('ServicePost').create({
  root: {
    maxWidth: 470,
    width: '100%',
    overflow: 'hidden',
    borderBottom: `1px solid ${SlateGreyLighten13}`,
    paddingBottom: 20,
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  avatar: {
    borderRadius: '50%',
    flexShrink: 0,
    objectFit: 'cover',
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
  description: {
    ...FontBody1,
    color: SlateGreyBase,
    marginTop: 24,
  },
  profession: {
    ...FontBody1,
    color: SlateGreyBase,
  },
  carouselImage: {
    objectFit: 'cover',
    width: '100%',
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
})
