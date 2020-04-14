import React from 'react';
import Link from 'next/link';
import { Mutation } from 'react-apollo';
import { TOGGLE_CART_MUTATION } from './Cart';
import NavStyles from './styles/NavStyles';
import User from './User';
import SignOut from './SignOut';
import CartCount from './CartCount';

const Nav = () => (
  <User>
    {({ data: { me } }) => (
      <NavStyles>
        <Link href="/items">
          <a>shop</a>
        </Link>
        {me && (
          <>
            <Link href="/sell">
              <a>sell</a>
            </Link>
            <Link href="/orders">
              <a>orders</a>
            </Link>
            <Link href="/me">
              <a>Account</a>
            </Link>
            <SignOut />
            <Mutation mutation={TOGGLE_CART_MUTATION}>
              {toggleCart => (
                <button type="button" onClick={toggleCart}>
                  My Cart
                  <CartCount
                    count={me.cart.reduce(
                      (prev, curr) => prev + curr.quantity,
                      0
                    )}
                  ></CartCount>
                </button>
              )}
            </Mutation>
          </>
        )}
        {!me && (
          <Link href="/signup">
            <a>sign in</a>
          </Link>
        )}
      </NavStyles>
    )}
  </User>
);

export default Nav;
