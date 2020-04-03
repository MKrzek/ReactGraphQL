/* eslint-disable react/prop-types */
import React from 'react';
import SingleItem from '../components/SingleItem';

const Item = props => {
  const {
    query: { id },
  } = props;
  return (
    <div>
      <SingleItem id={id} />
    </div>
  );
};

export default Item;
