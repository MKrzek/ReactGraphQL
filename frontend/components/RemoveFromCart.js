import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import styled from 'styled-components';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import { CURRENT_USER_QUERY } from './User';

const REMOVE_FROM_CART_MUTATION = gql`
  mutation removeFromCart($id: ID!) {
    removeFromCart(id: $id) {
      id
    }
  }
`;

const RemoveButton = styled.button`
  font-size: 3rem;
  background: none;
  border: 0;
  &:hover {
    color: ${props => props.theme.green};
    cursor: pointer;
  }
`;

class RemoveFromCart extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
  };

  render() {
    const { id } = this.props;
    console.log('IDDDD-item', id);
    return (
      <Mutation mutation={REMOVE_FROM_CART_MUTATION} variables={{ id }}>
        {(removeFromCart, { loading, error }) => (
          <RemoveButton
            disabled={loading}
            onClick={() => removeFromCart().catch(err => alert(err.message))}
            title="Delete Item"
          >
            x
          </RemoveButton>
        )}
      </Mutation>
    );
  }
}

export default RemoveFromCart;
