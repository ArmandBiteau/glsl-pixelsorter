import PixelCanvas from '../src/canvas.js';

describe('sample test', function() {
  it('should be the truth!', function() {
    expect(true).toBeTruthy();
  });

  it('should have lodash working', function() {
    expect(PixelCanvas.lodashFunction([1,2,3])).toEqual(6);
  });
});
