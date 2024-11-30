import { Breadcrumbs, Typography } from '@mui/material'
import { Link } from '../../../navigation'
import { useTranslations } from 'next-intl'

interface IItem {
  href: string
  label: string
}

interface IBreadCrumbsList {
  className?: string
  breads: IItem[]
  currentLabel: string
}

export const BreadcrumbsList = (props: IBreadCrumbsList) => {
  const { className, breads, currentLabel } = props
  const t = useTranslations()

  return (
    <Breadcrumbs aria-label="breadcrumb" className={className}>
      {breads.map((item) => (
        <Link color="inherit" href={item.href} key={item.href}>
          {item.label}
        </Link>
      ))}
      <Typography sx={{ color: 'text.primary' }}>{t(currentLabel)}</Typography>
    </Breadcrumbs>
  )
}
