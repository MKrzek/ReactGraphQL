/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import styled from 'styled-components';
import Item from './Item';
import Pagination from './Pagination';
import { perPage } from '../config';

export const ALL_ITEMS_QUERY = gql`
  query ALL_ITEMS_QUERY($skip: Int = 0) {
    items(skip: $skip) {
      id
      title
      price
      description
      image
      largeImage
    }
  }
`;
const Center = styled.div`
  text-align: center;
`;
const ItemList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 60px;
  max-width: ${props => props.theme.maxWidth};
  margin: 0 auto;
`;

export default class Items extends Component {
  render() {
    const { page } = this.props;
    return (
      <Center>
        <Pagination page={page} />
        <Query
          query={ALL_ITEMS_QUERY}
          fetchPolicy="network-only"
          variables={{ skip: page * perPage - perPage }}
        >
          {({ data, loading, error }) => {
            if (loading) return <div>Loading...</div>;
            if (error) return <div>{error.message}</div>;

            return (
              <ItemList>
                {data.items.map(item => (
                  <Item key={item.id} item={item} />
                ))}
              </ItemList>
            );
          }}
        </Query>
        <Pagination page={page} />
      </Center>
    );
  }
}
