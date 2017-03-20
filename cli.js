#!/usr/bin/env node
'use strict'

const ok = require('./')

const tasks = ok.args.unknown || []

tasks.forEach((task) => {
  ok.run(task)
})
