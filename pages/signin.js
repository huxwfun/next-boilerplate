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

    if (loggedInUser.viewer) {
      redirect(context, '/')
    }

    return {}
  }
  render () {
    return (
      <div>
        <Head>
          <title>Sign in</title>
        </Head>
        <header>
          <svg
            height='32'
            viewBox='0 0 16 16'
            version='1.1'
            width='32'
            aria-hidden='true'
          >
            <path
              fillRule='evenodd'
              d='M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z'
            />
          </svg>
          <a href={url}>Sign in with github</a>
        </header>
        <style jsx>{`
          header {
            height: 50px;
            padding: 0 16px;
            display: flex;
            align-items: center;
            justify-content: flex-start;
            box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2),
              0px 4px 5px 0px rgba(0, 0, 0, 0.14),
              0px 1px 10px 0px rgba(0, 0, 0, 0.12);
          }
          a {
            margin-left: 1em;
          }
        `}</style>
      </div>
    )
  }
}
