"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Heap = function () {
  function Heap(scoreFn, compareFn) {
    _classCallCheck(this, Heap);

    this.contents = [];
    this.scoreFn = scoreFn !== undefined ? scoreFn : function (x) {
      return x;
    };
    this.compareFn = compareFn !== undefined ? compareFn : function (a, b) {
      return a < b;
    };
  }

  _createClass(Heap, [{
    key: "toString",
    value: function toString() {
      return this.contents;
    }
  }, {
    key: "size",
    value: function size() {
      return this.contents.length;
    }
  }, {
    key: "contains",
    value: function contains(item) {
      return this.contents.indexOf(item) >= 0;
    }
  }, {
    key: "peek",
    value: function peek() {
      return this.contents[0];
    }
  }, {
    key: "remove",
    value: function remove(node) {
      var _this = this;

      var next = function next(idx) {
        if (_this.size() == 0) {
          return null;
        }

        if (_this.contents[idx] == node) {
          var endNode = _this.contents.pop();
          if (node === endNode) {
            return node;
          } else {
            _this.contents[idx] = endNode;
            _this.bubbleUp(idx);
            _this.sinkDown(idx);
            return node;
          }
        } else if (_this.size() - 1 == idx) {
          return null;
        } else {
          return next(idx + 1);
        }
      };
      return next(0);
    }
  }, {
    key: "push",
    value: function push(nodes) {
      var _this2 = this;

      if (!Array.isArray(nodes)) {
        nodes = [nodes];
      }
      nodes.forEach(function (node) {
        _this2.contents.push(node);
        _this2.bubbleUp(_this2.size() - 1);
      });
      return nodes;
    }
  }, {
    key: "pop",
    value: function pop() {
      var result = this.contents[0];
      var end = this.contents.pop();

      if (this.size() > 0) {
        this.contents[0] = end;
        this.sinkDown(0);
      }

      return result;
    }
  }, {
    key: "swap",
    value: function swap(a, b) {
      var t = this.contents[a];
      this.contents[a] = this.contents[b];
      this.contents[b] = t;
      return a;
    }
  }, {
    key: "getIndexScore",
    value: function getIndexScore(index) {
      return this.scoreFn(this.contents[index]);
    }
  }, {
    key: "getParentIndex",
    value: function getParentIndex(index) {
      return Math.floor((index - 1) / 2);
    }
  }, {
    key: "bubbleUp",
    value: function bubbleUp(index) {
      if (index > 0) {
        var parentIndex = this.getParentIndex(index);
        if (this.compareFn(this.getIndexScore(index), this.getIndexScore(parentIndex))) {
          this.bubbleUp(this.swap(parentIndex, index));
        }
      }
    }
  }, {
    key: "sinkDown",
    value: function sinkDown(parentIndex) {
      if (parentIndex < this.size()) {
        var parentScore = this.getIndexScore(parentIndex);
        var leftIndex = parentIndex * 2 + 1;
        var rightIndex = parentIndex * 2 + 2;
        var swapIdx;

        var leftIndexScore = this.getIndexScore(leftIndex);
        if (leftIndex < this.size()) {
          if (this.compareFn(leftIndexScore, parentScore)) {
            swapIdx = leftIndex;
          }
        }

        if (rightIndex < this.size()) {
          var rightIndexScore = this.getIndexScore(rightIndex);
          if (this.compareFn(rightIndexScore, swapIdx !== undefined ? leftIndexScore : parentScore)) {
            swapIdx = rightIndex;
          }
        }

        if (swapIdx !== undefined) {
          this.sinkDown(this.swap(swapIdx, parentIndex));
        }
      }
    }
  }]);

  return Heap;
}();

