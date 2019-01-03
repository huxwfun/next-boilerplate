import Head from 'next/head'
import checkLoggedIn from '../lib/checkLoggedIn'
import redirect from '../lib/redirect'

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
      <div>
        <Head>
          <title>Next boilerplate 🤔</title>
        </Head>
        <div>
          <img src={viewer.avatarUrl} />
          <span>{viewer.login}</span>
        </div>
        <style jsx>{`
          div {
            height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          img {
            width: 2em;
            margin-right: 1em;
          }
        `}</style>
      </div>
    )
  }
}

export default Index
