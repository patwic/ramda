var assert = require('assert');
var R = require('..');

describe('isEmpty', function() {
    it('returns true if the list is empty', function() {
        assert.equal(R.isEmpty([]), true);
    });

    it('returns false if the list is not empty', function() {
        assert.equal(R.isEmpty(['']), false);
    });
});

describe('isAtom', function() {
    it('is false for Arrays', function() {
        assert.equal(R.isAtom([]), false);
        assert.equal(R.isAtom([1, 2, 3, 4]), false);
    });
    it('is false for undefined and null', function() {
        assert.equal(R.isAtom(), false);
        assert.equal(R.isAtom(null), false);
    });

    it('is true for primitive values', function() {
        assert.equal(R.isAtom(1), true);
        assert.equal(R.isAtom('a'), true);
        assert.equal(R.isAtom({}), true);
        assert.equal(R.isAtom(true), true);
        assert.equal(R.isAtom(false), true);
    });
});

describe('prepend', function() {
    it('adds the element to the beginning of the list', function() {
        assert.deepEqual(R.prepend('x', ['y', 'z']), ['x', 'y', 'z']);
        assert.deepEqual(R.prepend(['a', 'z'], ['x', 'y']), [['a', 'z'], 'x', 'y']);
    });
});

describe('append', function() {
    it('adds the element to the end of the list', function() {
        assert.deepEqual(R.append('z', ['x', 'y']), ['x', 'y', 'z']);
        assert.deepEqual(R.append(['a', 'z'], ['x', 'y']), ['x', 'y', ['a', 'z']]);
    });
});

describe('concat', function() {
    it('adds combines the elements of the two lists', function() {
        assert.deepEqual(R.concat(['a', 'b'], ['c', 'd']), ['a', 'b', 'c', 'd']);
        assert.deepEqual(R.concat([], ['c', 'd']), ['c', 'd']);
    });

    var z1 = {
      x: 'z1',
      concat: function(that) { return this.x + ' ' + that.x; }
    };
    var z2 = { x: 'z2' };

    it('adds combines the elements of the two lists', function() {
        assert.deepEqual(R.concat(['a', 'b'], ['c', 'd']), ['a', 'b', 'c', 'd']);
        assert.deepEqual(R.concat([], ['c', 'd']), ['c', 'd']);
    });
    it('works for objects with a concat method', function() {
      assert.equal(R.concat('foo', 'bar'), 'foobar');
      assert.equal(R.concat(z1, z2), 'z1 z2');
    });
});

describe('head', function() {
    it('returns undefined for an empty list', function() {
        assert.equal(typeof(R.head([])),  "undefined");
    });
    it('returns undefined for no arguments', function() {
        assert.equal(typeof(R.head()), "undefined");
    });
    it('returns the first element of a list', function() {
        assert.equal(R.head(['a', 'b', 'c', 'd']), 'a');
    });
});

describe('last', function() {
    it('returns undefined for an empty list', function() {
        assert.equal(typeof(R.last([])),  "undefined");
    });
    it('returns undefined for no arguments', function() {
        assert.equal(typeof(R.last()), "undefined");
    });
    it('returns the first element of a list', function() {
        assert.equal(R.last(['a', 'b', 'c', 'd']), 'd');
    });
});

describe('tail', function() {
    it('returns an empty list for an empty list', function() {
        assert.deepEqual(R.tail([]), []);
    });
    it('returns an empty list for no arguments', function() {
        assert.deepEqual(R.tail(), []);
    });
    it('returns a new list containing all the elements after the first element of a list', function() {
        assert.deepEqual(['b', 'c', 'd'], R.tail(['a', 'b', 'c', 'd']));
    });
});

describe('size', function() {
    it('counts the elements of a list', function() {
        assert.equal(R.size(['a', 'b', 'c', 'd']), 4);
    });

    it('should be aliased by `length`', function() {
        assert.equal(R.length([2, 4, 6, 8, 10]), 5);
        assert.strictEqual(R.length, R.size);
    });

});

describe('sort', function() {
    it('sorts the elements of a list', function() {
        assert.deepEqual(R.sort(function(a, b) {return a - b;}, [3, 1, 8, 1, 2, 5]), [1, 1, 2, 3, 5, 8]);
    });

    it('does not affect the list passed supplied', function() {
        var list = [3, 1, 8, 1, 2, 5];
        assert.deepEqual(R.sort(function(a, b) {return a - b;}, list), [1, 1, 2, 3, 5, 8]);
        assert.deepEqual(list, [3, 1, 8, 1, 2, 5]);
    });

    it('is automatically curried', function() {
        var sortByLength = R.sort(function(a, b) {return a.length - b.length;});
        assert.deepEqual(sortByLength(["one", "two", "three", "four", "five", "six"]),
                                      ["one", "two", "six", "four", "five", "three"]);
    });
});

describe('comparator', function() {
    it('builds a comparator function for sorting out of a simple predicate that reports whether the first param is smaller', function() {
        assert.deepEqual([3, 1, 8, 1, 2, 5].sort(R.comparator(function(a, b) {return a < b;})), [1, 1, 2, 3, 5, 8]);
    });
});
