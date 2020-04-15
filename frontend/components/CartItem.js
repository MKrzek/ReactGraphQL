import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import formatMoney from '../lib/formatMoney';
import RemoveFromCart from './RemoveFromCart';

const CartItemStyles = styled.li`
  padding: 1rem 0;
  border-bottom: 1px solid ${props => props.theme.lightgrey};
  display: grid;
  align-items: center;
  grid-template-columns: auto 1fr auto;
  img {
    margin-right: 10px;
  }
  p,
  h3 {
    margin: 0;
  }
`;

const CartItem = ({ cartItem }) => {
  if (!cartItem.item) {
    // TODO this needs to be fixed
    return (
      <CartItemStyles>
        This item has been removed
        <RemoveFromCart id={cartItem.id} />
      </CartItemStyles>
    );
  }
  const {
    id,
    quantity,

    item: { price, image, title },
  } = cartItem;

  return (
    <CartItemStyles>
      <img width="100" src={image} alt={title} />
      <div className="cart-item-details">
        <h3>{title}</h3>
        <p>
          {formatMoney(price * quantity)}
          {' - '}
          <em>
            {quantity} x {formatMoney(price)} each
          </em>
        </p>
      </div>
      <RemoveFromCart id={id} />
    </CartItemStyles>
  );
};

CartItem.propTypes = {
  cartItem: PropTypes.object.isRequired,
};

export default CartItem;
