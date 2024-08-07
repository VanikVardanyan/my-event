import { StandardLonghandProperties } from 'csstype'
import './fonts.css'

export type IFont = StandardLonghandProperties

export enum fontWeight {
  Regular = '400',
  Medium = '500',
  Bold = '700',
}

export enum fontFamily {
  Base = '"Roboto", "Helvetica Neue", Helvetica, Arial, sans-serif',
  LIBRE = '"Libre Baskerville", "sans-serif"',
  ArmeniaTassel = '"ArmeniaTassel", "sans-serif"',
  Armenia = '"ArmeniaSans", "sans-serif"',
}

export const FontTitleBig = {
  fontFamily: fontFamily.Armenia,
  fontWeight: Number(fontWeight.Regular),
  fontSize: 40,
  lineHeight: '46px',
  letterSpacing: '1.4px',
}

export const FontH3: IFont = {
  fontFamily: fontFamily.Armenia,
  fontSize: '24px',
  fontWeight: Number(fontWeight.Bold),
  lineHeight: '28px',
  letterSpacing: '0px',
}

export const FontH4: IFont = {
  fontFamily: fontFamily.Armenia,
  fontSize: '20px',
  fontWeight: Number(fontWeight.Bold),
  lineHeight: '24px',
  letterSpacing: '0.1px',
}

export const FontH5: IFont = {
  fontFamily: fontFamily.Armenia,
  fontSize: '16px',
  fontWeight: Number(fontWeight.Medium),
  lineHeight: '20px',
  letterSpacing: '0px',
}

export const FontSubtitle1: IFont = {
  fontFamily: fontFamily.Armenia,
  fontSize: '18px',
  fontWeight: Number(fontWeight.Bold),
  lineHeight: '22px',
  letterSpacing: '0px',
}

export const FontBody1: IFont = {
  fontFamily: fontFamily.Armenia,
  fontSize: '14px',
  fontWeight: Number(fontWeight.Regular),
  lineHeight: '20px',
  letterSpacing: '0.1px',
}

export const FontBody2: IFont = {
  fontFamily: fontFamily.Armenia,
  fontSize: '16px',
  fontWeight: Number(fontWeight.Regular),
  lineHeight: '24px',
  letterSpacing: '0',
}

export const FontButtonBig: IFont = {
  fontFamily: fontFamily.Armenia,
  fontSize: '13px',
  fontWeight: Number(fontWeight.Medium),
  lineHeight: '16px',
  letterSpacing: '-0.2px',
}

export const FontBody1Accent: IFont = {
  fontFamily: fontFamily.Armenia,
  fontSize: '14px',
  fontWeight: Number(fontWeight.Medium),
  lineHeight: '20px',
  letterSpacing: '0.1px',
}

export const FontLandingBody2Accent: IFont = {
  fontFamily: fontFamily.Armenia,
  fontSize: '16px',
  fontWeight: Number(fontWeight.Medium),
  lineHeight: '24px',
  letterSpacing: '0px',
}

export const FontCaption: IFont = {
  fontFamily: fontFamily.Armenia,
  fontSize: '12px',
  fontWeight: Number(fontWeight.Regular),
  lineHeight: '16px',
  letterSpacing: '0px',
}

export const FontCaptionAccent: IFont = {
  fontFamily: fontFamily.Armenia,
  fontSize: '12px',
  fontWeight: Number(fontWeight.Medium),
  lineHeight: '16px',
  letterSpacing: '0.2px',
}

export const FontOVERLINE: IFont = {
  fontFamily: fontFamily.Armenia,
  fontSize: '12px',
  fontWeight: Number(fontWeight.Regular),
  lineHeight: '15px',
  letterSpacing: '-0.2px',
  textTransform: 'uppercase',
}
