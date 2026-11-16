import assert from 'node:assert/strict';
import test from 'node:test';
import { buildRetryImageSrc } from '../src/lib/image-retry.ts';

const baseUrl = 'https://www.reese-log.com';

test('keeps a root-relative image URL relative when adding a cache buster', () => {
  assert.equal(
    buildRetryImageSrc('/api/blocks/block-id/image', 123, baseUrl),
    '/api/blocks/block-id/image?_t=123',
  );
});

test('preserves an existing query and hash on a root-relative URL', () => {
  assert.equal(
    buildRetryImageSrc('/api/blocks/block-id/image?size=large#preview', 123, baseUrl),
    '/api/blocks/block-id/image?size=large&_t=123#preview',
  );
});

test('keeps a genuinely remote image URL absolute', () => {
  assert.equal(
    buildRetryImageSrc('https://cdn.example.com/image.png', 123, baseUrl),
    'https://cdn.example.com/image.png?_t=123',
  );
});

test('does not mistake a protocol-relative remote URL for a local path', () => {
  assert.equal(
    buildRetryImageSrc('//cdn.example.com/image.png', 123, baseUrl),
    'https://cdn.example.com/image.png?_t=123',
  );
});
