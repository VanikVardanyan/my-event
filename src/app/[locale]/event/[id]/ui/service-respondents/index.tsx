import useStyles from './styles'
import { IRespondents, ISelection } from '../../../create/types'
import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { RespondentsList } from '../respondents-list'

interface IServiceSelectedProps {
  respondents: IRespondents[] | []
  updateRespondents: (serviceId: string, newSelections: IRespondents[] | []) => void
  serviceId: string
}

export const ServiceRespondents = (props: IServiceSelectedProps) => {
  const { classes } = useStyles()
  const { respondents, updateRespondents, serviceId } = props
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)

  const t = useTranslations('RequestList')

  return (
    <div className={classes.root}>
      {!respondents?.length && t('no_selections')}
      {respondents?.length > 0 && (
        <RespondentsList respondents={respondents} updateRespondents={updateRespondents} serviceId={serviceId} />
      )}
    </div>
  )
}
