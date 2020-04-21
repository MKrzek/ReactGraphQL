/* eslint-disable react/prop-types */
import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import Head from 'next/head';
import Link from 'next/link';
import PaginationStyles from './styles/PaginationStyles';
import Error from './ErrorMessage';
import { perPage } from '../config';

export const PAGINATION_QUERY = gql`
  query PAGINATION_QUERY {
    itemsConnection {
      aggregate {
        count
      }
    }
  }
`;

const Pagination = props => (
  <Query query={PAGINATION_QUERY}>
    {({ loading, error, data }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <Error error={error} />;
      const { count } = data.itemsConnection.aggregate;
      const pages = Math.ceil(count / perPage);
      return (
        <PaginationStyles data-test="pagination">
          <Head>
            <title>
              Market Place! Page {props.page} of {pages}
            </title>
          </Head>
          <Link
            prefetch
            href={{
              pathname: 'items',
              query: { page: props.page - 1 },
            }}
          >
            <a className="prev" aria-disabled={props.page <= 1}>
              Prev
            </a>
          </Link>
          <p>
            Page {props.page} of {pages}
          </p>
          <p>{count} Items Total</p>
          <Link
            prefetch
            href={{
              pathname: 'items',
              query: { page: props.page + 1 },
            }}
          >
            <a className="next" aria-disabled={props.page >= pages}>
              Next
            </a>
          </Link>
        </PaginationStyles>
      );
    }}
  </Query>
);

export default Pagination;
