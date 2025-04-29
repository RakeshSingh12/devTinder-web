// utils.test.js
const { sum, isPalindrome } = require('../utils/utils');

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});

test('recognizes "racecar" as a palindrome', () => {
  expect(isPalindrome('racecar')).toBe(true);
});

test('recognizes "hello" is not a palindrome', () => {
  expect(isPalindrome('hello')).toBe(false);
});

test('isPalindrome handles mixed case and punctuation', () => {
  expect(isPalindrome('A man, a plan, a canal: Panama')).toBe(true);
});
