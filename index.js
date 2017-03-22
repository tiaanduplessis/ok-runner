'use strict'

const args = require('get-them-args')(process.argv.slice(2))
const chalk = require('chalk')
const shell = require('shelljs')
const npmRunPath = require('npm-run-path')

const exec = (cmd, options = {}, cb) => shell.exec(cmd, Object.assign({env: npmRunPath.env()}, options), cb)

function ok () {
  const _tasks = {}
  const _ok = {
    args,
    exec,
    task,
    run
  }

  function task (name, handler) {
    if (typeof name !== 'string') {
      console.error(`🚨 ${chalk.red.bold('Error!')} Task(${name}) must have a name.`)
      return _ok
      // throw new Error('The task name must be a string.')
    }

    if (typeof handler === 'string') {
      _tasks[name] = () => {
        console.log(`\n⌨ cmd - ${handler}`)
        exec(handler)
      }
    } else if (typeof handler === 'function') {
      _tasks[name] = handler
    } else {
      console.error(`🚨 ${chalk.red.bold('Error!')} Please provide a valid handler for task ${name}.`)
    }

    return _ok
  }

  function run (name, handler) {
    if (typeof name !== 'string') {
      console.error(`🚨 ${chalk.red.bold('Error!')} Task(${name}) must have a name.`)
      return _ok
    }

    if (name !== 'all' && (!_tasks[name] && !handler)) {
      console.error(`🚨 ${chalk.red.bold('Error!')}Task ${chalk.bold(name)} doesn't exist. Please provide a handler or create the task.`)
      return _ok
    }

    const timerName = `\n⚡ ${chalk.bold(name)} ran in`
    console.time(timerName)

    if (name === 'all') {
      console.log(`\n🎉 ${chalk.magenta('Running all tasks')}`)
      for (let key in _tasks) {
        console.log(`\n✨ Task - ${chalk.bold(key)}`)
        _tasks[key](_ok)
      }
    } else {
      if (!_tasks[name]) {
        _ok.task(name, handler)
      }

      console.log(`\n✨ Task - ${chalk.bold(name)}`)
      _tasks[name](_ok)
    }

    console.timeEnd(timerName)

    return _ok
  }

  return _ok
}

module.exports = ok()
