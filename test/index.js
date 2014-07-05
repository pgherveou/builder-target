var vm = require('vm')
var co = require('co')
var fs = require('fs')
var path = require('path')
var assert = require('assert')
var resolve = require('component-resolver')
var builder = require('component-builder')
var join = require('path').join


function fixture(name) {
  return join(__dirname, 'fixtures', name)
}

describe('no target', function () {
  var js = builder.scripts.require,
      tree;

  function build(nodes) {
    return builder.scripts(nodes)
      .use('scripts', builder.plugins.js())
      .end()
  }

  it('should install', co(function* () {
    tree = yield* resolve(fixture('foo'), {})
  }))

  it('should build', co(function* () {
    js += yield build(tree)
  }))

  it('should execute', function () {
    var ctx = vm.createContext()
    vm.runInContext(js, ctx)
    vm.runInContext('if (require("foo") !== "api") throw new Error()', ctx)
  })
})

describe('cordova target', function () {
  var js = builder.scripts.require,
      tree;

  function build(nodes) {
    return builder.scripts(nodes)
      .use('scripts', builder.plugins.js())
      .use('scripts', require('..')('cordova'))
      .end()
  }

  it('should install', co(function* () {
    tree = yield* resolve(fixture('foo'), {})
  }))

  it('should build', co(function* () {
    js += yield build(tree)
  }))

  it('should execute', function () {
    var ctx = vm.createContext()
    vm.runInContext(js, ctx)
    vm.runInContext('if (require("foo") !== "cordova api") throw new Error()', ctx)
  })
})

