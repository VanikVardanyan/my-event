import useStyles from './styles'

export const Empty = () => {
  const { classes } = useStyles()

  return (
    <div className={classes.root}>
      <div className={classes.contentWrapper}>
        <h5 className={classes.title}>Оупс!!!</h5>
        <div className={classes.description}>К сожалению нечего не найдено</div>
      </div>
    </div>
  )
}
