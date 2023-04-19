import { PriceFormatPipe } from './price-format.pipe';

describe('PriceFormatPipe', () => {
  it('create an instance', () => {
    const pipe = new PriceFormatPipe();
    expect(pipe).toBeTruthy();
  });
});
