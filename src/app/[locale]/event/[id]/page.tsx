'use client'

import { Button, Typography } from '@mui/material'
import useStyles, { AddRequestButton } from './styles'
import { useTranslations } from 'next-intl'
import { useEffect, useState } from 'react'
import { useAuth } from '@/shared/lib/auth-context'
import { IRequestTypes, ISelection } from '../create/types'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { db } from '@/shared/lib/firebaseConfig'
import { useParams } from 'next/navigation'
import { Link, useRouter } from '@/navigation'
import { Routes } from '@/shared/routes'
import { Container } from '../../styles'
import { LoadingOverlay } from '@/shared/ui/loading-overlay'
import cn from 'classnames'
import { ServiceStatusItem } from './ui/service-item'
import { ServiceSelected } from './ui/service-selected'

const EventPage = () => {
  const { classes } = useStyles()
  const t = useTranslations('Request')
  const shared = useTranslations('Shared')
  const requestListT = useTranslations('RequestList')
  const cityTranslate = useTranslations('Citys')
  const m = useTranslations('Menu')

  const [data, setData] = useState<null | IRequestTypes>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  const eventTypeTranslate = useTranslations('EventTypes')
  const { user } = useAuth()
  const { id }: { id: string } = useParams()

  const fetchRequest = async () => {
    const docRef = doc(db, 'requests', id)
    const docSnap = await getDoc(docRef)
    if (!user?.uid) return

    if (docSnap.exists()) {
      const requestData: any = docSnap.data()
      if (requestData.userId === user.uid) {
        setData(requestData)
        setLoading(false)
      } else {
        router.push(Routes.Profile)
        setLoading(false)
      }
    } else {
      setLoading(false)
    }
    setLoading(false)
  }

  useEffect(() => {
    setLoading(true)
    if (id && user) {
      fetchRequest()
    }
  }, [id, user])

  if (loading) return <LoadingOverlay loading />

  const changeServiceStatus = async (serviceId: string, newStatus: string) => {
    try {
      const docRef = doc(db, 'requests', id)
      const docSnap = await getDoc(docRef)

      if (docSnap.exists()) {
        const requestData = docSnap.data() as IRequestTypes
        const updatedServices = requestData.services.map((service) =>
          service.id === serviceId ? { ...service, status: newStatus } : service
        )

        await updateDoc(docRef, { services: updatedServices })
        fetchRequest()

        // Update local state with new service status
      }
    } catch (error) {
      console.error('Error updating service status:', error)
    }
  }

  const removeSelection = async (serviceId: string, newSelections: ISelection[] | []) => {
    try {
      const docRef = doc(db, 'requests', id)
      const docSnap = await getDoc(docRef)

      if (docSnap.exists()) {
        const requestData = docSnap.data() as IRequestTypes
        const updatedServices = requestData.services.map((service) =>
          service.id === serviceId ? { ...service, selections: newSelections } : service
        )

        await updateDoc(docRef, { services: updatedServices })
        fetchRequest()
      }
    } catch (error) {
      console.error('Error updating service status:', error)
    }
  }

  const calculateTotalBudget = () => {
    return data?.services.reduce((total, service) => {
      // Удаление пробелов и преобразование строки в число
      const amount = parseFloat(service.amount.replace(/\s/g, ''))
      return total + amount
    }, 0)
  }

  const formatNumber = (value: string) => {
    return value.replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
  }
  const totalBudget = data?.services ? calculateTotalBudget() : null

  return (
    <Container>
      <div className={classes.form}>
        <Typography id="modal-modal-title" variant="h6" component="h2" mb={2}>
          {t('event_description')}
        </Typography>
        <div className={classes.formSection}>
          <div className={classes.editableWrapper}>
            <div className={classes.editableTitle}>{t('title')}:</div>
            <div className={classes.editableValue}>{data?.title}</div>
          </div>
          <div className={classes.editableWrapper}>
            <div className={classes.editableTitle}>{t('event_types')}:</div>
            <div className={classes.editableValue}>{eventTypeTranslate(data?.type.toLowerCase())}</div>
          </div>
          <div className={classes.editableWrapper}>
            <div className={classes.editableTitle}>{t('city')}:</div>
            <div className={classes.editableValue}>{cityTranslate(data?.city)}</div>
          </div>
          <div className={classes.editableWrapper}>
            <div className={classes.editableTitle}>date:</div>
            <div className={classes.editableValue}>{data?.date}</div>
          </div>
          <div className={classes.editableWrapper}>
            <div className={classes.editableTitle}>{t('location')}</div>
            <div className={classes.editableValue}>{data?.location}</div>
          </div>
          <div className={classes.editableWrapper}>
            <div className={classes.editableTitle}>{t('person_quantity')}:</div>
            <div className={classes.editableValue}>{data?.personQuantity}</div>
          </div>
          <div className={classes.editableWrapper}>
            <div className={classes.editableTitle}>{t('description')}:</div>
            <div className={classes.editableValue}>{data?.other}</div>
          </div>
          <div>
            <h4 className={classes.allServices}>{t('all_services')}</h4>
          </div>
          <div className={classes.tableContainer}>
            <table className={classes.allServicesWrapper}>
              <thead>
                <tr>
                  <th className={classes.tableHead}>{t('service')}</th>
                  <th className={classes.tableHead}>{t('budget')}</th>
                  <th className={cn(classes.tableHead, classes.statusHeader)}>{t('status')}</th>
                  {/* <th className={cn(classes.tableHead, classes.statusHeader)}>{t('responses')}</th> */}
                  <th className={cn(classes.tableHead, classes.statusHeader)}>{t('selections')}</th>
                </tr>
              </thead>
              <tbody>
                {data?.services.map((service, index) => (
                  <tr key={index} className={classes.tableTr}>
                    <td className={classes.tableTd}>{m(service.service)}</td>
                    <td className={classes.tableTd}>{service.amount}</td>
                    <td className={cn(classes.tableTd, classes[service.status])}>
                      <ServiceStatusItem
                        status={service.status}
                        id={service.id}
                        changeServiceStatus={changeServiceStatus}
                      />
                    </td>
                    {/* <td className={classes.tableTd}>no</td> */}
                    <td className={classes.tableTd}>
                      <ServiceSelected
                        removeSelection={removeSelection}
                        serviceId={service.id}
                        selections={service.selections}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div>
              {totalBudget && (
                <div className={classes.totalBudget}>
                  {requestListT('total_budget')}:{' '}
                  <span className={classes.totalAmount}>{formatNumber(totalBudget.toString())} AMD </span>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className={classes.actionBlock}>
          <AddRequestButton variant="contained" LinkComponent={Link} href={`${Routes.CreateEvent}/?id=${id}`}>
            <Typography variant="button">{t('event_edit')}</Typography>
          </AddRequestButton>
          <Button variant="outlined" type="button" LinkComponent={Link} href={Routes.Profile}>
            <Typography variant="button">{shared('come_back')}</Typography>
          </Button>
        </div>
      </div>
    </Container>
  )
}

export default EventPage
