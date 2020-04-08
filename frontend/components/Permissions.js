import { Query } from 'react-apollo';
import React from 'react';
import gql from 'graphql-tag';
import Error from './ErrorMessage';

const ALL_USERS_QUERY = gql`
  query ALL_USERS_QUERY {
    users {
      id
      name
      email
      permissions
    }
  }
`;

const Permissions = () => (
  <Query query={ALL_USERS_QUERY}>
    {({ data, loading, error }) => {
      if (error) return <Error error={error} />;
      return <div>jsjssjsjjs</div>;
    }}
  </Query>
);

export default Permissions;
