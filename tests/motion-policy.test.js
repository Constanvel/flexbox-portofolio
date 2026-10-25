import test from 'node:test';
import assert from 'node:assert/strict';
import {
  canAnimate,
  useHorizontalShowcase,
  showcaseScrollPosition,
} from '../src/motion-policy.js';

test('system reduced-motion always overrides the manual setting', () => {
  for (const paused of [false, true]) {
    assert.equal(canAnimate({ reducedMotion: true, paused }), false);
  }
  assert.equal(canAnimate({ reducedMotion: false, paused: true }), false);
  assert.equal(canAnimate({ reducedMotion: false, paused: false }), true);
});

test('horizontal showcase requires motion, a fine pointer, and sufficient viewport', () => {
  const desktop = {
    animated: true,
    finePointer: true,
    width: 1024,
    height: 650,
  };
  assert.equal(useHorizontalShowcase(desktop), true);
  for (const override of [
    { animated: false },
    { finePointer: false },
    { width: 1023 },
    { height: 649 },
  ]) {
    assert.equal(useHorizontalShowcase({ ...desktop, ...override }), false);
  }
});

test('keyboard destinations cover the full scroll range', () => {
  assert.equal(showcaseScrollPosition(100, 900, 0, 3), 100);
  assert.equal(showcaseScrollPosition(100, 900, 1, 3), 500);
  assert.equal(showcaseScrollPosition(100, 900, 2, 3), 900);
});

test('destinations clamp indices and handle zero or one card', () => {
  assert.equal(showcaseScrollPosition(100, 900, -1, 3), 100);
  assert.equal(showcaseScrollPosition(100, 900, 10, 3), 900);
  assert.equal(showcaseScrollPosition(100, 900, 0, 1), 100);
  assert.equal(showcaseScrollPosition(100, 900, 0, 0), 100);
});
