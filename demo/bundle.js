(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.Planner = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

},{"../dist/heap.js":2}],2:[function(require,module,exports){
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

},{}],3:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AStar = require('../dist/astar.js');
var Heap = require('../dist/heap.js');
var GOAP = function () {
    function GOAP(agent) {
        _classCallCheck(this, GOAP);

        this.agent = agent;
    }

    _createClass(GOAP, [{
        key: 'formulate',
        value: function formulate() {
            var _this = this;

            var goal = this.agent.getGoal();

            if (typeof goal === 'undefined') {
                return [];
            }

            var finalActions = [];

            console.log('Formulating plan for ' + goal);

            // TODO allow for composite of actions to accomplish goal
            this.agent.actions.forEach(function (action) {
                if (action.satisfies(goal)) {
                    finalActions.push(action);
                }
            });

            if (finalActions.length === 0) {
                return [];
            }

            var heurFn = function heurFn(node, root) {
                return 0;
            };
            var goalFn = function goalFn(node) {
                return _this.agent.stateSatisfies(node);
            };
            var succFn = function succFn(node) {
                return node.chain;
            };
            var costFn = function costFn(node) {
                return node.cost;
            };

            console.log('Starting search with action ' + finalActions[0]);

            var planner = new AStar(heurFn, goalFn, succFn, costFn);
            var path = planner.find(finalActions.pop());
            path.reverse();

            if (path.length === 0) {
                console.log('No plan found!');
            } else {
                console.log('Plan:');
                path.forEach(function (action) {
                    return console.log('\t' + action);
                });
            }

            return { goal: goal, path: path };
        }
    }]);

    return GOAP;
}();

var Agent = function () {
    function Agent() {
        _classCallCheck(this, Agent);

        this.planner = new GOAP(this);
        this.goals = new Heap();
        this.actions = [];
        this.state = {};
    }

    _createClass(Agent, [{
        key: 'getGoal',
        value: function getGoal() {
            return this.goals.peek();
        }
    }, {
        key: 'addAction',
        value: function addAction(anAction) {
            this.actions.forEach(function (action) {
                if (anAction.satisfies(action)) {
                    action.chain.push(anAction);
                }
                if (action.satisfies(anAction)) {
                    anAction.chain.push(action);
                }
            });

            this.actions.push(anAction);

            return anAction;
        }
    }, {
        key: 'removeAction',
        value: function removeAction(anAction) {
            this.actions = this.actions.filter(function (ea) {
                return anAction !== ea;
            });
            this.actions.forEach(function (action) {
                action.chain = action.chain.filter(function (ea) {
                    return anAction !== ea;
                });
            });

            return anAction;
        }
    }, {
        key: 'stateSatisfies',
        value: function stateSatisfies(anIntermediateState) {
            var targetState = anIntermediateState.conditions;

            for (var tsKey in targetState) {
                var tsValue = targetState[tsKey];

                if (this.state[tsKey] != tsValue) {
                    return false;
                }
            }

            return true;
        }
    }, {
        key: 'getPlan',
        value: function getPlan() {
            return this.planner.formulate();
        }
    }]);

    return Agent;
}();

var IntermediateState = function () {
    function IntermediateState(key) {
        var conditions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        _classCallCheck(this, IntermediateState);

        this.key = key;
        this.conditions = conditions;
    }

    _createClass(IntermediateState, [{
        key: 'toString',
        value: function toString() {
            return this.key;
        }
    }, {
        key: 'satisfies',
        value: function satisfies(anIntermediateState) {
            return new Error('An IntermediateState must implement @satisfies( anIntermediateState ).');
        }
    }, {
        key: 'clone',
        value: function clone() {
            return new Error('An IntermediateState must implement @clone().');
        }
    }]);

    return IntermediateState;
}();

var Action = function (_IntermediateState) {
    _inherits(Action, _IntermediateState);

    function Action(key) {
        var conditions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        var effects = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
        var cost = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;

        _classCallCheck(this, Action);

        var _this2 = _possibleConstructorReturn(this, (Action.__proto__ || Object.getPrototypeOf(Action)).call(this, key, conditions));

        _this2.effects = effects;
        _this2.cost = cost;
        _this2.chain = [];return _this2;
    }

    _createClass(Action, [{
        key: 'satisfies',
        value: function satisfies(anIntermediateState) {
            var state = anIntermediateState.conditions;

            for (var eKey in this.effects) {
                var eVal = this.effects[eKey];

                for (var sKey in state) {
                    var sVal = state[sKey];

                    if (eKey == sKey && eVal == sVal) {
                        return true;
                    }
                }
            }

            return false;
        }
    }, {
        key: 'clone',
        value: function clone() {
            return Object.assign(new Action(), this);
        }
    }]);

    return Action;
}(IntermediateState);

var Goal = function (_IntermediateState2) {
    _inherits(Goal, _IntermediateState2);

    function Goal(key) {
        var conditions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        var priority = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

        _classCallCheck(this, Goal);

        var _this3 = _possibleConstructorReturn(this, (Goal.__proto__ || Object.getPrototypeOf(Goal)).call(this, key, conditions));

        _this3.priority = priority;return _this3;
    }

    _createClass(Goal, [{
        key: 'clone',
        value: function clone() {
            return Object.assign(new Goal(), this);
        }
    }]);

    return Goal;
}(IntermediateState);

module.exports = {
    GOAP: GOAP,
    Agent: Agent,
    Action: Action,
    Goal: Goal };

},{"../dist/astar.js":1,"../dist/heap.js":2}]},{},[3])(3)
});