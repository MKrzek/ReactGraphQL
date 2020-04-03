import React from 'react';
import styled from 'styled-components';
import SignUp from '../components/SignUp';
import SignIn from '../components/SignIn';

const Columns = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 20px;
`;

const Signup = () => (
  <Columns>
    <SignUp />
    <SignIn />
  </Columns>
);

export default Signup;