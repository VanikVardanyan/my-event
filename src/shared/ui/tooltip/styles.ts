import { tss } from 'tss-react/mui'
import { TOOLTIP_SIZE, TOOLTIP_VARIANT } from './types'
import { GreyBase, White } from '../../consts/colors'

export const tooltipColors = {
  [TOOLTIP_VARIANT.default]: GreyBase,
}

export default tss.withName('Tooltip').create({
  root: {
    [`&$${TOOLTIP_VARIANT.default}`]: {
      color: White,
      padding: '8px 12px',
      fontSize: '12px',
      lineHeight: '16px',
      fontWeight: 'normal',
      borderRadius: '4px',
      border: 'none',
    },
    [`&$${TOOLTIP_VARIANT.default}$opacity`]: {
      opacity: 1,
    },
  },
  [TOOLTIP_VARIANT.default]: {},
  opacity: {},
  [TOOLTIP_SIZE.size168]: {
    maxWidth: '168px',
  },
  [TOOLTIP_SIZE.size247]: {
    maxWidth: '247px',
  },
  [TOOLTIP_SIZE.size312]: {
    maxWidth: '312px',
  },
  [TOOLTIP_SIZE.sizeAuto]: {
    maxWidth: 'unset',
  },
})
