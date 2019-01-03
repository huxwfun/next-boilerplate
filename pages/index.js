import Head from 'next/head'
import getConfig from 'next/config'
import checkLoggedIn from '../lib/checkLoggedIn'
import redirect from '../lib/redirect'

const {
  github_client_id,
  github_redirect_uri
} = getConfig().publicRuntimeConfig

const url = `https://github.com/login/oauth/authorize?client_id=${github_client_id}&scope=user&redirect_uri=${github_redirect_uri}&scope=read:user,public_repo`

export default class Index extends React.Component {
  static async getInitialProps (context) {
    const { loggedInUser } = await checkLoggedIn(context.apolloClient)

    if (!loggedInUser.viewer) {
      // If not signed in, send them somewhere more useful
      redirect(context, '/signin')
    }

    return { loggedInUser }
  }
  render () {
    const { loggedInUser: { viewer } } = this.props
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
