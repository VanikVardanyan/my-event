'use client'

import { IconButton } from '@mui/material'
import { EventTypes } from '../../../../shared/types/user.types'
import { useStyles } from './styles'
import { ProfessionCard } from './ui/card'
import { IEventCard, ResumeStatus } from './ui/card/types'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'

const mockProfessions: IEventCard[] = [
  {
    eventType: EventTypes.Birthday,
    title: 'Աննաի Ծնունդ',
    createDate: '1 Հունվար 2024',
    status: ResumeStatus.Pending,
    time: '17:00',
    id: '1',
  },
  {
    eventType: EventTypes.Corporate,
    title: 'EvnEasy երեկույթ',
    createDate: '1 Հունվար 2024',
    status: ResumeStatus.Cancel,
    time: '17:00',
    id: '2',
  },
  {
    eventType: EventTypes.Graduation,
    title: 'Վահեի ատամհատիկ',
    createDate: '1 Հունվար 2024',
    status: ResumeStatus.Approve,
    time: '17:00',
    id: '3',
  },
]

export default function ProfessionsPage() {
  const { classes } = useStyles()

  return (
    <div>
      <h4 className={classes.title}>Իմ Միջոցառումները</h4>
      <div className={classes.cardWrapper}>
        {mockProfessions.map((item) => (
          <ProfessionCard key={item.id} {...item} />
        ))}
        <div className={classes.addProfession}>
          <div className={classes.addBtn}>
            <div>
              <IconButton>
                <AddCircleOutlineIcon />
              </IconButton>
            </div>

            <div className={classes.textGrey}>Ստողծել նոր միջոցառում</div>
          </div>
        </div>
      </div>
    </div>
  )
}
