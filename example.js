const ok = require('./')

ok
  .task('Foo', () => console.log('Foo!'))
  .task('lint Fix', 'standard --fix')
  .task('Bar', 'echo Bar!')
  .run('all')
