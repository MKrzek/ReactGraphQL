import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import styled from 'styled-components';
import { formatDistance } from 'date-fns';
import Link from 'next/link';
import OrderItemStyles from './styles/OrderItemStyles';
import Error from './ErrorMessage';
import formatMoney from '../lib/formatMoney';

const ALL_ORDERS_QUERY = gql`
  query ALL_ORDERS_QUERY {
    orders(orderBy: createdAt_DESC) {
      id
      charge
      total
      createdAt
      items {
        id
        title
        price
        description
        image
        quantity
      }
    }
  }
`;

const OrderUl = styled.ul`
  display: grid;
  grid-gap: 4rem;
  grid-template-columns: repeat(auto-fit, minmax(40%, 1fr));
`;

export default class OrderList extends Component {
  render() {
    return (
      <Query query={ALL_ORDERS_QUERY}>
        {({ data: { orders }, loading, error }) => {
          if (error) return <Error error={error} />;
          if (loading) return <p>Loading....</p>;
          return (
            <div>
              <h2>You have {orders.length}</h2>
              <OrderUl>
                {orders.map(order => (
                  <OrderItemStyles key={order.id}>
                    <Link
                      href={{
                        pathname: '/order',
                        query: { id: order.id },
                      }}
                    >
                      <a>
                        <div className="order-meta">
                          <p>
                            {order.items.reduce((a, b) => a + b.quantity, 0)}
                            Items
                          </p>
                          <p>{order.items.length} Products</p>
                          {/* <p>
                            {order.createdAt &&
                              formatDistance(order.createdAt, new Date())}
                          </p> */}
                          <p>{formatMoney(order.total)}</p>
                        </div>
                        <div className="images">
                          {order.items.map(item => (
                            <img
                              key={item.id}
                              alt={item.title}
                              src={item.image}
                            />
                          ))}
                        </div>
                      </a>
                    </Link>
                  </OrderItemStyles>
                ))}
              </OrderUl>
            </div>
          );
        }}
      </Query>
    );
  }
}
