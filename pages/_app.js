import React from 'react'
import App, { Container } from 'next/app'
import Head from 'next/head'
import Router from 'next/router'
import NProgress from 'nprogress'
import withApolloClient from '../lib/withApolloClient'
import { ApolloProvider } from 'react-apollo'

Router.events.on('routeChangeStart', url => {
  NProgress.start()
})
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())

class MyApp extends App {
  render () {
    const { Component, pageProps, apolloClient } = this.props
    return (
      <Container>
        <Head>
          <title>My page</title>
        </Head>
        <ApolloProvider client={apolloClient}>
          <Component {...pageProps} />
        </ApolloProvider>
      </Container>
    )
  }
}

export default withApolloClient(MyApp)
