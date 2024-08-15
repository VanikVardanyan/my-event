import { Accordion, AccordionDetails, AccordionSummary, IconButton } from '@mui/material'
import { IRequestTypesWithId } from '@/store/features/client-slice/types'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { useTranslations } from 'next-intl'
import useStyles from './styles'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { db } from '@/shared/lib/firebaseConfig'
import { useAuth } from '@/shared/lib/auth-context'
import { ISelection, IServices } from '@/app/[locale]/event/create/types'
import { Dispatch } from '@/store/store'
import { asyncSetEventsThunk } from '@/store/features/client-slice'
import AddIcon from '@mui/icons-material/Add'
import DoneIcon from '@mui/icons-material/Done'
import DeleteIcon from '@mui/icons-material/Delete'
import LinearProgress from '@mui/material/LinearProgress'
import { useState } from 'react'

export const SelectionItem = (props: IRequestTypesWithId) => {
  const { id, title, services, profileId, isInstagram, profileName } = props
  const [loading, setLoading] = useState(false)

  const { classes } = useStyles()
  const menuT = useTranslations('Menu')
  const { user } = useAuth()
  const dispatch = Dispatch()

  const handleAdd = async (serviceId: string, newSelection: ISelection) => {
    setLoading(true)
    const requestRef = doc(db, 'requests', id)
    if (user) {
      try {
        // Получаем текущие данные документа
        const requestDoc = await getDoc(requestRef)
        if (!requestDoc.exists()) {
          setLoading(false)
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

        // Обновляем документ с новым массивом services
        await updateDoc(requestRef, { services: updatedServices })
        await dispatch(asyncSetEventsThunk({ id: user.uid })).finally(() => setLoading(false))
      } catch (error) {
        setLoading(false)
      }
    } else {
      setLoading(false)
    }
  }

  const getDisabled = (selectionItem: ISelection[]) => {
    const isDisabled = selectionItem.some((selection) => selection.id === profileId)
    return isDisabled
  }

  const handleRemove = async (serviceId: string, selectionId: string) => {
    setLoading(true)
    const requestRef = doc(db, 'requests', id)
    if (user) {
      try {
        // Получаем текущие данные документа
        const requestDoc = await getDoc(requestRef)
        if (!requestDoc.exists()) {
          setLoading(false)
          throw new Error('Document does not exist!')
        }

        const requestData = requestDoc.data()

        const updatedServices = requestData.services.map((service: IServices) => {
          if (service.id === serviceId) {
            // Обновляем selections для нужного service
            return {
              ...service,
              selections: service.selections.filter((selection: ISelection) => selection.id !== selectionId),
            }
          }
          return service
        })

        // Обновляем документ с новым массивом services
        await updateDoc(requestRef, { services: updatedServices })
        await dispatch(asyncSetEventsThunk({ id: user.uid })).finally(() => setLoading(false))
      } catch (error) {
        console.error('Failed to remove service selection: ', error)
      }
    } else {
      setLoading(false)
    }
  }

  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1-content" id="panel1-header">
        <span className={classes.title}>{title}</span>
      </AccordionSummary>
      {loading && <LinearProgress color="info" />}
      <AccordionDetails>
        <div className={classes.serviceWrapper}>
          {services.map((service) => (
            <div key={service.id} className={classes.item}>
              <button
                className={classes.addBtn}
                onClick={() => handleAdd(service.id, { id: profileId, isInstagram, name: profileName })}
                disabled={getDisabled(service.selections)}
              >
                {getDisabled(service.selections) ? (
                  <>
                    <DoneIcon style={{ width: 18, height: 18 }} />
                  </>
                ) : (
                  <AddIcon style={{ width: 18, height: 18 }} />
                )}
              </button>{' '}
              {getDisabled(service.selections) && (
                <button className={classes.addBtn} onClick={() => handleRemove(service.id, profileId)}>
                  <DeleteIcon style={{ width: 18, height: 18 }} />
                </button>
              )}
              {menuT(service.service)}
            </div>
          ))}
        </div>
      </AccordionDetails>
    </Accordion>
  )
}
