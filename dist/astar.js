'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Heap = require('../dist/heap.js');
var AStar = function () {
    function AStar(heurFn, goalFn, succFn, costFn) {
        _classCallCheck(this, AStar);

        this.heurFn = heurFn;
        this.goalFn = goalFn;
        this.succFn = succFn;
        this.costFn = costFn;
    }

    _createClass(AStar, [{
        key: '_nodeify',
        value: function _nodeify(data) {
            var prev = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

            data._astar_data = {
                g: this.costFn(data),
                h: this.heurFn(data, this.start),
                prev: prev };
            return data;
        }
    }, {
        key: '_step',
        value: function _step() {
            var _this = this;

            var current = this.open.pop();
            this.closed.push(current);

            if (this.goalFn(current)) {
                return this.traceback(current);
            }

            this.succFn(current).forEach(function (successor) {
                if (_this.closed.indexOf(successor) < 0) {
                    if (_this.open.contains(successor)) {
                        var tempCost = current._astar_data.g + successor._astar_data.g;
                        if (tempCost < successor._astar_data.g) {
                            successor._astar_data.g = tempCost;
                            successor._astar_data.prev = current;
                        }
                    } else {
                        _this.open.push(_this._nodeify(successor, current));
                    }
                }
            });

            if (this.open.size() == 0) {
                return [];
            }

            return this._step();
        }
    }, {
        key: 'find',
        value: function find(start) {
            this.start = start;
            this.open = new Heap(function (node) {
                return node._astar_data.g + node._astar_data.h;
            });
            this.closed = [];

            this.open.push(this._nodeify(this.start));
            return this._step();
        }
    }, {
        key: 'traceback',
        value: function traceback(goal) {
            var path = [goal];
            var trace = function trace(node) {
                if (node._astar_data.prev) {
                    path.push(node._astar_data.prev);
                    trace(node._astar_data.prev);
                }
            };
            trace(goal);
            path.reverse();
            return path.map(function (node) {
                delete node._astar_data;
                return node;
            });
        }
    }]);

    return AStar;
}();

