import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Avatar from '@material-ui/core/Avatar'
import { viewer } from '../data/viewer'
import { Query } from 'react-apollo'

const styles = {
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1
  },
  avatar: {
    marginLeft: -12,
    marginRight: 20
  }
}

function ButtonAppBar (props) {
  const { classes } = props
  return (
    <Query query={viewer} fetchPolicy='cache-only'>
      {({ data: { viewer } }) => {
        return (
        <AppBar position='static'>
          <Toolbar>
            <Avatar src={viewer.avatarUrl} className={classes.avatar} />
            <Typography variant='h6' color='inherit' className={classes.grow}>
              {viewer.name || viewer.login}
            </Typography>
            <Button color='inherit'>Sign out</Button>
          </Toolbar>
        </AppBar>
      )}}
    </Query>
  )
}

ButtonAppBar.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(ButtonAppBar)
