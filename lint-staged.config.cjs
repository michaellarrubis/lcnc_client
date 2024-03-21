module.exports = {
  // Run ESLint on changes to JavaScript files
  '**/*.(js|jsx)?(x)': filenames => `yarn lint src/ ${filenames.join(' ')}`
};
