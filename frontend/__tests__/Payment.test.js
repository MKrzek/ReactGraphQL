import { mount } from 'enzyme';
import wait from 'waait';

import toJSON from 'enzyme-to-json';
import { MockedProvider } from 'react-apollo/test-utils';
import Router from 'next/router';
import NProgress from 'nprogress';
import Payment from '../components/Payment';
import { CURRENT_USER_QUERY } from '../components/User';
import { fakeUser, fakeCartItem } from '../lib/testUtils';

Router.router = { push() {} };

const mocks = [
  {
    request: { query: CURRENT_USER_QUERY },
    result: {
      data: {
        me: {
          ...fakeUser(),
          cart: [fakeCartItem()],
        },
      },
    },
  },
];

const createOrderMock = jest.fn().mockResolvedValue({
  data: {
    createOrder: {
      id: 'aaa111',
    },
  },
});

describe('<Payment/>', () => {
  it('renders and matches snapshot', async () => {
    const wrapper = mount(
      <MockedProvider mocks={mocks}>
        <Payment />
      </MockedProvider>
    );
    await wait();
    wrapper.update();
    const checkoutButton = wrapper.find('ReactStripeCheckout');
    expect(toJSON(checkoutButton)).toMatchSnapshot();
  });
  it('creates an order ontoken', async () => {
    const wrapper = mount(
      <MockedProvider mocks={mocks}>
        <Payment />
      </MockedProvider>
    );
    const component = wrapper.find('Payment').instance();
    component.onToken({ id: 'aaa111' }, createOrderMock);
    expect(createOrderMock).toHaveBeenCalled();
    expect(createOrderMock).toHaveBeenCalledWith({
      variables: { token: 'aaa111' },
    });
  });

  it('turn the progress bar on', async () => {
    const wrapper = mount(
      <MockedProvider mocks={mocks}>
        <Payment />
      </MockedProvider>
    );
    await wait();
    wrapper.update();
    NProgress.start = jest.fn();

    const component = wrapper.find('Payment').instance();
    component.onToken(
      {
        id: 'aaa111',
      },
      createOrderMock
    );
    expect(NProgress.start).toHaveBeenCalled();
  });

  it('routes to the order page when completed', async () => {
    const wrapper = mount(
      <MockedProvider mocks={mocks}>
        <Payment />
      </MockedProvider>
    );

    await wait();
    wrapper.update();

    const component = wrapper.find('Payment').instance();
    Router.router.push = jest.fn();
    component.onToken(
      {
        id: 'aaa111',
      },
      createOrderMock
    );
    await wait();
    expect(Router.router.push).toHaveBeenCalled();
    expect(Router.router.push).toHaveBeenCalledWith({
      pathname: '/order',
      query: {
        id: 'aaa111',
      },
    });
  });
});