module.exports = Heap;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2NvZGUvaGVhcC5qc3kiXSwibmFtZXMiOlsiSGVhcCIsInNjb3JlRm4iLCJjb21wYXJlRm4iLCJjb250ZW50cyIsInVuZGVmaW5lZCIsIngiLCJhIiwiYiIsImxlbmd0aCIsIml0ZW0iLCJpbmRleE9mIiwibm9kZSIsIm5leHQiLCJpZHgiLCJzaXplIiwiZW5kTm9kZSIsInBvcCIsImJ1YmJsZVVwIiwic2lua0Rvd24iLCJub2RlcyIsIkFycmF5IiwiaXNBcnJheSIsImZvckVhY2giLCJwdXNoIiwicmVzdWx0IiwiZW5kIiwidCIsImluZGV4IiwiTWF0aCIsImZsb29yIiwicGFyZW50SW5kZXgiLCJnZXRQYXJlbnRJbmRleCIsImdldEluZGV4U2NvcmUiLCJzd2FwIiwicGFyZW50U2NvcmUiLCJsZWZ0SW5kZXgiLCJyaWdodEluZGV4Iiwic3dhcElkeCIsImxlZnRJbmRleFNjb3JlIiwicmlnaHRJbmRleFNjb3JlIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0lBQU1BLEk7QUFDSixnQkFBYUMsT0FBYixFQUFzQkMsU0FBdEIsRUFBa0M7QUFBQTs7QUFDaEMsU0FBS0MsUUFBTCxHQUFnQixFQUFoQjtBQUNBLFNBQUtGLE9BQUwsR0FBZUEsWUFBWUcsU0FBWixHQUF3QkgsT0FBeEIsR0FBa0MsVUFBRUksQ0FBRjtBQUFBLGFBQVNBLENBQVQ7QUFBQSxLQUFqRDtBQUNBLFNBQUtILFNBQUwsR0FBaUJBLGNBQWNFLFNBQWQsR0FBMEJGLFNBQTFCLEdBQXNDLFVBQUVJLENBQUYsRUFBS0MsQ0FBTDtBQUFBLGFBQVlELElBQUlDLENBQWhCO0FBQUEsS0FBdkQ7QUFBd0U7Ozs7K0JBRS9EO0FBQUcsYUFBTyxLQUFLSixRQUFaO0FBQW9COzs7MkJBRTNCO0FBQUcsYUFBTyxLQUFLQSxRQUFMLENBQWNLLE1BQXJCO0FBQTJCOzs7NkJBRTNCQyxJLEVBQU87QUFBRyxhQUFPLEtBQUtOLFFBQUwsQ0FBY08sT0FBZCxDQUF1QkQsSUFBdkIs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YztBQUN0QixVQUFHQSxjQUFjLEtBQUtoQixJQUFMLEVBQWpCLEVBQStCO0FBQzNCLFlBQU1vQixjQUFjLEtBQUtGLGFBQUwsQ0FBcUJGLFdBQXJCLENBQXBCO0FBQ0EsWUFBTUssWUFBWUwsY0FBYyxDQUFkLEdBQWtCLENBQXBDO0FBQ0EsWUFBTU0sYUFBYU4sY0FBYyxDQUFkLEdBQWtCLENBQXJDO0FBQ0EsWUFBSU8sT0FBSjs7QUFFQSxZQUFNQyxpQkFBaUIsS0FBS04sYUFBTCxDQUFxQkcsU0FBckIsQ0FBdkI7QUFDQSxZQUFHQSxZQUFZLEtBQUtyQixJQUFMLEVBQWYsRUFBNkI7QUFDM0IsY0FBRyxLQUFLWixTQUFMLENBQWlCb0MsY0FBakIsRUFBaUNKLFdBQWpDLENBQUgsRUFBa0Q7QUFDaERHLHNCQUFVRixTQUFWO0FBQW1CO0FBQUE7O0FBRXZCLFlBQUdDLGFBQWEsS0FBS3RCLElBQUwsRUFBaEIsRUFBOEI7QUFDNUIsY0FBTXlCLGtCQUFrQixLQUFLUCxhQUFMLENBQXFCSSxVQUFyQixDQUF4QjtBQUNBLGNBQUcsS0FBS2xDLFNBQUwsQ0FBaUJxQyxlQUFqQixFQUFvQ0YsWUFBWWpDLFNBQVosR0FBd0JrQyxjQUF4QixHQUF5Q0osV0FBN0UsQ0FBSCxFQUFnRztBQUM5Rkcsc0JBQVVELFVBQVY7QUFBb0I7QUFBQTs7QUFFeEIsWUFBR0MsWUFBWWpDLFNBQWYsRUFBMkI7QUFDekIsZUFBS2MsUUFBTCxDQUFnQixLQUFLZSxJQUFMLENBQVlJLE9BQVosRUFBcUJQLFdBQXJCLENBQWhCO0FBQWdEO0FBQUE7QUFBQTs7Ozs7O0FBRzFEVSxPQUFPQyxPQUFQLEdBQWlCekMsSUFBakIiLCJmaWxlIjoiaGVhcC5qcyIsInNvdXJjZXNDb250ZW50IjpbImNsYXNzIEhlYXAgOjpcbiAgY29uc3RydWN0b3IoIHNjb3JlRm4sIGNvbXBhcmVGbiApIDo6XG4gICAgdGhpcy5jb250ZW50cyA9IFtdXG4gICAgdGhpcy5zY29yZUZuID0gc2NvcmVGbiAhPT0gdW5kZWZpbmVkID8gc2NvcmVGbiA6ICggeCApID0+IHhcbiAgICB0aGlzLmNvbXBhcmVGbiA9IGNvbXBhcmVGbiAhPT0gdW5kZWZpbmVkID8gY29tcGFyZUZuIDogKCBhLCBiICkgPT4gYSA8IGJcblxuICB0b1N0cmluZygpIDo6IHJldHVybiB0aGlzLmNvbnRlbnRzXG5cbiAgc2l6ZSgpIDo6IHJldHVybiB0aGlzLmNvbnRlbnRzLmxlbmd0aFxuXG4gIGNvbnRhaW5zKCBpdGVtICkgOjogcmV0dXJuIHRoaXMuY29udGVudHMuaW5kZXhPZiggaXRlbSApID49IDBcblxuICBwZWVrKCkgOjogcmV0dXJuIHRoaXMuY29udGVudHNbMF1cblxuICByZW1vdmUoIG5vZGUgKSA6OlxuICAgIGNvbnN0IG5leHQgPSAoIGlkeCApID0+IDo6XG4gICAgICAgIGlmIHRoaXMuc2l6ZSgpID09IDAgOjogcmV0dXJuIG51bGxcblxuICAgICAgICBpZiB0aGlzLmNvbnRlbnRzW2lkeF0gPT0gbm9kZSA6OlxuICAgICAgICAgICAgbGV0IGVuZE5vZGUgPSB0aGlzLmNvbnRlbnRzLnBvcCgpXG4gICAgICAgICAgICBpZiBub2RlID09PSBlbmROb2RlIDo6XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5vZGVcbiAgICAgICAgICAgIGVsc2UgOjpcbiAgICAgICAgICAgICAgICB0aGlzLmNvbnRlbnRzW2lkeF0gPSBlbmROb2RlXG4gICAgICAgICAgICAgICAgdGhpcy5idWJibGVVcCBAIGlkeFxuICAgICAgICAgICAgICAgIHRoaXMuc2lua0Rvd24gQCBpZHhcbiAgICAgICAgICAgICAgICByZXR1cm4gbm9kZVxuICAgICAgICBlbHNlXG4gICAgICAgICAgICBpZiB0aGlzLnNpemUoKSAtIDEgPT0gaWR4IDo6XG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGxcbiAgICAgICAgICAgIGVsc2UgOjpcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV4dCBAIGlkeCArIDFcbiAgICByZXR1cm4gbmV4dCBAIDBcblxuICBwdXNoKCBub2RlcyApIDo6XG4gICAgaWYgIUFycmF5LmlzQXJyYXkobm9kZXMpIDo6IG5vZGVzID0gWyBub2RlcyBdXG4gICAgbm9kZXMuZm9yRWFjaCBAICggbm9kZSApID0+IDo6XG4gICAgICB0aGlzLmNvbnRlbnRzLnB1c2ggQCBub2RlXG4gICAgICB0aGlzLmJ1YmJsZVVwIEAgdGhpcy5zaXplKCkgLSAxXG4gICAgcmV0dXJuIG5vZGVzXG5cbiAgcG9wKCkgOjpcbiAgICBsZXQgcmVzdWx0ID0gdGhpcy5jb250ZW50c1swXVxuICAgIGxldCBlbmQgPSB0aGlzLmNvbnRlbnRzLnBvcCgpXG5cbiAgICBpZiB0aGlzLnNpemUoKSA+IDAgOjpcbiAgICAgIHRoaXMuY29udGVudHNbMF0gPSBlbmRcbiAgICAgIHRoaXMuc2lua0Rvd24gQCAwXG5cbiAgICByZXR1cm4gcmVzdWx0XG5cbiAgc3dhcCggYSwgYiApIDo6XG4gICAgY29uc3QgdCA9IHRoaXMuY29udGVudHNbYV1cbiAgICB0aGlzLmNvbnRlbnRzW2FdID0gdGhpcy5jb250ZW50c1tiXVxuICAgIHRoaXMuY29udGVudHNbYl0gPSB0XG4gICAgcmV0dXJuIGFcblxuICBnZXRJbmRleFNjb3JlKCBpbmRleCApIDo6IHJldHVybiB0aGlzLnNjb3JlRm4gQCB0aGlzLmNvbnRlbnRzW2luZGV4XVxuXG4gIGdldFBhcmVudEluZGV4KCBpbmRleCApIDo6IHJldHVybiBNYXRoLmZsb29yIEAgKGluZGV4IC0gMSkgLyAyXG5cbiAgYnViYmxlVXAoIGluZGV4ICkgOjpcbiAgICBpZiBpbmRleCA+IDAgOjpcbiAgICAgICAgY29uc3QgcGFyZW50SW5kZXggPSB0aGlzLmdldFBhcmVudEluZGV4IEAgaW5kZXhcbiAgICAgICAgaWYgdGhpcy5jb21wYXJlRm4gQCB0aGlzLmdldEluZGV4U2NvcmUoIGluZGV4ICksIHRoaXMuZ2V0SW5kZXhTY29yZSggcGFyZW50SW5kZXggKSA6OlxuICAgICAgICAgIHRoaXMuYnViYmxlVXAgQCB0aGlzLnN3YXAgQCBwYXJlbnRJbmRleCwgaW5kZXhcblxuICBzaW5rRG93biggcGFyZW50SW5kZXggKSA6OlxuICAgIGlmIHBhcmVudEluZGV4IDwgdGhpcy5zaXplKCkgOjpcbiAgICAgICAgY29uc3QgcGFyZW50U2NvcmUgPSB0aGlzLmdldEluZGV4U2NvcmUgQCBwYXJlbnRJbmRleFxuICAgICAgICBjb25zdCBsZWZ0SW5kZXggPSBwYXJlbnRJbmRleCAqIDIgKyAxXG4gICAgICAgIGNvbnN0IHJpZ2h0SW5kZXggPSBwYXJlbnRJbmRleCAqIDIgKyAyXG4gICAgICAgIHZhciBzd2FwSWR4XG5cbiAgICAgICAgY29uc3QgbGVmdEluZGV4U2NvcmUgPSB0aGlzLmdldEluZGV4U2NvcmUgQCBsZWZ0SW5kZXhcbiAgICAgICAgaWYgbGVmdEluZGV4IDwgdGhpcy5zaXplKCkgOjpcbiAgICAgICAgICBpZiB0aGlzLmNvbXBhcmVGbiBAIGxlZnRJbmRleFNjb3JlLCBwYXJlbnRTY29yZSA6OlxuICAgICAgICAgICAgc3dhcElkeCA9IGxlZnRJbmRleFxuICAgICAgICBcbiAgICAgICAgaWYgcmlnaHRJbmRleCA8IHRoaXMuc2l6ZSgpIDo6XG4gICAgICAgICAgY29uc3QgcmlnaHRJbmRleFNjb3JlID0gdGhpcy5nZXRJbmRleFNjb3JlIEAgcmlnaHRJbmRleFxuICAgICAgICAgIGlmIHRoaXMuY29tcGFyZUZuIEAgcmlnaHRJbmRleFNjb3JlLCAoIHN3YXBJZHggIT09IHVuZGVmaW5lZCA/IGxlZnRJbmRleFNjb3JlIDogcGFyZW50U2NvcmUgKSA6OlxuICAgICAgICAgICAgc3dhcElkeCA9IHJpZ2h0SW5kZXhcblxuICAgICAgICBpZiBzd2FwSWR4ICE9PSB1bmRlZmluZWQgOjpcbiAgICAgICAgICB0aGlzLnNpbmtEb3duIEAgdGhpcy5zd2FwIEAgc3dhcElkeCwgcGFyZW50SW5kZXhcblxuXG5tb2R1bGUuZXhwb3J0cyA9IEhlYXBcbiJdfQ==