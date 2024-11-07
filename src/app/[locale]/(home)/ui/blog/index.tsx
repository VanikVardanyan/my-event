import { PinkButton } from '@/shared/ui/button'
import useStyles from './styles'
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow'

export const Blog = () => {
  const { classes } = useStyles()

  return (
    <div className={classes.root}>
      <div className={classes.blog} />
      <PinkButton endIcon={<DoubleArrowIcon />}>Ստեղծել միջոցառում</PinkButton>
    </div>
  )
}
