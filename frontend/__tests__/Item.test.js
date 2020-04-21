import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import ItemComponent from '../components/Item';

const fakeItem = {
  id: 'wwww',
  title: 'hi',
  price: 4003009,
  description: 'sjsjssj',
  image: 'ddd.png',
  largeImage: 'ddddde.png',
};

describe('<Item/>', () => {
  it('renders and matches the snapshot', () => {
    const price = '£50.34';
    expect(price).toMatchSnapshot();
    const wrapper = shallow(<ItemComponent item={fakeItem} />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
  it('renders price tag and title', () => {
    const wrapper = shallow(<ItemComponent item={fakeItem} />);
    const PriceTag = wrapper.find('PriceTag');
    // console.log('wrapper', wrapper.debug());
    // console.log('PriceTag', PriceTag.dive().text());
    expect(PriceTag.children().text()).toBe('£40,030.09');
    expect(wrapper.find('Title a').text()).toBe(fakeItem.title);
    const img = wrapper.find('img');
    expect(img.props().src).toBe(fakeItem.image);
    expect(img.props().alt).toBe(fakeItem.title);
  });

  it('renders image properly', () => {
    const wrapper = shallow(<ItemComponent item={fakeItem} />);
    const img = wrapper.find('img');
    expect(img.props().src).toBe(fakeItem.image);
    expect(img.props().alt).toBe(fakeItem.title);
  });
  it('renders buttons properly', () => {
    const wrapper = shallow(<ItemComponent item={fakeItem} />);
    const ButtonList = wrapper.find('.buttonList');

    expect(ButtonList.children()).toHaveLength(3);
    expect(ButtonList.find('Link')).toBeTruthy();
  });
});
