import PropTypes from 'prop-types';
import styled from 'styled-components';
import React from 'react';

const Dot = styled.div`
  background: ${props => props.theme.green};
  color: white;
  border-radius: 50%;
  padding: 0.5rem;
  line-height: 2rem;
  min-width: 3rem;
  margin-left: 1rem;
  font-weight: 100;
  font-feature-settings: 'tnum';
  font-variant-numeric: tabular-nums;
`;

const CartCount = ({ count }) => <Dot>{count}</Dot>;

export default CartCount;
