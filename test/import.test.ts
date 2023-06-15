import {describe, expect, test} from '@jest/globals';
var palettes = require('../src/index');

test('import palettes', () => {
  expect(palettes).not.toBe(undefined);
  expect(palettes.palettes).not.toBe(undefined);
  expect(palettes.palettes.generated).not.toBe(undefined);
  expect(palettes.palettes['brand-colors']).not.toBe(undefined);
  expect(palettes.palettes.webdesign).not.toBe(undefined);
  expect(palettes.palettes['country-flag']).not.toBe(undefined);
  expect(palettes.palettes['usa-flag']).not.toBe(undefined);
  expect(palettes.palettes.pride).not.toBe(undefined);
  expect(palettes.palettes['valentine-colors']).not.toBe(undefined);
  expect(palettes.palettes.summer).not.toBe(undefined);
  expect(palettes.palettes.wedding).not.toBe(undefined);
  // console.log(palettes)
});