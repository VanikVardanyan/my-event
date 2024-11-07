import { StandardLonghandProperties } from 'csstype'
import './fonts.css'
import { Languages } from '../types/common'

export type IFont = StandardLonghandProperties

export enum fontWeight {
  Regular = '400',
  Medium = '500',
  Bold = '700',
}

function getLanguageFromPath(pathname: string): Languages {
  const languages = [Languages.RU, Languages.HY, Languages.EN]

  const pathParts = pathname.split('/')
  if (pathParts.length > 1 && languages.includes(pathParts[1] as Languages)) {
    return pathParts[1] as Languages
  }

  return Languages.HY
}

const currentLang = (typeof window !== 'undefined' && getLanguageFromPath(window.location.pathname)) || Languages.EN

// export enum fontFamily {
//   Base = '"RussianSans", Arial, sans-serif',
//   LIBRE = '"Libre Baskerville", "sans-serif"',
//   ArmenianDefault = '"ArmeniaSans", "sans-serif"',
// }

export enum fontFamily {
  Base = '"ArmeniaSans", "sans-serif"',
  LIBRE = '"ArmeniaSans", "sans-serif"',
  ArmenianDefault = '"ArmeniaSans", "sans-serif"',
}

const currentFontFamily = {
  [Languages.HY]: fontFamily.ArmenianDefault,
  [Languages.EN]: fontFamily.LIBRE,
  [Languages.RU]: fontFamily.Base,
}[currentLang]

export const FontTitleBig = {
  fontFamily: currentFontFamily,
  fontWeight: Number(fontWeight.Regular),
  fontSize: 40,
  lineHeight: '46px',
  letterSpacing: '1.4px',
}

export const FontH3: IFont = {
  fontFamily: currentFontFamily,
  fontSize: '24px',
  fontWeight: Number(fontWeight.Bold),
  lineHeight: '28px',
  letterSpacing: '0px',
}

export const FontH4: IFont = {
  fontFamily: currentFontFamily,
  fontSize: '20px',
  fontWeight: Number(fontWeight.Bold),
  lineHeight: '24px',
  letterSpacing: '0.1px',
}

export const FontH5: IFont = {
  fontFamily: currentFontFamily,
  fontSize: '16px',
  fontWeight: Number(fontWeight.Medium),
  lineHeight: '20px',
  letterSpacing: '0px',
}

export const FontSubtitle1: IFont = {
  fontFamily: currentFontFamily,
  fontSize: '18px',
  fontWeight: Number(fontWeight.Bold),
  lineHeight: '22px',
  letterSpacing: '0px',
}

export const FontBody1: IFont = {
  fontFamily: currentFontFamily,
  fontSize: '14px',
  fontWeight: Number(fontWeight.Regular),
  // lineHeight: '20px',
  letterSpacing: '0.1px',
}

export const FontBody2: IFont = {
  fontFamily: currentFontFamily,
  fontSize: '16px',
  fontWeight: Number(fontWeight.Regular),
  lineHeight: '24px',
  letterSpacing: '0',
}

export const FontButtonBig: IFont = {
  fontFamily: currentFontFamily,
  fontSize: '13px',
  fontWeight: Number(fontWeight.Medium),
  lineHeight: '16px',
  letterSpacing: '-0.2px',
}

export const FontBody1Accent: IFont = {
  fontFamily: currentFontFamily,
  fontSize: '14px',
  fontWeight: Number(fontWeight.Medium),
  lineHeight: '20px',
  letterSpacing: '0.1px',
}

export const FontLandingBody2Accent: IFont = {
  fontFamily: currentFontFamily,
  fontSize: '16px',
  fontWeight: Number(fontWeight.Medium),
  lineHeight: '24px',
  letterSpacing: '0px',
}

export const FontCaption: IFont = {
  fontFamily: currentFontFamily,
  fontSize: '12px',
  fontWeight: Number(fontWeight.Regular),
  lineHeight: '16px',
  letterSpacing: '0px',
}

export const FontCaptionAccent: IFont = {
  fontFamily: currentFontFamily,
  fontSize: '12px',
  fontWeight: Number(fontWeight.Medium),
  lineHeight: '16px',
  letterSpacing: '0.2px',
}

export const FontOVERLINE: IFont = {
  fontFamily: currentFontFamily,
  fontSize: '12px',
  fontWeight: Number(fontWeight.Regular),
  lineHeight: '15px',
  letterSpacing: '-0.2px',
  textTransform: 'uppercase',
}
