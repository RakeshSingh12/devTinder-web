// utils.js
function sum(a, b) {
    return a + b;
  }
  
  function isPalindrome(str) {
    const clean = str.toLowerCase().replace(/[^a-z0-9]/g, '');
    return clean === clean.split('').reverse().join('');
  }
  
  module.exports = { sum, isPalindrome };
  