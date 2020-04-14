import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import formatMoney from '../lib/formatMoney';

const CartItemStyles = styled.li``;

const CartItem = ({ cartItem }) => {
  const {
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
    </CartItemStyles>
  );
};

CartItem.propTypes = {
  cartItem: PropTypes.object.isRequired,
};

export default CartItem;
