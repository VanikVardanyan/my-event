import { tss } from 'tss-react'

export default tss.withName('MessagesPage').create({
  root: {
    display: 'flex',
  },
  peoples: {
    width: 380,
    borderRight: `1px solid rgba(221, 221, 221, 1)`,
  },
})
