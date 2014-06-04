'use strict';

var assert = require('assert');
var test = require('testit');
var IdMap = require('../');

test('get, set, has, remove, empty, size', function () {
  var map = new IdMap();
  assert(map.has({foo: 'bar'}) === false, 'has returns false if the key does not exist');
  assert(map.empty() === true, 'empty returns true when no items have been added');
  assert(map.size() === 0, 'size is 0 when the map is empty');
  map.set({foo: 'bar'}, 'value');
  assert(map.get({foo: 'bar'}) === 'value', 'get retrieves a value that was set');
  assert(map.has({foo: 'bar'}) === true, 'has returns true if the key exists');
  assert(map.empty() === false, 'empty returns false once an item has been added');
  assert(map.size() === 1, 'size is 1 when 1 item has been added');
  map.remove({foo: 'bar'});
  assert(map.has({foo: 'bar'}) === false, 'has returns false if the key has been removed');
  assert(map.empty() === true, 'empty returns true when all items have been removed');
  assert(map.size() === 0, 'size is 0 when the map is empty');
});
test('clear, forEach', function () {
  var map = new IdMap();
  map.set('foo', 'bar');
  map.set('foot', 'hand');
  assert(map.size() === 2);
  var count = 0;
  map.forEach(function (value, key) {
    if (count === 0) {
      assert(value === 'bar');
      assert(key === 'foo');
    } else if (count === 1) {
      assert(value === 'hand');
      assert(key === 'foot');
    }
    count++;
  });
  assert(count === 2);
  count = 0;
  map.forEach(function (value, key) {
    if (count === 0) {
      assert(value === 'bar');
      assert(key === 'foo');
    }
    count++;
    return false;
  });
  assert(count === 1);
  map.clear();
  assert(map.size() === 0);
});
test('clone', function () {
  var map = new IdMap();
  var obj = {bar: 'foo'};
  map.set({foo: 'bar'}, obj);
  var copy = map.clone();
  assert.deepEqual(copy.get({foo: 'bar'}), obj);
  obj.bar = 'foot';
  assert(copy.get({foo: 'bar'}).bar === 'foo');
});
test('setDefault', function () {
  var map = new IdMap();
  map.set('foo', 'bar');
  assert(map.setDefault('foo', 'other') === 'bar');
  assert(map.get('foo') === 'bar');
  assert(map.setDefault('foot', 'other') === 'other');
  assert(map.get('foot') === 'other');
});