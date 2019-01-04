import Head from 'next/head'
import Grid from '@material-ui/core/Grid'
import checkLoggedIn from '../lib/checkLoggedIn'
import redirect from '../lib/redirect'
import User from '../modules/user'
import Appbar from '../modules/appbar'

class Index extends React.Component {
  static async getInitialProps (context) {
    const { loggedInUser } = await checkLoggedIn(context.apolloClient)

    if (!loggedInUser.viewer) {
      // If not signed in, send them somewhere more useful
      redirect(context, '/signin')
    }

    return { loggedInUser }
  }
  render () {
    const {
      loggedInUser: { viewer }
    } = this.props
    return (
      <React.Fragment>
        <Appbar />
        <Grid container>
          <Head>
            <title>Next boilerplate 🤔</title>
          </Head>
          <Grid item md={3} xs={12}>
            <User />
          </Grid>
        </Grid>
      </React.Fragment>
    )
  }
}

export default Index