module.exports = AStar;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2NvZGUvYXN0YXIuanN5Il0sIm5hbWVzIjpbIkhlYXAiLCJyZXF1aXJlIiwiQVN0YXIiLCJoZXVyRm4iLCJnb2FsRm4iLCJzdWNjRm4iLCJjb3N0Rm4iLCJkYXRhIiwicHJldiIsIl9hc3Rhcl9kYXRhIiwiZyIsImgiLCJzdGFydCIsImN1cnJlbnQiLCJvcGVuIiwicG9wIiwiY2xvc2VkIiwicHVzaCIsInRyYWNlYmFjayIsImZvckVhY2giLCJpbmRleE9mIiwic3VjY2Vzc29yIiwiY29udGFpbnMiLCJ0ZW1wQ29zdCIsIl9ub2RlaWZ5Iiwic2l6ZSIsIl9zdGVwIiwibm9kZSIsImdvYWwiLCJwYXRoIiwidHJhY2UiLCJyZXZlcnNlIiwibWFwIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsSUFBTUEsT0FBT0MsUUFBVSxpQkFBVixDQUFiO0lBRU1DLEs7QUFDRixtQkFBYUMsTUFBYixFQUFxQkMsTUFBckIsRUFBNkJDLE1BQTdCLEVBQXFDQyxNQUFyQyxFQUE4QztBQUFBOztBQUMxQyxhQUFLSCxNQUFMLEdBQWNBLE1BQWQ7QUFDQSxhQUFLQyxNQUFMLEdBQWNBLE1BQWQ7QUFDQSxhQUFLQyxNQUFMLEdBQWNBLE1BQWQ7QUFDQSxhQUFLQyxNQUFMLEdBQWNBLE1BQWQ7QUFBb0I7Ozs7aUNBRWRDLEksRUFBa0I7QUFBQSxnQkFBWkMsSUFBWSx1RUFBUCxJQUFPOztBQUN4QkQsaUJBQUtFLFdBQUwsR0FBbUI7QUFDZkMsbUJBQUcsS0FBS0osTUFBTCxDQUFhQyxJQUFiLENBRFk7QUFFYkksbUJBQUcsS0FBS1IsTUFBTCxDQUFhSSxJQUFiLEVBQW1CLEtBQUtLLEtBQXhCLENBRlU7QUFHYkosc0JBQU1BLElBSE8sRUFBbkI7QUFJQSxtQkFBT0QsSUFBUDtBQUFXOzs7Z0NBRVA7QUFBQTs7QUFDSixnQkFBSU0sVUFBVSxLQUFLQyxJQUFMLENBQVVDLEdBQVYsRUFBZDtBQUNBLGlCQUFLQyxNQUFMLENBQVlDLElBQVosQ0FBbUJKLE9BQW5COztBQUVBLGdCQUFHLEtBQUtULE1BQUwsQ0FBY1MsT0FBZCxDQUFILEVBQTJCO0FBQUMsdUJBQU8sS0FBS0ssU0FBTCxDQUFpQkwsT0FBakIsQ0FBUDtBQUErQjs7QUFFM0QsaUJBQUtSLE1BQUwsQ0FBYVEsT0FBYixFQUF1Qk0sT0FBdkIsQ0FBaUMscUJBQWE7QUFDMUMsb0JBQUcsTUFBS0gsTUFBTCxDQUFZSSxPQUFaLENBQXFCQyxTQUFyQixJQUFtQyxDQUF0QyxFQUEwQztBQUN0Qyx3QkFBRyxNQUFLUCxJQUFMLENBQVVRLFFBQVYsQ0FBcUJELFNBQXJCLENBQUgsRUFBb0M7QUFDaEMsNEJBQUlFLFdBQVdWLFFBQVFKLFdBQVIsQ0FBb0JDLENBQXBCLEdBQXdCVyxVQUFVWixXQUFWLENBQXNCQyxDQUE3RDtBQUNBLDRCQUFHYSxXQUFXRixVQUFVWixXQUFWLENBQXNCQyxDQUFwQyxFQUF3QztBQUNwQ1csc0NBQVVaLFdBQVYsQ0FBc0JDLENBQXRCLEdBQTBCYSxRQUExQjtBQUNBRixzQ0FBVVosV0FBVixDQUFzQkQsSUFBdEIsR0FBNkJLLE9BQTdCO0FBQW9DO0FBQUEscUJBSjVDLE1BS0s7QUFDRCw4QkFBS0MsSUFBTCxDQUFVRyxJQUFWLENBQWlCLE1BQUtPLFFBQUwsQ0FBZ0JILFNBQWhCLEVBQTJCUixPQUEzQixDQUFqQjtBQUFtRDtBQUFBO0FBQUEsYUFSL0Q7O0FBVUEsZ0JBQUcsS0FBS0MsSUFBTCxDQUFVVyxJQUFWLE1BQW9CLENBQXZCLEVBQTJCO0FBQUMsdUJBQU8sRUFBUDtBQUFTOztBQUVyQyxtQkFBTyxLQUFLQyxLQUFMLEVBQVA7QUFBbUI7Ozs2QkFFakJkLEssRUFBUTtBQUNWLGlCQUFLQSxLQUFMLEdBQWFBLEtBQWI7QUFDQSxpQkFBS0UsSUFBTCxHQUFZLElBQUlkLElBQUosQ0FBVyxVQUFFMkIsSUFBRjtBQUFBLHVCQUFZQSxLQUFLbEIsV0FBTCxDQUFpQkMsQ0FBakIsR0FBcUJpQixLQUFLbEIsV0FBTCxDQUFpQkUsQ0FBbEQ7QUFBQSxhQUFYLENBQVo7QUFDQSxpQkFBS0ssTUFBTCxHQUFjLEVBQWQ7O0FBRUEsaUJBQUtGLElBQUwsQ0FBVUcsSUFBVixDQUFpQixLQUFLTyxRQUFMLENBQWdCLEtBQUtaLEtBQXJCLENBQWpCO0FBQ0EsbUJBQU8sS0FBS2MsS0FBTCxFQUFQO0FBQW1COzs7a0NBRVpFLEksRUFBTztBQUNkLGdCQUFJQyxPQUFPLENBQUVELElBQUYsQ0FBWDtBQUNBLGdCQUFJRSxRQUFRLFNBQVJBLEtBQVEsQ0FBRUgsSUFBRixFQUFZO0FBQ3BCLG9CQUFHQSxLQUFLbEIsV0FBTCxDQUFpQkQsSUFBcEIsRUFBMkI7QUFDdkJxQix5QkFBS1osSUFBTCxDQUFZVSxLQUFLbEIsV0FBTCxDQUFpQkQsSUFBN0I7QUFDQXNCLDBCQUFRSCxLQUFLbEIsV0FBTCxDQUFpQkQsSUFBekI7QUFBNkI7QUFBQSxhQUhyQztBQUlBc0Isa0JBQVFGLElBQVI7QUFDQUMsaUJBQUtFLE9BQUw7QUFDQSxtQkFBT0YsS0FBS0csR0FBTCxDQUFXLFVBQUVMLElBQUYsRUFBWTtBQUMxQix1QkFBT0EsS0FBS2xCLFdBQVo7QUFDQSx1QkFBT2tCLElBQVA7QUFBVyxhQUZSLENBQVA7QUFFZTs7Ozs7O0FBR3ZCTSxPQUFPQyxPQUFQLEdBQWlCaEMsS0FBakIiLCJmaWxlIjoiYXN0YXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBIZWFwID0gcmVxdWlyZSBAICcuLi9kaXN0L2hlYXAuanMnXG5cbmNsYXNzIEFTdGFyIDo6XG4gICAgY29uc3RydWN0b3IoIGhldXJGbiwgZ29hbEZuLCBzdWNjRm4sIGNvc3RGbiApIDo6XG4gICAgICAgIHRoaXMuaGV1ckZuID0gaGV1ckZuXG4gICAgICAgIHRoaXMuZ29hbEZuID0gZ29hbEZuXG4gICAgICAgIHRoaXMuc3VjY0ZuID0gc3VjY0ZuXG4gICAgICAgIHRoaXMuY29zdEZuID0gY29zdEZuXG5cbiAgICBfbm9kZWlmeSggZGF0YSwgcHJldj1udWxsICkgOjpcbiAgICAgICAgZGF0YS5fYXN0YXJfZGF0YSA9IDo6XG4gICAgICAgICAgICBnOiB0aGlzLmNvc3RGbiggZGF0YSApXG4gICAgICAgICAgICAsIGg6IHRoaXMuaGV1ckZuKCBkYXRhLCB0aGlzLnN0YXJ0IClcbiAgICAgICAgICAgICwgcHJldjogcHJldlxuICAgICAgICByZXR1cm4gZGF0YVxuXG4gICAgX3N0ZXAoKSA6OlxuICAgICAgICBsZXQgY3VycmVudCA9IHRoaXMub3Blbi5wb3AoKVxuICAgICAgICB0aGlzLmNsb3NlZC5wdXNoIEAgY3VycmVudFxuXG4gICAgICAgIGlmIHRoaXMuZ29hbEZuIEAgY3VycmVudCA6OiByZXR1cm4gdGhpcy50cmFjZWJhY2sgQCBjdXJyZW50XG5cbiAgICAgICAgdGhpcy5zdWNjRm4oIGN1cnJlbnQgKS5mb3JFYWNoIEAgc3VjY2Vzc29yID0+IDo6XG4gICAgICAgICAgICBpZiB0aGlzLmNsb3NlZC5pbmRleE9mKCBzdWNjZXNzb3IgKSA8IDAgOjpcbiAgICAgICAgICAgICAgICBpZiB0aGlzLm9wZW4uY29udGFpbnMgQCBzdWNjZXNzb3IgOjpcbiAgICAgICAgICAgICAgICAgICAgbGV0IHRlbXBDb3N0ID0gY3VycmVudC5fYXN0YXJfZGF0YS5nICsgc3VjY2Vzc29yLl9hc3Rhcl9kYXRhLmdcbiAgICAgICAgICAgICAgICAgICAgaWYgdGVtcENvc3QgPCBzdWNjZXNzb3IuX2FzdGFyX2RhdGEuZyA6OlxuICAgICAgICAgICAgICAgICAgICAgICAgc3VjY2Vzc29yLl9hc3Rhcl9kYXRhLmcgPSB0ZW1wQ29zdFxuICAgICAgICAgICAgICAgICAgICAgICAgc3VjY2Vzc29yLl9hc3Rhcl9kYXRhLnByZXYgPSBjdXJyZW50XG4gICAgICAgICAgICAgICAgZWxzZSA6OlxuICAgICAgICAgICAgICAgICAgICB0aGlzLm9wZW4ucHVzaCBAIHRoaXMuX25vZGVpZnkgQCBzdWNjZXNzb3IsIGN1cnJlbnRcblxuICAgICAgICBpZiB0aGlzLm9wZW4uc2l6ZSgpID09IDAgOjogcmV0dXJuIFtdXG5cbiAgICAgICAgcmV0dXJuIHRoaXMuX3N0ZXAoKVxuXG4gICAgZmluZCggc3RhcnQgKSA6OlxuICAgICAgICB0aGlzLnN0YXJ0ID0gc3RhcnRcbiAgICAgICAgdGhpcy5vcGVuID0gbmV3IEhlYXAgQCAoIG5vZGUgKSA9PiBub2RlLl9hc3Rhcl9kYXRhLmcgKyBub2RlLl9hc3Rhcl9kYXRhLmhcbiAgICAgICAgdGhpcy5jbG9zZWQgPSBbXVxuXG4gICAgICAgIHRoaXMub3Blbi5wdXNoIEAgdGhpcy5fbm9kZWlmeSBAIHRoaXMuc3RhcnRcbiAgICAgICAgcmV0dXJuIHRoaXMuX3N0ZXAoKVxuICAgICAgICBcbiAgICB0cmFjZWJhY2soIGdvYWwgKSA6OlxuICAgICAgICBsZXQgcGF0aCA9IFsgZ29hbCBdXG4gICAgICAgIGxldCB0cmFjZSA9ICggbm9kZSApID0+IDo6XG4gICAgICAgICAgICBpZiBub2RlLl9hc3Rhcl9kYXRhLnByZXYgOjpcbiAgICAgICAgICAgICAgICBwYXRoLnB1c2ggQCBub2RlLl9hc3Rhcl9kYXRhLnByZXZcbiAgICAgICAgICAgICAgICB0cmFjZSBAIG5vZGUuX2FzdGFyX2RhdGEucHJldlxuICAgICAgICB0cmFjZSBAIGdvYWxcbiAgICAgICAgcGF0aC5yZXZlcnNlKClcbiAgICAgICAgcmV0dXJuIHBhdGgubWFwIEAgKCBub2RlICkgPT4gOjpcbiAgICAgICAgICAgIGRlbGV0ZSBub2RlLl9hc3Rhcl9kYXRhXG4gICAgICAgICAgICByZXR1cm4gbm9kZVxuXG5cbm1vZHVsZS5leHBvcnRzID0gQVN0YXJcbiJdfQ==