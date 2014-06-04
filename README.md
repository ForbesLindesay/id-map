# id-map

Map for non-string keys (taken from meteor.js).  Uses JSON.stringify and JSON.parse to convert the keys to and from strings.

[![Build Status](https://img.shields.io/travis/ForbesLindesay/id-map/master.svg)](https://travis-ci.org/ForbesLindesay/id-map)
[![Dependency Status](https://img.shields.io/gemnasium/ForbesLindesay/id-map.svg)](https://gemnasium.com/ForbesLindesay/id-map)
[![NPM version](https://img.shields.io/npm/v/id-map.svg)](http://badge.fury.io/js/id-map)

## Installation

    npm install id-map

## API

```js
var IdMap = require('id-map');
var map = new IdMap();

// optionaly specify custom stringifier and parser
var eMap = new IdMap(EJSON.stringify, EJSON.parse);
```

### map.get(id)

Get the value corresponding to a given id.

### map.set(id, value)

Set the value corresponding to a given id.

### map.remove(id)

Remove an id from the map.

### map.has(id)

Return `true` if the id is in the map, `false` otherwise.

### map.empty()

Return `true` if there are no items in the map.

### map.clear()

Remove all keys from the map.

### map.forEach(iterator)

Call iterator for each item in the map, where the arguments to iterator are `value` and `key`. Note that because the keys are stringified then parsed, they will be clones of the original keys.

### map.size()

Return the number of items in the map.

### map.setDefault(id, value)

Set the value corresponding to id, if it is not yet set. Return the value that is then linked to id.

### map.clone()

Return a new map with all of the items cloned.  This assumes they are all clonable via [EJSON](http://docs.meteor.com/#ejson).

## Contributing

This module is based on [Meteor id-map](https://github.com/meteor/meteor/tree/devel/packages/id-map).  It has been modified to be CommonJS compatible and not depend on underscore.  If meteor updates it's implementation, we should update ours.  To check whether the meteor version is the same as ours, compare it to `source.js` which is an un-modified copy of the meteor.js code.

## License

  MIT
