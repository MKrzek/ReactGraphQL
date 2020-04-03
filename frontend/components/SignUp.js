import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Form from './styles/Form';
import Error from './ErrorMessage';

export default class SignUp extends Component {
  state = {
    email: '',
    name: '',
    password: '',
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { name, email, password } = this.state;
    return (
      <Form>
        <fieldset>
          <h2>Sign Up for a page</h2>
          <label htmlFor="email">
            Email
            <input
              type="text"
              name="email"
              placeholder="email"
              value={email}
              onChange={this.handleChange}
            />
          </label>
          <label htmlFor="name">
            Name
            <input
              type="text"
              name="name"
              placeholder="name"
              value={name}
              onChange={this.handleChange}
            />
          </label>
          <label htmlFor="password">
            Password
            <input
              type="text"
              name="password"
              placeholder="password"
              value={password}
              onChange={this.handleChange}
            />
          </label>
          <button type="submit">Sign Up!</button>
        </fieldset>
      </Form>
    );
  }
}
