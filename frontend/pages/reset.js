/* eslint-disable react/prop-types */
import React from 'react';
import Reset from '../components/Reset';

const ResetPage = props => {
  const {
    query: { resetToken },
  } = props;
  return (
    <div>
      <p>Reset Your password {resetToken}</p>
      <Reset restToken={resetToken} />
    </div>
  );
};

export default ResetPage;
