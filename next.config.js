const port = parseInt(process.env.PORT, 10) || 3000
module.exports = {
  serverRuntimeConfig: {
    // Will only be available on the server side
    github_client_secret: '9c17d510a80da1122a36dc2249bafafa7f1816e2'
  },
  publicRuntimeConfig: {
    // Will be available on both server and client
    port,
    staticFolder: '/static',
    github_client_id: 'c82a3d9df4e5c5e407ad',
    github_redirect_uri: `http://localhost:${port}`
  }
}
