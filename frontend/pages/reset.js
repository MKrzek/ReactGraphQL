/* eslint-disable react/prop-types */
import React from 'react';
import Reset from '../components/Reset';

const ResetPage = props => {
  const {
    query: { resetToken },
  } = props;

  return (
    <div>
      <p>Reset Your password</p>
      <Reset resetToken={resetToken} />
    </div>
  );
};

export default ResetPage;
