/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import StripeCheckout from 'react-stripe-checkout';
import calcTotalPrice from '../lib/calcTotalPrice';
import User, { CURRENT_USER_QUERY } from './User';

function totalItems(cart) {
  return cart.reduce((prev, curr) => prev + curr.quantity, 0);
}

const CREATE_ORDER_MUTATION = gql`
  mutation CREATE_ORDER_MUTATION($token: String) {
    createOrder(token: $token) {
      id
      charge
      total
      items {
        id
        title
      }
    }
  }
`;

export default class Payment extends Component {
  onToken = async (res, createOrder) => {
    const order = await createOrder({
      variables: {
        token: res.id,
      },
    }).catch(err => alert(err.message));
    console.log('order', order);
  };

  render() {
    const { children } = this.props;
    return (
      <User>
        {({ data: { me } }) => (
          <Mutation
            refetchQueries={[{ query: CURRENT_USER_QUERY }]}
            mutation={CREATE_ORDER_MUTATION}
          >
            {(createOrder, { loading, error }) => (
              <StripeCheckout
                name="Market Place"
                description={`Order of ${totalItems(me.cart)} items`}
                image={
                  me.cart.length && me.cart[0].item && me.cart[0].item.image
                }
                amount={calcTotalPrice(me.cart)}
                stripeKey="pk_test_HPudnXijOi9poQQ2LCdW9gsh"
                currency="GBP"
                email={me.email}
                token={res => this.onToken(res, createOrder)}
              >
                {children}
              </StripeCheckout>
            )}
          </Mutation>
        )}
      </User>
    );
  }
}
