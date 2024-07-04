import useStyles from './styles'

export const Empty = () => {
  const { classes } = useStyles()

  return (
    <div className={classes.root}>
      <div className={classes.imgSection}>no results</div>
      <div className={classes.contentWrapper}>
        <h5 className={classes.title}>Oops! No Channels Found</h5>
        <div className={classes.description}>We couldn’t find any Telegram channels that match your search</div>
      </div>
    </div>
  )
}
