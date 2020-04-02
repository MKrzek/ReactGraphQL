/* eslint-disable prettier/prettier */
/* eslint-disable no-restricted-globals */
/* eslint-disable react/prop-types */
/* eslint-disable react/button-has-type */
import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
// eslint-disable-next-line import/no-cycle
import {ALL_ITEMS_QUERY} from './Items'


const DELETE_ITEM_MUTATION = gql`
  mutation DELETE_ITEM_MUATION($id: ID!) {
    deleteItem(id: $id) {
      id
    }
  }
`;

export default class DeleteItem extends Component {
  update=(cache, payload)=>{
    // update cache to match the server
    const data= cache.readQuery({query:ALL_ITEMS_QUERY})
    console.log('DTAAAA', data, payload)
    data.items= data.items.filter(item=> item.id !==payload.data.deleteItem.id)
    cache.writeQuery({query:ALL_ITEMS_QUERY, data})
  }

  render() {
    const { children, id } = this.props;
    return (
      <Mutation
      mutation={DELETE_ITEM_MUTATION}
      variables={{id}}
      update={this.update}
      >
        {(deleteItem, { error }) => (
          <button
            onClick={() => {
              if (confirm('Are you sure you want to delete this item?')) {
                deleteItem()
              }
            }}
          >
            {children}
          </button>
        )}
      </Mutation>
    );
  }
}
