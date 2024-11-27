import { Button } from '@/shared/ui/button'
import useStyles from './styles'
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow'

export const Blog = () => {
  const { classes } = useStyles()

  return (
    <div className={classes.root}>
      <div className={classes.blog} />
      <Button endIcon={<DoubleArrowIcon />}>Ստեղծել միջոցառում</Button>
    </div>
  )
}
