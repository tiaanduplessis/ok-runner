'use strict'

const args = require('get-them-args')(process.argv.slice(2))
const shell = require('shelljs')
const npmRunPath = require('npm-run-path')

const exec = (cmd, options = {}, cb) => shell.exec(cmd, Object.assign({env: npmRunPath.env()}, options), cb)

function ok () {
  const _tasks = {}
  const _ok = {
    args,
    exec,
    task,
    run}

  function task (name, handler) {
    if (typeof name !== 'string') {
      throw new Error('The task name must be a string.')
    }

    if (typeof handler === 'string') {
      _tasks[name] = () => {
        console.log(`${handler}`)
        exec(handler)
      }
    } else if (typeof handler === 'function') {
      _tasks[name] = handler
    } else {
      throw new Error(`Please provide a valid handler for task ${name}.`)
    }

    return _ok
  }

  function run (name, handler) {
    if (typeof name !== 'string') {
      throw new Error('The task name must be a string.')
    }

    if (name !== 'all' && (!_tasks[name] && !handler)) {
      console.error(`Task ${name} doesn't exist. Please provide a handler or create the task.`)
      return
    }

    const timerName = `⚡ ${name} ran in`
    console.time(timerName)

    if (name === 'all') {
      for (let key in _tasks) {
        console.log(`Running task ${key}`)
        _tasks[key](_ok)
      }
    } else {
      if (!_tasks[name]) {
        _ok.task(name, handler)
      }

      console.log(`Running task ${name}`)
      _tasks[name](_ok)
    }

    console.timeEnd(timerName)

    return _ok
  }

  return _ok
}

module.exports = ok()
