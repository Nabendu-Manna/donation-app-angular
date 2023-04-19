import { HumanReadablePricePipe } from './human-readable-price.pipe';

describe('HumanReadablePricePipe', () => {
  it('create an instance', () => {
    const pipe = new HumanReadablePricePipe();
    expect(pipe).toBeTruthy();
  });
});
