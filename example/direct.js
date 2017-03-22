const ok = require('../')

/**
 * This script can be run directly as `node direct.js`
 */

ok
  .run('Say hello', 'echo Hello!')
  .run('Do some logging', () => {
    console.log('log')
    console.log('All')
    console.log('The')
    console.log('Things!')
  })
  .run('Touch a file', 'touch aFile')
  .run('Remove a file', 'rm aFile')
