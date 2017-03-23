#!/usr/bin/env node
'use strict'

const path = require('path')
const fs = require('fs')

const chalk = require('chalk')
const args = require('get-them-args')(process.argv.slice(2))
const script = path.join(process.cwd(), (args.script || 'ok.js'))
const tasks = args.unknown

if (fs.existsSync(script) && require.resolve(script)) {
  const ok = require(script)

  if (tasks.length) {
    tasks.forEach((task) => {
      ok.run(task)
    })
  } else {
    ok.run('all')
  }
} else {
  console.error(`🚨 ${chalk.red.bold('Error!')} The specified script does not exist or couldn't be resolved.`)
}
