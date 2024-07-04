interface ILink {
  name: string
  href: string
  icon: any
}

export interface INetworksProps {
  links: ILink[] | []
}
