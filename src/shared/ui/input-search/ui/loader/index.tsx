import { Skeleton } from '@mui/material'
import useStyles from './styles'

export const Loader = () => {
  const { classes } = useStyles()

  return (
    <div className={classes.wrapper}>
      {Array(3)
        .fill(null)
        .map((_, index) => (
          <div className={classes.root} key={index}>
            <div>
              <Skeleton height={36} width={36} />
            </div>
            <div className={classes.content}>
              <Skeleton height={16} />
              <div className={classes.subscriber}>
                <Skeleton height={16} width={16} />
                <Skeleton height={16} width={44} />
              </div>
            </div>
          </div>
        ))}
    </div>
  )
}
