import { getById, celsToForeng } from './helper.module';


describe('test', () => {
  it('test getById', () => {
    expect(getById()).toBeDefined();
  });

  it('test celsToForeng', () => {
    expect(celsToForeng(20)).toEqual(68);
    expect(celsToForeng(20)).not.toEqual(86);
  });
});
