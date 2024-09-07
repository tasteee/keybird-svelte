import { describe, test, expect } from 'vitest'
import { createRange } from './createRange'; // adjust the import path as needed

describe('createRange', () => {
  test('creates a range with one argument', () => {
    expect(createRange(5)).toEqual([0, 1, 2, 3, 4]);
  });

  test('creates a range with two arguments', () => {
    expect(createRange(2, 4)).toEqual([2, 3]);
  });

  test('creates a range with three arguments', () => {
    expect(createRange(5, 15, 5)).toEqual([5, 10]);
  });

  test('creates a range using from().to()', () => {
    expect(createRange.from(2).to(4)).toEqual([2, 3]);
  });

  test('creates a range using step().from().to()', () => {
    expect(createRange.step(5).from(5).to(15)).toEqual([5, 10]);
  });

  test('throws an error if first argument is not a number', () => {
    expect(() => createRange('not a number' as any)).toThrow('[createRange] first argument must be a number');
  });

  test('handles negative steps', () => {
    expect(createRange(5, 0, -1)).toEqual([5, 4, 3, 2, 1]);
  });

  test('returns empty array if start equals end', () => {
    expect(createRange(5, 5)).toEqual([]);
  });

  test('returns empty array if step moves away from end', () => {
    expect(createRange(0, 5, -1)).toEqual([]);
  });
});