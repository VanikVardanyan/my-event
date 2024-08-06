import { Accordion, AccordionDetails, AccordionSummary, IconButton } from '@mui/material'
import { IRequestTypesWithId } from '@/store/features/client-slice/types'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { useTranslations } from 'next-intl'
import useStyles from './styles'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { db } from '../../../../lib/firebaseConfig'
import { useAuth } from '../../../../lib/auth-context'
import { ISelection, IServices } from '@/app/[locale]/event/create/types'
import { Dispatch } from '@/store/store'
import { asyncSetEventsThunk } from '@/store/features/client-slice'

export const SelectionItem = (props: IRequestTypesWithId) => {
  const { id, title, services, profileId, isInstagram, profileName } = props

  const { classes } = useStyles()
  const menuT = useTranslations('Menu')
  const { user } = useAuth()
  const dispatch = Dispatch()

  const handleAdd = async (serviceId: string, newSelection: ISelection) => {
    const requestRef = doc(db, 'requests', id)
    if (user) {
      try {
        // Получаем текущие данные документа
        const requestDoc = await getDoc(requestRef)
        if (!requestDoc.exists()) {
          throw new Error('Document does not exist!')
        }

        const requestData = requestDoc.data()

        const updatedServices = requestData.services.map((service: IServices) => {
          if (service.id === serviceId) {
            // Обновляем selections для нужного service
            return {
              ...service,
              selections: [...service.selections, newSelection],
            }
          }
          return service
        })
        console.log('requestDoc: ', updatedServices)

        // Обновляем документ с новым массивом services
        await updateDoc(requestRef, { services: updatedServices })
        await dispatch(asyncSetEventsThunk({ id: user.uid }))
        console.log('Service selection updated successfully!')
      } catch (error) {
        console.error('Failed to update service selection: ', error)
      }
    }
  }

  const getDisabled = (selectionItem: ISelection[]) => {
    const isDisabled = selectionItem.some((selection) => selection.id === profileId)
    return isDisabled
  }

  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1-content" id="panel1-header">
        <span className={classes.title}>{title}</span>
      </AccordionSummary>
      <AccordionDetails>
        <div className={classes.serviceWrapper}>
          {services.map((service) => (
            <div key={service.id} className={classes.item}>
              <button
                className={classes.addBtn}
                onClick={() => handleAdd(service.id, { id: profileId, isInstagram, name: profileName })}
                disabled={getDisabled(service.selections)}
              >
                +
              </button>{' '}
              {menuT(service.service)}
            </div>
          ))}
        </div>
      </AccordionDetails>
    </Accordion>
  )
}
