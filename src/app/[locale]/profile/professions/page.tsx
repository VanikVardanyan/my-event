'use client'

import { IconButton } from '@mui/material'
import { Professions } from '../../../../shared/types/user.types'
import { useStyles } from './styles'
import { ProfessionCard } from './ui/card'
import { IProfessionCard, ResumeStatus } from './ui/card/types'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'

const mockProfessions: IProfessionCard[] = [
  {
    profession: Professions.Musicians,
    category: 'Ծառայություն',
    createDate: '1 Հունվար 2024',
    status: ResumeStatus.Pending,
    id: '1',
  },
  {
    profession: Professions.Showman,
    category: 'Ծառայություն',
    createDate: '1 Հունվար 2024',
    status: ResumeStatus.Cancel,
    id: '2',
  },
  {
    profession: Professions.Showman,
    category: 'Ծառայություն',
    createDate: '1 Հունվար 2024',
    status: ResumeStatus.Approve,
    id: '3',
  },
]

export default function ProfessionsPage() {
  const { classes } = useStyles()

  return (
    <div>
      <h4 className={classes.title}> Մասնագետի Պրոֆիլը</h4>

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

            <div className={classes.textGrey}>Ավելացնել նոր ոլորտ</div>
          </div>
        </div>
      </div>
    </div>
  )
}
