import test from 'node:test';
import assert from 'node:assert/strict';
import { canAnimate, motion } from '../src/motion-policy.js';

test('system reduced motion overrides the manual motion setting', () => {
  for (const paused of [false, true]) {
    assert.equal(canAnimate({ reducedMotion: true, paused }), false);
  }
  assert.equal(canAnimate({ reducedMotion: false, paused: true }), false);
  assert.equal(canAnimate({ reducedMotion: false, paused: false }), true);
  assert.equal(canAnimate({ reducedMotion: false }), true);
});

test('motion tokens describe short, finite entrance and exit animations', () => {
  assert.deepEqual(Object.keys(motion).sort(), [
    'close',
    'dialog',
    'ease',
    'reveal',
    'support',
    'title',
    'visual',
  ]);
  for (const name of [
    'title',
    'support',
    'visual',
    'reveal',
    'dialog',
    'close',
  ]) {
    assert.equal(typeof motion[name], 'number', name);
    assert.ok(
      Number.isFinite(motion[name]) && motion[name] > 0 && motion[name] <= 1,
      name,
    );
  }
  assert.ok(motion.close < motion.dialog);
  assert.ok(motion.support <= motion.title);
  assert.equal(motion.ease, 'power3.out');
});
