interface IDescription {
  image: string
  description: string
}

export interface IPlacComponentsProps {
  title: string
  description: IDescription[]
  buttonText: string
}
