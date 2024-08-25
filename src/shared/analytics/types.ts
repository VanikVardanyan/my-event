export const enum MIXPANEL_TYPE {
  ADD_PLATFORM = 'AccountCreationStart',
}

export enum GA4_ACTIONS {
  ACCOUNT_START_TO_CREATE = 'AccountStartToCreate',
}

export enum GA4_PLACES {
  MAIN = 'main',
}

export enum GA4_KEYS {
  SERVICE = 'service',
  PLACE = 'place',
}

export type GA4EventParamTypes = {
  [key in GA4_KEYS]?: string | number | null
}

export interface IGA4EventProps extends GA4EventParamTypes {
  action: GA4_ACTIONS
}
