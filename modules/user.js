import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Visibility from '@material-ui/icons/Visibility'
import Star from '@material-ui/icons/Star'
import Badge from '@material-ui/core/Badge'
import Avatar from '@material-ui/core/Avatar'
import { Query } from 'react-apollo'
import { viewer } from '../data/viewer'

const styles = theme => ({
  paper: {
    padding: theme.spacing.unit * 2,
    margin: 'auto',
    maxWidth: 500
  },
  image: {
    width: 128,
    height: 128
  },
  padding: {
    padding: `0 ${theme.spacing.unit}px`,
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%'
  }
})

function ComplexGrid (props) {
  const { classes } = props
  return (
    <Query query={viewer} fetchPolicy='cache-only'>
      {({ data: { viewer } }) => (
        <Paper className={classes.paper}>
          <Grid container spacing={16}>
            <Grid item>
              <Avatar src={viewer.avatarUrl} className={classes.image} />
            </Grid>
            <Grid item xs={12} sm container>
              <Grid item xs container direction='column' spacing={16}>
                <Grid item xs>
                  <Typography gutterBottom variant='subtitle1'>
                    {viewer.name || viewer.login}
                  </Typography>
                  <Typography gutterBottom color='textSecondary'>
                    {viewer.bio}
                  </Typography>
                </Grid>
                <Grid item container direction='row'>
                  <Grid item container alignItems='center' justify='space-between'>
                    <Badge
                      className={classes.margin}
                      badgeContent={viewer.starredRepositories.totalCount}
                      color='secondary'
                    >
                      <Typography className={classes.padding}>Starred</Typography>
                    </Badge>
                    <Badge
                      className={classes.margin}
                      badgeContent={viewer.watching.totalCount}
                      color='secondary'
                    >
                      <Typography className={classes.padding}>Watching</Typography>
                    </Badge>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      )}
    </Query>
  )
}

ComplexGrid.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(ComplexGrid)
