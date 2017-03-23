<h1 align="center">👌 ok-runner 👌</h1>
<div align="center">
  <strong>A task runner that works just fine</strong>
</div>
<br>
<div align="center">
  <a href="https://npmjs.org/package/ok-runner">
    <img src="https://img.shields.io/npm/v/ok-runner.svg?style=flat-square" alt="Package version" />
  </a>
  <a href="https://npmjs.org/package/ok-runner">
  <img src="https://img.shields.io/npm/dm/ok-runner.svg?style=flat-square" alt="Downloads" />
  </a>
  <a href="https://github.com/feross/standard">
    <img src="https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square" alt="Standard" />
  </a>
  <a href="https://travis-ci.org/tiaanduplessis/ok-runner">
    <img src="https://img.shields.io/travis/tiaanduplessis/ok-runner.svg?style=flat-square" alt="Travis Build" />
  </a>
  <a href="https://github.com/RichardLitt/standard-readme)">
    <img src="https://img.shields.io/badge/standard--readme-OK-green.svg?style=flat-square" alt="Standard Readme" />
  </a>
  <a href="https://badge.fury.io/gh/tiaanduplessis%2Fok-runner">
    <img src="https://badge.fury.io/gh/tiaanduplessis%2Fok-runner.svg?style=flat-square" alt="GitHub version" />
  </a>
  <a href="https://dependencyci.com/github/tiaanduplessis/ok-runner">
    <img src="https://dependencyci.com/github/tiaanduplessis/ok-runner/badge?style=flat-square" alt="Dependency CI" />
  </a>
  <a href="https://github.com/tiaanduplessis/ok-runner/blob/master/LICENSE">
    <img src="https://img.shields.io/npm/l/ok-runner.svg?style=flat-square" alt="License" />
  </a>
  <a href="http://makeapullrequest.com">
    <img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square" alt="PRs" />
  </a>
  <a href="https://www.paypal.me/tiaanduplessis/1">
    <img src="https://img.shields.io/badge/$-support-green.svg?style=flat-square" alt="Donate" />
  </a>
</div>
<br>
<div align="center">
  <a href="https://github.com/tiaanduplessis/ok-runner/watchers">
    <img src="https://img.shields.io/github/watchers/tiaanduplessis/ok-runner.svg?style=social" alt="Github Watch Badge" />
  </a>
  <a href="https://github.com/tiaanduplessis/ok-runner/stargazers">
    <img src="https://img.shields.io/github/stars/tiaanduplessis/ok-runner.svg?style=social" alt="Github Star Badge" />
  </a>
  <a href="https://twitter.com/intent/tweet?text=Check%20out%20ok-runner!%20https://github.com/tiaanduplessis/ok-runner%20%F0%9F%91%8D">
    <img src="https://img.shields.io/twitter/url/https/github.com/tiaanduplessis/ok-runner.svg?style=social" alt="Tweet" />
  </a>
</div>
<br>
<div align="center">
  Built with ❤︎ by <a href="tiaanduplessis.co.za">Tiaan</a> and <a href="https://github.com/tiaanduplessis/ok-runner/graphs/contributors">contributors</a>
</div>

<h2>Table of Contents</h2>
<details>
  <summary>Table of Contents</summary>
	<li><a href="#install">Install</a></li>
  <li><a href="#install">Install</a></li>
  <li><a href="#usage">Usage</a></li>
  <li><a href="#api">API</a></li>
  <li><a href="#contribute">Contribute</a></li>
  <li><a href="#license">License</a></li>
</details>


## Motivation

I usually use `npm scripts` extensively as a build tool when [building libraries](https://github.com/tiaanduplessis?tab=repositories). Though this leads to my `package.json` becoming bloated and does not allow for proper commenting of longer commands. I wanted a simple build tool that allowed me to execute commands and functions(in more complex cases) with minimal effort. The popular solutions felt like overkill so I made my own. It ain't the next big thing, but it works fine.


## Install

```sh
$ npm install --save ok-runner
# Or
$ yarn add ok-runner
```

## Usage

Create a `js` file in your project directory. for example `ok.js`

In `ok.js`:

```js

const ok = require('ok-runner')

ok
  .run('Greet', 'echo Hello!')
  .run('Do some logging', () => {
    console.log('log')
    console.log('All')
    console.log('The')
    console.log('Things!')
  })
  .run('Touch a file', 'touch aFile')
  .run('Remove a file', 'rm aFile')

```

You can then run the file in your terminal:

```sh
$ node ok.js
```

If the second argument is a string, it will be wrapped in a the `ok.exec` property that supports executing locally installed binaries by name.

Or you can run specific commands by using the cli. Modify your `ok.js`:

```js

const ok = require('ok-runner')

ok
  .task('Greet', 'echo Hello!')
  .task('Do some logging', () => {
    console.log('log')
    console.log('All')
    console.log('The')
    console.log('Things!')
  })
  .task('Touch a file', 'touch aFile')
  .task('Remove a file', 'rm aFile')

module.exports.ok

```

Then, after installing globally or via your npm scripts:

```sh
$ ok Greet
```

This will execute only the hello task. only running `ok` will run all the tasks

The `cli` looks for a file named `ok.js` otherwise you must specify the script name:

```sh
ok --script=example.js
```

## API

The module exports a singleton `ok` object with the following methods:

#### `ok.run(taskName: String, handler: String|Function)`

Runs a task with the given `taskName` by executing the given string command or function. If no `handler` is provided, the created tasks are checked for a matching task and executed

### `ok.task(taskName: String, handler: String|Function)`

Creates a new task with name `taskName` that can be ran using the `ok.run` method or via the cli.

### `ok.args`

An object containing all the argument options parsed using [get-them-args](https://github.com/tiaanduplessis/get-them-args)

### `ok.exec(command, options, cb)`

A simple wrapper around [shelljs]()'s `exec` method after extending it support executing locally installed binaries by name.

## Example

Please check the example directory.

## Contribute

Contributions are welcome. Please open up an issue or create PR if you would like to help out.

Note: If editing the README, please conform to the [standard-readme](https://github.com/RichardLitt/standard-readme) specification.

## License

Licensed under the MIT License.
