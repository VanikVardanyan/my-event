import { GreyBase, SlateGreyDarken7, SlateGreyBase, SlateGreyLighten13 } from '@/shared/consts/colors'
import { FontBody1Accent, FontBody1 } from '@/shared/consts/fontStyles'
import { tss } from 'tss-react/mui'

export default tss.withName('ServicePost').create({
  root: {
    maxWidth: 470,
    borderBottom: `1px solid ${SlateGreyLighten13}`,
    paddingBottom: 16,
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
  },
  profession: {
    ...FontBody1,
    color: SlateGreyBase,
  },
  carouselImage: {
    objectFit: 'cover',
  },
})
