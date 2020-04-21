import { mount } from 'enzyme';
import wait from 'waait';
import { ApolloConsumer } from 'react-apollo';
import toJSON from 'enzyme-to-json';
import { MockedProvider } from 'react-apollo/test-utils';
import RemoveFromCart, {
  REMOVE_FROM_CART_MUTATION,
} from '../components/RemoveFromCart';
import { CURRENT_USER_QUERY } from '../components/User';
import { fakeUser, fakeCartItem } from '../lib/testUtils';

global.alert = console.log;

const mocks = [
  {
    request: { query: CURRENT_USER_QUERY },
    result: {
      data: {
        me: {
          ...fakeUser(),
          cart: [fakeCartItem({ id: 'aaa111' })],
        },
      },
    },
  },
  {
    request: { query: REMOVE_FROM_CART_MUTATION, variables: { id: 'aaa111' } },
    result: {
      data: {
        removeFromCart: {
          __typename: 'CartItem',
          id: 'aaa111',
        },
      },
    },
  },
];

describe('<RemoveFromCart/>', () => {
  it('renders and matches the snapshot', () => {
    const wrapper = mount(
      <MockedProvider>
        <RemoveFromCart id="aaa111" />
      </MockedProvider>
    );
    expect(toJSON(wrapper.find('button'))).toMatchSnapshot();
  });

  it('removed item from cart', async () => {
    let apolloClient;
    const wrapper = mount(
      <MockedProvider mocks={mocks}>
        <ApolloConsumer>
          {client => {
            apolloClient = client;
            return <RemoveFromCart id="aaa111" />;
          }}
        </ApolloConsumer>
      </MockedProvider>
    );

    const res = await apolloClient.query({ query: CURRENT_USER_QUERY });
    expect(res.data.me.cart).toHaveLength(1);
    expect(res.data.me.cart[0].item.price).toBe(5000);
    wrapper.find('button').simulate('click');
    await wait(50);
    const res2 = await apolloClient.query({ query: CURRENT_USER_QUERY });
    expect(res2.data.me.cart).toHaveLength(0);
  });
});
