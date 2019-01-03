import gql from 'graphql-tag'

export default apolloClient =>
  apolloClient
    .query({
      query: gql`
        query {
          viewer {
            id
            login
            name
            avatarUrl
            bio
            name
          }
        }
      `
    })
    .then(({ data }) => {
      return { loggedInUser: data }
    })
    .catch((err) => {
      // Fail gracefully
      return { loggedInUser: {} }
    })
