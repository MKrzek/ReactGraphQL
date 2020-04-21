import { mount } from 'enzyme';
import wait from 'waait';
import { MockedProvider } from 'react-apollo/test-utils';
import PleaseSignIn from '../components/PleaseSignIn';
import { CURRENT_USER_QUERY } from '../components/User';
import { fakeUser } from '../lib/testUtils';

const notSignedInMock = [
  {
    request: { query: CURRENT_USER_QUERY },
    result: { data: { me: null } },
  },
];

const signedInMock = [
  {
    request: {
      query: CURRENT_USER_QUERY,
    },
    result: {
      data: {
        me: fakeUser(),
      },
    },
  },
];

describe('please signin', () => {
  it('renders the sign in dialog to logged out users', async () => {
    const wrapper = mount(
      <MockedProvider mocks={notSignedInMock}>
        <PleaseSignIn />
      </MockedProvider>
    );
    await wait();
    wrapper.update();
    expect(wrapper.text()).toContain('Please sign in');

    expect(wrapper.find('SignIn').exists()).toBe(true);
  });
  it('renders the child component when the user is signed-in', async () => {
    const Child = () => <p>Child!</p>;
    const wrapper = mount(
      <MockedProvider mocks={signedInMock}>
        <PleaseSignIn>
          <Child />
        </PleaseSignIn>
      </MockedProvider>
    );
    await wait();
    wrapper.update();
    expect(wrapper.find('Child').exists()).toBe(true);
    expect(wrapper.contains(<Child />)).toBe(true);
  });
});
