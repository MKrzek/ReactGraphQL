describe('sample test 101', () => {
  fit('works as expected', () => {
    expect(1).toEqual(1);
  });
  xit('handles ranges fine', () => {
    const age = 200;
    expect(age).toBeGreatedThan(100);
  });
});
