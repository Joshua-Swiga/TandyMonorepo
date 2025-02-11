import { CustomPipeNamePipe } from './custom-pipe-name.pipe';

describe('CustomPipeNamePipe', () => {
  it('create an instance', () => {
    const pipe = new CustomPipeNamePipe();
    expect(pipe).toBeTruthy();
  });
});
