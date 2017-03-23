'use strict'

const args = require('get-them-args')(process.argv.slice(2))
const chalk = require('chalk')
const shell = require('shelljs')
const npmRunPath = require('npm-run-path')

const exec = (cmd, options = {}, cb) => shell.exec(cmd, Object.assign({env: npmRunPath.env()}, options, cb))

// TODO: - Switch to stack

function ok () {
  const _tasks = []
  const _ok = {
    args,
    exec,
    tasks: _tasks,
    task,
    run}

  function task (name, handler) {
    if (typeof name !== 'string') {
      console.error(`🚨 ${chalk.red.bold('Error!')} Task(${name}) must have a name.`)
      return _ok
    }

    if (typeof handler === 'string') {
      _tasks.push({
        name,
        handler: () => {
          console.log(`⌨ cmd  - ${chalk.green(handler)}`)
          exec(handler)
        }
      })
    } else if (typeof handler === 'function') {
      _tasks.push({
        name,
        handler})
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
      console.error(`🚨 ${chalk.red.bold('Error!')}Task ${chalk.blue.bold(name)} doesn't exist. Please provide a handler or create the task.`)
      return _ok
    }

    // Create & start timer for running task
    const timerName = `\n⚡ ${chalk.blue.bold(name)} ran in\n`
    console.time(timerName)

    if (name === 'all') {
      console.log(`🎉 ${chalk.magenta('Running all tasks')}`)
      _tasks.forEach((task) => {
        console.log(`✨ Task - ${chalk.blue.bold(task.name)}`)
        task.handler(_ok)
      })
    } else {
      let currentTask = _tasks.filter((task) => task.name === name)

      if (!currentTask.length) {
        _ok.task(name, handler)
      }

      currentTask = _tasks.filter((task) => task.name === name)
      console.log(`✨ Task - ${chalk.blue.bold(name)}`)
      currentTask[0].handler(_ok)
    }

    console.timeEnd(timerName)

    return _ok
  }

  return _ok
}

module.exports = ok()
