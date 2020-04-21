import formatMoney from '../lib/formatMoney';

describe('formatMoney function', () => {
  it('works with fractional pounds', () => {
    expect(formatMoney(1)).toEqual('£0.01');
    expect(formatMoney(10)).toEqual('£0.10');
  });
  it('leaves pennies off whole pounds', () => {
    expect(formatMoney(5000)).toEqual('£50');
    expect(formatMoney(46060)).toEqual('£460.60');
  });
  it('works with whole and fractional pounds', () => {
    expect(formatMoney(4545)).toEqual('£45.45');
  });
});
