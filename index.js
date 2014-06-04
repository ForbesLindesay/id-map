'use strict';

// todo: use ejson rather than e-json
var EJSON = require('ejson');

module.exports = IdMap;

function IdMap(idStringify, idParse) {
  this._map = {};
  this._idStringify = idStringify || JSON.stringify;
  this._idParse = idParse || JSON.parse;
};

// Some of these methods are designed to match methods on OrderedDict, since
// (eg) ObserveMultiplex and _CachingChangeObserver use them interchangeably.
// (Conceivably, this should be replaced with "UnorderedDict" with a specific
// set of methods that overlap between the two.)

IdMap.prototype.get = function (id) {
  var key = this._idStringify(id);
  return this._map[key];
};
IdMap.prototype.set = function (id, value) {
  var key = this._idStringify(id);
  this._map[key] = value;
};
IdMap.prototype.remove = function (id) {
  var key = this._idStringify(id);
  delete this._map[key];
};
IdMap.prototype.has = function (id) {
  var key = this._idStringify(id);
  return Object.prototype.hasOwnProperty.call(this._map, key);
};
IdMap.prototype.empty = function () {
  return Object.keys(this._map).length === 0;
};
IdMap.prototype.clear = function () {
  this._map = {};
};
// Iterates over the items in the map. Return `false` to break the loop.
IdMap.prototype.forEach = function (iterator) {
  var keys = Object.keys(this._map);
  for (var i = 0; i < keys.length; i++) {
    var breakIfFalse = iterator.call(null, this._map[keys[i]],
                                     this._idParse(keys[i]));
    if (breakIfFalse === false)
      return;
  }
};
IdMap.prototype.size = function () {
  return Object.keys(this._map).length;
};
IdMap.prototype.setDefault = function (id, def) {
  var key = this._idStringify(id);
  if (Object.prototype.hasOwnProperty.call(this._map, key))
    return this._map[key];
  this._map[key] = def;
  return def;
};
// Assumes that values are EJSON-cloneable, and that we don't need to clone
// IDs (ie, that nobody is going to mutate an ObjectId).
IdMap.prototype.clone = function () {
  var clone = new IdMap(this._idStringify, this._idParse);
  this.forEach(function (value, id) {
    clone.set(id, EJSON.clone(value));
  });
  return clone;
};
