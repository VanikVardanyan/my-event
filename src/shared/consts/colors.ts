import chroma from 'chroma-js'

import { darken, lighten } from '../utils/colorUtils'

export const getColorLighten = (color: string, percent: number) => lighten(chroma(color), percent / 100).hex()

export const PurpleBase = '#603AC7'
export const PurpleLighten46 = lighten(chroma(PurpleBase), 0.46).hex() // '#F3F1FB'
export const PurpleLighten40 = lighten(chroma(PurpleBase), 0.4).hex() // '#E0D9F4'
export const PurpleLighten25 = lighten(chroma(PurpleBase), 0.25).hex() // '#B09DE3'
export const PurpleLighten12 = lighten(chroma(PurpleBase), 0.12).hex() // '#866AD5'
export const PurpleDarken4 = darken(chroma(PurpleBase), 0.04).hex() // '#5834B8'
export const PurpleDarken8 = darken(chroma(PurpleBase), 0.08).hex() // '#5030A8'

export const RedBase = '#F54C5A'
export const RedDarken16 = darken(chroma(RedBase), 0.16).hex() // '#E30D1E'
export const RedLighten30 = lighten(chroma(RedBase), 0.3).hex() // '#FDDDE0'
export const RedDarken4 = darken(chroma(RedBase), 0.04).hex() // '#F43948'

export const OrangeBase = '#F4A72D'
export const OrangeLighten37 = lighten(chroma(OrangeBase), 0.37).hex() // '#FDF2E0'
export const OrangeDarken29 = darken(chroma(OrangeBase), 0.29).hex() // '#865507'

export const PinkBrownBase = '#F222A9'
export const PinkBrownDarken16 = chroma(PinkBrownBase).darken(0.16).hex() // затемнённый на 16%
export const PinkBrownLighten30 = chroma(PinkBrownBase).brighten(0.3).hex() // осветлённый на 30%
export const PinkBrownDarken4 = chroma(PinkBrownBase).darken(0.04).hex() // затемнённый на 4%
export const PinkBrownDisabled = chroma(PinkBrownBase).desaturate(1.5).brighten(0.5).hex() // приглушённый и осветлённый вариант

export const DarkBlueBase = '#5741A6'
export const DarkBlueDarken16 = chroma(DarkBlueBase).darken(0.16).hex() // затемнённый на 16%
export const DarkBlueLighten30 = chroma(DarkBlueBase).brighten(0.3).hex() // осветлённый на 30%
export const DarkBlueDarken4 = chroma(DarkBlueBase).darken(0.04).hex() // затемнённый на 4%
export const DarkBlueDisabled = chroma(DarkBlueBase).desaturate(1.5).brighten(0.5).hex() // приглушённый и осветлённый вариант

export const DarkPurpleBase = '#281B59'
export const DarkPurpleDarken16 = chroma(DarkPurpleBase).darken(0.16).hex() // затемнённый на 16%
export const DarkPurpleLighten30 = chroma(DarkPurpleBase).brighten(0.3).hex() // осветлённый на 30%
export const DarkPurpleDarken4 = chroma(DarkPurpleBase).darken(0.04).hex() // затемнённый на 4%
export const DarkPurpleDisabled = chroma(DarkPurpleBase).desaturate(1.5).brighten(0.5).hex() // приглушённый и осветлённый вариант

export const GreenBase = '#70C24B'
export const GreenLighten41 = lighten(chroma(GreenBase), 0.41).hex() // '#ECF7E7'
export const GreenLighten33 = lighten(chroma(GreenBase), 0.33).hex() // '#D4EDC9'
export const GreenLighten25 = lighten(chroma(GreenBase), 0.25).hex() // '#BCE2AA'
export const GreenLighten12 = lighten(chroma(GreenBase), 0.12).hex() // '#94D179'
export const GreenDarken4 = darken(chroma(GreenBase), 0.04).hex() // '#65BA3F'
export const GreenDarken9 = darken(chroma(GreenBase), 0.09).hex() // '#5BA738'
export const GreenDarken22 = darken(chroma(GreenBase), 0.22).hex() // '#407528'

export const DarkGreen = '#2e5732'

export const YellowBase = '#FFD334'
export const YellowLighten30 = lighten(chroma(YellowBase), 0.3).hex() // '#FFF4CD'
export const YellowLighten24 = lighten(chroma(YellowBase), 0.24).hex() // '#FFEEAE'
export const YellowLighten15 = lighten(chroma(YellowBase), 0.15).hex() // '#FFE480'
export const YellowDarken20 = darken(chroma(YellowBase), 0.2).hex() // '#CDA100'
export const YellowDarken35 = darken(chroma(YellowBase), 0.35).hex() // '#806500'

export const FacebookBase = '#3A78EA'

export const darkSlateGray = '#3d464d'

// GreyShades
export const GreyBase = '#2E2E2E'

export const SlateGreyBase = '#6B7685'
export const SlateGreyLighten46 = lighten(chroma(SlateGreyBase), 0.46).hex() // '#E9EBEE'
export const SlateGreyLighten49 = lighten(chroma(SlateGreyBase), 0.49).hex() // '#F5F3F5'
export const SlateGreyLighten48 = lighten(chroma(SlateGreyBase), 0.48).hex()
export const SlateGreyLighten45 = lighten(chroma(SlateGreyBase), 0.45).hex()
export const SlateGreyLighten42 = lighten(chroma(SlateGreyBase), 0.42).hex()
export const SlateGreyLighten32 = lighten(chroma(SlateGreyBase), 0.32).hex()
export const SlateGreyLighten21 = lighten(chroma(SlateGreyBase), 0.21).hex()
export const SlateGreyLighten18 = lighten(chroma(SlateGreyBase), 0.18).hex()
export const SlateGreyLighten10 = lighten(chroma(SlateGreyBase), 0.1).hex()
export const SlateGreyDarken7 = darken(chroma(SlateGreyBase), 0.07).hex()
export const SlateGreyDarken18 = darken(chroma(SlateGreyBase), 0.18).hex()
export const SlateGreyLighten34 = lighten(chroma(SlateGreyBase), 0.34).hex() // '#C6CCD4'
export const SlateGreyLighten13 = lighten(chroma(SlateGreyBase), 0.13).hex() // '#8995A6'

export const TextGreyBase = '#2E2E2E'
export const TextGreyLighten39 = lighten(chroma(TextGreyBase), 0.39).hex() // '#919191'
export const TextGreyLighten25 = lighten(chroma(TextGreyBase), 0.25).hex() // '#6E6E6E'
export const TextGreyDarken7 = darken(chroma(TextGreyBase), 0.07).hex() // '#1C1C1C'

export const TextSlateGreyBase = '#717B88'
export const TextSlateGreyLighten30 = lighten(chroma(TextSlateGreyBase), 0.3).hex() // '#C4C8CE'
export const TextSlateGreyLighten16 = lighten(chroma(TextSlateGreyBase), 0.16).hex() // '#9DA4AE'
export const TextSlateGreyLighten8 = lighten(chroma(TextSlateGreyBase), 0.08).hex() // '#87909B'
export const TextSlateGreyDarken12 = darken(chroma(TextSlateGreyBase), 0.12).hex() // '#555D67'

// Black and White
export const Black = '#000000'
export const White = '#FFFFFF'
export const BackgroundGrey = '#F0F3F7'
export const BackgroundWhite = '#FFFFFF'

export const Transparent = 'transparent'
