import { StrengthPipe } from './strength.pipe';

describe('StrengthPipe', () => {
  let pipe = new StrengthPipe();

  beforeEach(() => {
    pipe = new StrengthPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('below 10 is weak', () => {
    // let result = pipe.transform(5);
    // expect(result).toBe('5 (weak)')
    expect(pipe.transform(5)).toBe('5(weak)')
  });

  it('below 10 to 20 is strong', () => { 
    expect(pipe.transform(11)).toBe('11(strong)')
  });

  it('above 20 is strongest', () => { 
    expect(pipe.transform(21)).toBe('21(strongest)')
  });


});
