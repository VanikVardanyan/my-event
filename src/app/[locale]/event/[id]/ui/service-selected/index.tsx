import { Badge, IconButton } from '@mui/material'
import VisibilityIcon from '@mui/icons-material/Visibility'
import useStyles from './styles'
import { ISelection } from '../../../create/types'
import ResponsesModal from '@/shared/ui/request-card/ui/selections-list'
import { useState } from 'react'
import { useTranslations } from 'next-intl'

interface IServiceSelectedProps {
  selections: ISelection[]
  removeSelection: (serviceId: string, newSelections: ISelection[] | []) => void
  serviceId: string
}

export const ServiceSelected = (props: IServiceSelectedProps) => {
  const { classes } = useStyles()
  const { selections, removeSelection, serviceId } = props
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const t = useTranslations('RequestList')

  return (
    <div className={classes.root}>
      {!selections.length && t('no_selections')}
      {selections.length > 0 && (
        <IconButton onClick={handleOpen}>
          <Badge badgeContent={selections.length} color="primary">
            <VisibilityIcon color="action" />
          </Badge>
        </IconButton>
      )}
      <ResponsesModal
        open={open}
        handleClose={handleClose}
        selections={selections}
        removeSelection={removeSelection}
        serviceId={serviceId}
      />
    </div>
  )
}
