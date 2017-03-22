const ok = require('../')

/**
 * This script should be ran via the cli
 * e.g. ok --script=via-cli.js
 */

ok
  .task('Say hello', 'echo Hello!')
  .task('Do some logging', () => {
    console.log('log')
    console.log('All')
    console.log('The')
    console.log('Things!')
  })
  .task('Touch a file', 'touch aFile')
  .task('Remove a file', 'rm aFile')

// Needed for cli to work properly =/
module.exports = ok
