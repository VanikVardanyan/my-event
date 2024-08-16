import { Button, styled } from '@mui/material'
import { tss } from 'tss-react/mui'
import {
  Black,
  DarkBlueBase,
  DarkBlueDarken4,
  DarkBlueLighten30,
  PinkBrownBase,
  PinkBrownDarken16,
  PurpleBase,
} from '@/shared/consts/colors'
import { FontBody1, FontBody2, FontH4 } from '@/shared/consts/fontStyles'
import { BreakPoints } from '@/shared/consts/common'

export default tss.withName('create-event').create({
  root: {},
  form: {
    maxWidth: 550,
    margin: 'auto',
  },
  formSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
    marginBottom: 24,
  },
  allServices: {
    ...FontH4,
    color: Black,
  },
  tableContainer: {
    overflowX: 'auto',
    maxWidth: 550,
    border: `1px solid ${PinkBrownBase}`,
    borderRadius: 6,
  },
  allServicesWrapper: {
    minWidth: 550,
    overflowX: 'auto',
    borderCollapse: 'separate',
    borderSpacing: 0,
  },
  tableTr: {
    '&:first-child td:first-child': {
      borderTopLeftRadius: '8px',
    },
    '&:first-child td:last-child': {
      borderTopRightRadius: '8px',
    },
  },
  tableHead: {
    textAlign: 'start',
    padding: 5,
    borderBottom: '1px solid #ddd',
  },
  tableTd: {
    padding: 5,
    borderBottom: '1px solid #ddd',
    whiteSpace: 'nowrap',
  },
  statusSection: {
    display: 'flex',
    alignItems: 'center',
    gap: 2,
  },
  statusHeader: {
    // textAlign: 'end',
    // paddingRight: 20,
  },
  totalBudget: {
    ...FontBody1,
    padding: '10px 5px',
  },
  totalAmount: {
    color: DarkBlueBase,
  },
  statusBtn: {
    background: 'none',
    border: 'none',
    outline: 'none',
    color: PurpleBase,
    cursor: 'pointer',
  },
  serviceCard: {
    padding: 5,
    borderRadius: 6,
    border: `1px solid ${PinkBrownBase}`,
    width: 'fit-content',
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
  },
  done: {
    color: '#32CD32',
  },
  todo: {
    color: '#808080',
  },
  doing: {
    color: '#FFA500',
  },
  actionBlock: {
    display: 'flex',
    gap: 10,
    flexDirection: 'column',

    [`@media (min-width: ${BreakPoints.EXTRA_SMALL})`]: {
      flexDirection: 'row',
    },
  },
  editableWrapper: {
    display: 'flex',
    gap: 10,
    flexDirection: 'column',

    [`@media (min-width: ${BreakPoints.EXTRA_SMALL})`]: {
      flexDirection: 'row',
    },
  },
  editableTitle: {
    ...FontBody1,
    color: Black,
  },
  editableValue: {
    ...FontBody2,
    color: DarkBlueBase,
  },
  firstService: {
    paddingTop: '10px !important',
  },
  servicesWrapper: {
    width: '100%',
    height: '1px',
    background: PinkBrownBase,
  },
})

export const AddRequestButton = styled(Button)({
  backgroundColor: PinkBrownBase,
  color: 'white',

  '&:hover': {
    backgroundColor: PinkBrownDarken16,
  },
})
