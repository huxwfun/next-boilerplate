import gql from 'graphql-tag'

export const viewer = gql`
  query {
    viewer {
      id
      login
      name
      avatarUrl
      bio
      watching {
        totalCount
      }
      starredRepositories {
        totalCount
      }
      issues {
        totalCount
      }
    }
  }
`
