/* eslint-disable react/prop-types */
import React from 'react';
import Items from '../components/Items';

const Home = props => {
  const {
    query: { page },
  } = props;
  return (
    <div>
      <Items page={parseFloat(page) || 1} />
    </div>
  );
};
export default Home;
