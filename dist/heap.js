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
    key: "push",
    value: function push(nodes) {
      var _this = this;

      if (!Array.isArray(nodes)) {
        nodes = [nodes];
      }
      nodes.forEach(function (node) {
        _this.contents.push(node);
        _this.bubbleUp(_this.size() - 1);
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

        if (leftIndex < this.size()) {
          var _leftIndexScore = this.getIndexScore(leftIndex);
          if (this.compareFn(_leftIndexScore, parentScore)) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2NvZGUvaGVhcC5qc3kiXSwibmFtZXMiOlsiSGVhcCIsInNjb3JlRm4iLCJjb21wYXJlRm4iLCJjb250ZW50cyIsInVuZGVmaW5lZCIsIngiLCJhIiwiYiIsImxlbmd0aCIsIml0ZW0iLCJpbmRleE9mIiwibm9kZXMiLCJBcnJheSIsImlzQXJyYXkiLCJmb3JFYWNoIiwibm9kZSIsInB1c2giLCJidWJibGVVcCIsInNpemUiLCJyZXN1bHQiLCJlbmQiLCJwb3AiLCJzaW5rRG93biIsInQiLCJpbmRleCIsIk1hdGgiLCJmbG9vciIsInBhcmVudEluZGV4IiwiZ2V0UGFyZW50SW5kZXgiLCJnZXRJbmRleFNjb3JlIiwic3dhcCIsInBhcmVudFNjb3JlIiwibGVmdEluZGV4IiwicmlnaHRJbmRleCIsInN3YXBJZHgiLCJsZWZ0SW5kZXhTY29yZSIsInJpZ2h0SW5kZXhTY29yZSIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7Ozs7OztJQUFNQSxJO0FBQ0osZ0JBQWFDLE9BQWIsRUFBc0JDLFNBQXRCLEVBQWtDO0FBQUE7O0FBQ2hDLFNBQUtDLFFBQUwsR0FBZ0IsRUFBaEI7QUFDQSxTQUFLRixPQUFMLEdBQWVBLFlBQVlHLFNBQVosR0FBd0JILE9BQXhCLEdBQWtDLFVBQUVJLENBQUY7QUFBQSxhQUFTQSxDQUFUO0FBQUEsS0FBakQ7QUFDQSxTQUFLSCxTQUFMLEdBQWlCQSxjQUFjRSxTQUFkLEdBQTBCRixTQUExQixHQUFzQyxVQUFFSSxDQUFGLEVBQUtDLENBQUw7QUFBQSxhQUFZRCxJQUFJQyxDQUFoQjtBQUFBLEtBQXZEO0FBQXdFOzs7OytCQUUvRDtBQUFHLGFBQU8sS0FBS0osUUFBWjtBQUFvQjs7OzJCQUUzQjtBQUFHLGFBQU8sS0FBS0EsUUFBTCxDQUFjSyxNQUFyQjtBQUEyQjs7OzZCQUUzQkMsSSxFQUFPO0FBQUcsYUFBTyxLQUFLTixRQUFMLENBQWNPLE9BQWQsQ0FBdUJELElBQXZCLEtBQWlDLENBQXhDO0FBQXlDOzs7MkJB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QUFDekIsZUFBS2tCLFFBQUwsQ0FBZ0IsS0FBS1EsSUFBTCxDQUFZSSxPQUFaLEVBQXFCUCxXQUFyQixDQUFoQjtBQUFnRDtBQUFBO0FBQUE7Ozs7OztBQUcxRFUsT0FBT0MsT0FBUCxHQUFpQnRDLElBQWpCIiwiZmlsZSI6ImhlYXAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJjbGFzcyBIZWFwIDo6XG4gIGNvbnN0cnVjdG9yKCBzY29yZUZuLCBjb21wYXJlRm4gKSA6OlxuICAgIHRoaXMuY29udGVudHMgPSBbXVxuICAgIHRoaXMuc2NvcmVGbiA9IHNjb3JlRm4gIT09IHVuZGVmaW5lZCA/IHNjb3JlRm4gOiAoIHggKSA9PiB4XG4gICAgdGhpcy5jb21wYXJlRm4gPSBjb21wYXJlRm4gIT09IHVuZGVmaW5lZCA/IGNvbXBhcmVGbiA6ICggYSwgYiApID0+IGEgPCBiXG5cbiAgdG9TdHJpbmcoKSA6OiByZXR1cm4gdGhpcy5jb250ZW50c1xuXG4gIHNpemUoKSA6OiByZXR1cm4gdGhpcy5jb250ZW50cy5sZW5ndGhcblxuICBjb250YWlucyggaXRlbSApIDo6IHJldHVybiB0aGlzLmNvbnRlbnRzLmluZGV4T2YoIGl0ZW0gKSA+PSAwXG5cbiAgcGVlaygpIDo6IHJldHVybiB0aGlzLmNvbnRlbnRzWzBdXG5cbiAgcHVzaCggbm9kZXMgKSA6OlxuICAgIGlmICFBcnJheS5pc0FycmF5KG5vZGVzKSA6OiBub2RlcyA9IFsgbm9kZXMgXVxuICAgIG5vZGVzLmZvckVhY2ggQCAoIG5vZGUgKSA9PiA6OlxuICAgICAgdGhpcy5jb250ZW50cy5wdXNoIEAgbm9kZVxuICAgICAgdGhpcy5idWJibGVVcCBAIHRoaXMuc2l6ZSgpIC0gMVxuICAgIHJldHVybiBub2Rlc1xuXG4gIHBvcCgpIDo6XG4gICAgbGV0IHJlc3VsdCA9IHRoaXMuY29udGVudHNbMF1cbiAgICBsZXQgZW5kID0gdGhpcy5jb250ZW50cy5wb3AoKVxuXG4gICAgaWYgdGhpcy5zaXplKCkgPiAwIDo6XG4gICAgICB0aGlzLmNvbnRlbnRzWzBdID0gZW5kXG4gICAgICB0aGlzLnNpbmtEb3duIEAgMFxuXG4gICAgcmV0dXJuIHJlc3VsdFxuXG4gIHN3YXAoIGEsIGIgKSA6OlxuICAgIGNvbnN0IHQgPSB0aGlzLmNvbnRlbnRzW2FdXG4gICAgdGhpcy5jb250ZW50c1thXSA9IHRoaXMuY29udGVudHNbYl1cbiAgICB0aGlzLmNvbnRlbnRzW2JdID0gdFxuICAgIHJldHVybiBhXG5cbiAgZ2V0SW5kZXhTY29yZSggaW5kZXggKSA6OiByZXR1cm4gdGhpcy5zY29yZUZuIEAgdGhpcy5jb250ZW50c1tpbmRleF1cblxuICBnZXRQYXJlbnRJbmRleCggaW5kZXggKSA6OiByZXR1cm4gTWF0aC5mbG9vciBAIChpbmRleCAtIDEpIC8gMlxuXG4gIGJ1YmJsZVVwKCBpbmRleCApIDo6XG4gICAgaWYgaW5kZXggPiAwIDo6XG4gICAgICAgIGNvbnN0IHBhcmVudEluZGV4ID0gdGhpcy5nZXRQYXJlbnRJbmRleCBAIGluZGV4XG4gICAgICAgIGlmIHRoaXMuY29tcGFyZUZuIEAgdGhpcy5nZXRJbmRleFNjb3JlKCBpbmRleCApLCB0aGlzLmdldEluZGV4U2NvcmUoIHBhcmVudEluZGV4ICkgOjpcbiAgICAgICAgICB0aGlzLmJ1YmJsZVVwIEAgdGhpcy5zd2FwIEAgcGFyZW50SW5kZXgsIGluZGV4XG5cbiAgc2lua0Rvd24oIHBhcmVudEluZGV4ICkgOjpcbiAgICBpZiBwYXJlbnRJbmRleCA8IHRoaXMuc2l6ZSgpIDo6XG4gICAgICAgIGNvbnN0IHBhcmVudFNjb3JlID0gdGhpcy5nZXRJbmRleFNjb3JlIEAgcGFyZW50SW5kZXhcbiAgICAgICAgY29uc3QgbGVmdEluZGV4ID0gcGFyZW50SW5kZXggKiAyICsgMVxuICAgICAgICBjb25zdCByaWdodEluZGV4ID0gcGFyZW50SW5kZXggKiAyICsgMlxuICAgICAgICB2YXIgc3dhcElkeFxuXG4gICAgICAgIGlmIGxlZnRJbmRleCA8IHRoaXMuc2l6ZSgpIDo6XG4gICAgICAgICAgY29uc3QgbGVmdEluZGV4U2NvcmUgPSB0aGlzLmdldEluZGV4U2NvcmUgQCBsZWZ0SW5kZXhcbiAgICAgICAgICBpZiB0aGlzLmNvbXBhcmVGbiBAIGxlZnRJbmRleFNjb3JlLCBwYXJlbnRTY29yZSA6OlxuICAgICAgICAgICAgc3dhcElkeCA9IGxlZnRJbmRleFxuICAgICAgICBcbiAgICAgICAgaWYgcmlnaHRJbmRleCA8IHRoaXMuc2l6ZSgpIDo6XG4gICAgICAgICAgY29uc3QgcmlnaHRJbmRleFNjb3JlID0gdGhpcy5nZXRJbmRleFNjb3JlIEAgcmlnaHRJbmRleFxuICAgICAgICAgIGlmIHRoaXMuY29tcGFyZUZuIEAgcmlnaHRJbmRleFNjb3JlLCAoIHN3YXBJZHggIT09IHVuZGVmaW5lZCA/IGxlZnRJbmRleFNjb3JlIDogcGFyZW50U2NvcmUgKSA6OlxuICAgICAgICAgICAgc3dhcElkeCA9IHJpZ2h0SW5kZXhcblxuICAgICAgICBpZiBzd2FwSWR4ICE9PSB1bmRlZmluZWQgOjpcbiAgICAgICAgICB0aGlzLnNpbmtEb3duIEAgdGhpcy5zd2FwIEAgc3dhcElkeCwgcGFyZW50SW5kZXhcblxuXG5tb2R1bGUuZXhwb3J0cyA9IEhlYXBcbiJdfQ==