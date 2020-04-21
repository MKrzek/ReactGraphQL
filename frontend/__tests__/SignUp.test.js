import { mount } from 'enzyme';
import wait from 'waait';
import { ApolloConsumer } from 'react-apollo';
import toJSON from 'enzyme-to-json';
import { MockedProvider } from 'react-apollo/test-utils';
import SignUp, { SIGNUP_MUTATION } from '../components/SignUp';
import { CURRENT_USER_QUERY } from '../components/User';
import { fakeUser } from '../lib/testUtils';

const type = (wrapper, name, value) => {
  wrapper.find(`input[name="${name}"]`).simulate('change', {
    target: { name, value },
  });
};

const me = fakeUser();
const mocks = [
  {
    request: {
      query: SIGNUP_MUTATION,
      variables: {
        email: me.email,
        name: me.name,
        password: 'gg',
      },
    },
    result: {
      data: {
        signup: {
          __typename: 'User',
          id: 'abc123',
          email: me.email,
          name: me.name,
        },
      },
    },
  },
  {
    request: {
      query: CURRENT_USER_QUERY,
    },
    result: {
      data: { me },
    },
  },
];

describe('<SignUp/>', () => {
  it('renders and matches snapshot', async () => {
    const wrapper = mount(
      <MockedProvider>
        <SignUp />
      </MockedProvider>
    );
    expect(toJSON(wrapper.find('form'))).toMatchSnapshot();
  });

  it('calls the mutation', async () => {
    let apolloClient;
    const wrapper = mount(
      <MockedProvider mocks={mocks}>
        <ApolloConsumer>
          {client => {
            apolloClient = client;
            return <SignUp />;
          }}
        </ApolloConsumer>
      </MockedProvider>
    );
    await wait();
    // console.log('ApOLLO', apolloClient);
    type(wrapper, 'name', me.name);
    type(wrapper, 'email', me.email);
    type(wrapper, 'password', 'gg');
    wrapper.update();
    wrapper.find('form').simulate('submit');
    await wait();

    const user = await apolloClient.query({ query: CURRENT_USER_QUERY });
    expect(user.data.me).toMatchObject(me);
  });
});
