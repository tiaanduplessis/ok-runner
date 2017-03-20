/* eslint-env jest */
'use strict'

const ok = require('./')

test('ok runner', () => {
  expect(ok).toBeTruthy()
  expect(ok.exec).toBeDefined()
  expect(ok.run).toBeDefined()
  expect(ok.task).toBeDefined()
  expect(ok.args).toBeDefined()
})
