import { viewer } from '../data'
export default apolloClient =>
  apolloClient
    .query({
      query: viewer
    })
    .then(({ data }) => {
      return { loggedInUser: data }
    })
    .catch((err) => {
      // Fail gracefully
      return { loggedInUser: {} }
    })
