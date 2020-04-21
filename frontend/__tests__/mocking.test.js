function Person(name, foods) {
  this.name = name;
  this.foods = foods;
}

Person.prototype.fetchFavFoods = function() {
  return new Promise((resolve, reject) => {
    // simulate API - go to external API and get foods
    setTimeout(() => resolve(this.foods, 2000));
  });
};

describe('mocking learning', () => {
  it('can create a person', () => {
    const me = new Person('gg', ['xx', 'xxx']);
    expect(me.name).toBe('gg');
  });
  it('can fetch foods', async () => {
    const me = new Person('gg', ['xx', 'xxx']);
    me.fetchFavFoods = jest.fn().mockResolvedValue(['www', 'xxx']);
    const favFoods = await me.fetchFavFoods();
    expect(favFoods).toContain('xxx');
  });
});
