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

            return path;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2NvZGUvcGxhbm5lci5qc3kiXSwibmFtZXMiOlsiQVN0YXIiLCJyZXF1aXJlIiwiSGVhcCIsIkdPQVAiLCJhZ2VudCIsImdvYWwiLCJnZXRHb2FsIiwiZmluYWxBY3Rpb25zIiwiY29uc29sZSIsImxvZyIsImFjdGlvbnMiLCJmb3JFYWNoIiwiYWN0aW9uIiwic2F0aXNmaWVzIiwicHVzaCIsImxlbmd0aCIsImhldXJGbiIsIm5vZGUiLCJyb290IiwiZ29hbEZuIiwic3RhdGVTYXRpc2ZpZXMiLCJzdWNjRm4iLCJjaGFpbiIsImNvc3RGbiIsImNvc3QiLCJwbGFubmVyIiwicGF0aCIsImZpbmQiLCJwb3AiLCJyZXZlcnNlIiwiQWdlbnQiLCJnb2FscyIsInN0YXRlIiwicGVlayIsImFuQWN0aW9uIiwiZmlsdGVyIiwiZWEiLCJhbkludGVybWVkaWF0ZVN0YXRlIiwidGFyZ2V0U3RhdGUiLCJjb25kaXRpb25zIiwidHNLZXkiLCJ0c1ZhbHVlIiwiZm9ybXVsYXRlIiwiSW50ZXJtZWRpYXRlU3RhdGUiLCJrZXkiLCJFcnJvciIsIkFjdGlvbiIsImVmZmVjdHMiLCJlS2V5IiwiZVZhbCIsInNLZXkiLCJzVmFsIiwiT2JqZWN0IiwiYXNzaWduIiwiR29hbCIsInByaW9yaXR5IiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLElBQU1BLFFBQVFDLFFBQVUsa0JBQVYsQ0FBZDtBQUNBLElBQU1DLE9BQU9ELFFBQVUsaUJBQVYsQ0FBYjtJQUdNRSxJO0FBQ0Ysa0JBQWFDLEtBQWIsRUFBcUI7QUFBQTs7QUFDakIsYUFBS0EsS0FBTCxHQUFhQSxLQUFiO0FBQWtCOzs7O29DQUVWO0FBQUE7O0FBQ1IsZ0JBQUlDLE9BQU8sS0FBS0QsS0FBTCxDQUFXRSxPQUFYLEVBQVg7QUFDQSxnQkFBSUMsZUFBZSxFQUFuQjs7QUFFQUMsb0JBQVFDLEdBQVIsQ0FBYywwQkFBMEJKLElBQXhDOztBQUVBO0FBQ0EsaUJBQUtELEtBQUwsQ0FB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LEVBQStCO0FBQzNCLG9CQUFJRSxPQUFPLEtBQUtGLE9BQUwsQ0FBYUMsSUFBYixDQUFYOztBQUVBLHFCQUFJLElBQUlFLElBQVIsSUFBZ0JsQixLQUFoQixFQUF3QjtBQUNwQix3QkFBSW1CLE9BQU9uQixNQUFNa0IsSUFBTixDQUFYOztBQUVBLHdCQUFHRixRQUFRRSxJQUFSLElBQWdCRCxRQUFRRSxJQUEzQixFQUFrQztBQUFDLCtCQUFPLElBQVA7QUFBVztBQUFBO0FBQUE7O0FBRXRELG1CQUFPLEtBQVA7QUFBWTs7O2dDQUVSO0FBQUcsbUJBQU9DLE9BQU9DLE1BQVAsQ0FBZ0IsSUFBSVAsTUFBSixFQUFoQixFQUE4QixJQUE5QixDQUFQO0FBQXlDOzs7O0VBcEJuQ0gsaUI7O0lBdUJmVyxJOzs7QUFDRixrQkFBYVYsR0FBYixFQUE4QztBQUFBLFlBQTVCTCxVQUE0Qix1RUFBakIsRUFBaUI7QUFBQSxZQUFiZ0IsUUFBYSx1RUFBSixDQUFJOztBQUFBOztBQUFBLGlIQUNsQ1gsR0FEa0MsRUFDN0JMLFVBRDZCOztBQUUxQyxlQUFLZ0IsUUFBTCxHQUFnQkEsUUFBaEIsQ0FGMEM7QUFFbEI7Ozs7Z0NBRXBCO0FBQUcsbUJBQU9ILE9BQU9DLE1BQVAsQ0FBZ0IsSUFBSUMsSUFBSixFQUFoQixFQUE0QixJQUE1QixDQUFQO0FBQXVDOzs7O0VBTG5DWCxpQjs7QUFRbkJhLE9BQU9DLE9BQVAsR0FBaUI7QUFDYnRELFVBQU1BLElBRE87QUFFWDJCLFdBQU9BLEtBRkk7QUFHWGdCLFlBQVFBLE1BSEc7QUFJWFEsVUFBTUEsSUFKSyxFQUFqQiIsImZpbGUiOiJwbGFubmVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgQVN0YXIgPSByZXF1aXJlIEAgJy4uL2Rpc3QvYXN0YXIuanMnXG5jb25zdCBIZWFwID0gcmVxdWlyZSBAICcuLi9kaXN0L2hlYXAuanMnXG5cblxuY2xhc3MgR09BUCA6OlxuICAgIGNvbnN0cnVjdG9yKCBhZ2VudCApIDo6XG4gICAgICAgIHRoaXMuYWdlbnQgPSBhZ2VudFxuXG4gICAgZm9ybXVsYXRlKCkgOjpcbiAgICAgICAgbGV0IGdvYWwgPSB0aGlzLmFnZW50LmdldEdvYWwoKVxuICAgICAgICBsZXQgZmluYWxBY3Rpb25zID0gW11cblxuICAgICAgICBjb25zb2xlLmxvZyBAICdGb3JtdWxhdGluZyBwbGFuIGZvciAnICsgZ29hbFxuXG4gICAgICAgIC8vIFRPRE8gYWxsb3cgZm9yIGNvbXBvc2l0ZSBvZiBhY3Rpb25zIHRvIGFjY29tcGxpc2ggZ29hbFxuICAgICAgICB0aGlzLmFnZW50LmFjdGlvbnMuZm9yRWFjaCBAICggYWN0aW9uICkgPT4gOjpcbiAgICAgICAgICAgIGlmIGFjdGlvbi5zYXRpc2ZpZXMgQCBnb2FsIDo6IGZpbmFsQWN0aW9ucy5wdXNoIEAgYWN0aW9uXG5cbiAgICAgICAgaWYgZmluYWxBY3Rpb25zLmxlbmd0aCA9PT0gMCA6OiByZXR1cm4gW11cblxuICAgICAgICBsZXQgaGV1ckZuID0gKCBub2RlLCByb290ICkgPT4gMFxuICAgICAgICBsZXQgZ29hbEZuID0gbm9kZSA9PiB0aGlzLmFnZW50LnN0YXRlU2F0aXNmaWVzIEAgbm9kZVxuICAgICAgICBsZXQgc3VjY0ZuID0gbm9kZSA9PiBub2RlLmNoYWluXG4gICAgICAgIGxldCBjb3N0Rm4gPSBub2RlID0+IG5vZGUuY29zdFxuXG4gICAgICAgIGNvbnNvbGUubG9nIEAgJ1N0YXJ0aW5nIHNlYXJjaCB3aXRoIGFjdGlvbiAnICsgZmluYWxBY3Rpb25zWzBdXG5cbiAgICAgICAgbGV0IHBsYW5uZXIgPSBuZXcgQVN0YXIgQCBoZXVyRm4sIGdvYWxGbiwgc3VjY0ZuLCBjb3N0Rm5cbiAgICAgICAgbGV0IHBhdGggPSBwbGFubmVyLmZpbmQgQCBmaW5hbEFjdGlvbnMucG9wKClcbiAgICAgICAgcGF0aC5yZXZlcnNlKClcblxuICAgICAgICBpZiBwYXRoLmxlbmd0aCA9PT0gMCA6OlxuICAgICAgICAgICAgY29uc29sZS5sb2cgQCAnTm8gcGxhbiBmb3VuZCEnXG4gICAgICAgIGVsc2UgOjpcbiAgICAgICAgICAgIGNvbnNvbGUubG9nIEAgJ1BsYW46J1xuICAgICAgICAgICAgcGF0aC5mb3JFYWNoIEAgYWN0aW9uID0+IGNvbnNvbGUubG9nIEAgJ1xcdCcgKyBhY3Rpb25cblxuICAgICAgICByZXR1cm4gcGF0aFxuXG5cbmNsYXNzIEFnZW50IDo6XG4gICAgY29uc3RydWN0b3IoKSA6OlxuICAgICAgICB0aGlzLnBsYW5uZXIgPSBuZXcgR09BUCBAIHRoaXNcbiAgICAgICAgdGhpcy5nb2FscyA9IG5ldyBIZWFwKClcbiAgICAgICAgdGhpcy5hY3Rpb25zID0gW11cbiAgICAgICAgdGhpcy5zdGF0ZSA9IHt9XG5cbiAgICBnZXRHb2FsKCkgOjogcmV0dXJuIHRoaXMuZ29hbHMucGVlaygpXG5cbiAgICBhZGRBY3Rpb24oIGFuQWN0aW9uICkgOjpcbiAgICAgICAgdGhpcy5hY3Rpb25zLmZvckVhY2ggQCBhY3Rpb24gPT4gOjpcbiAgICAgICAgICAgIGlmIGFuQWN0aW9uLnNhdGlzZmllcyBAIGFjdGlvbiA6OiBhY3Rpb24uY2hhaW4ucHVzaCBAIGFuQWN0aW9uXG4gICAgICAgICAgICBpZiBhY3Rpb24uc2F0aXNmaWVzIEAgYW5BY3Rpb24gOjogYW5BY3Rpb24uY2hhaW4ucHVzaCBAIGFjdGlvblxuXG4gICAgICAgIHRoaXMuYWN0aW9ucy5wdXNoIEAgYW5BY3Rpb25cblxuICAgICAgICByZXR1cm4gYW5BY3Rpb25cblxuICAgIHJlbW92ZUFjdGlvbiggYW5BY3Rpb24gKSA6OlxuICAgICAgICB0aGlzLmFjdGlvbnMgPSB0aGlzLmFjdGlvbnMuZmlsdGVyIEAgZWEgPT4gYW5BY3Rpb24gIT09IGVhXG4gICAgICAgIHRoaXMuYWN0aW9ucy5mb3JFYWNoIEAgYWN0aW9uID0+IDo6IGFjdGlvbi5jaGFpbiA9IGFjdGlvbi5jaGFpbi5maWx0ZXIgQCBlYSA9PiBhbkFjdGlvbiAhPT0gZWFcblxuICAgICAgICByZXR1cm4gYW5BY3Rpb25cblxuICAgIHN0YXRlU2F0aXNmaWVzKCBhbkludGVybWVkaWF0ZVN0YXRlICkgOjpcbiAgICAgICAgbGV0IHRhcmdldFN0YXRlID0gYW5JbnRlcm1lZGlhdGVTdGF0ZS5jb25kaXRpb25zXG5cbiAgICAgICAgZm9yIGxldCB0c0tleSBpbiB0YXJnZXRTdGF0ZSA6OlxuICAgICAgICAgICAgbGV0IHRzVmFsdWUgPSB0YXJnZXRTdGF0ZVt0c0tleV1cblxuICAgICAgICAgICAgaWYgdGhpcy5zdGF0ZVt0c0tleV0gIT0gdHNWYWx1ZSA6OiByZXR1cm4gZmFsc2VcblxuICAgICAgICByZXR1cm4gdHJ1ZVxuXG4gICAgZ2V0UGxhbigpIDo6IHJldHVybiB0aGlzLnBsYW5uZXIuZm9ybXVsYXRlKClcbiAgICAgICAgXG5cblxuY2xhc3MgSW50ZXJtZWRpYXRlU3RhdGUgOjpcbiAgICBjb25zdHJ1Y3Rvcigga2V5LCBjb25kaXRpb25zPXt9ICkgOjpcbiAgICAgICAgdGhpcy5rZXkgPSBrZXlcbiAgICAgICAgdGhpcy5jb25kaXRpb25zID0gY29uZGl0aW9uc1xuXG4gICAgdG9TdHJpbmcoKSA6OiByZXR1cm4gdGhpcy5rZXlcblxuICAgIHNhdGlzZmllcyggYW5JbnRlcm1lZGlhdGVTdGF0ZSApIDo6IHJldHVybiBuZXcgRXJyb3IgQCAnQW4gSW50ZXJtZWRpYXRlU3RhdGUgbXVzdCBpbXBsZW1lbnQgQHNhdGlzZmllcyggYW5JbnRlcm1lZGlhdGVTdGF0ZSApLidcblxuICAgIGNsb25lKCkgOjogcmV0dXJuIG5ldyBFcnJvciBAICdBbiBJbnRlcm1lZGlhdGVTdGF0ZSBtdXN0IGltcGxlbWVudCBAY2xvbmUoKS4nXG5cblxuY2xhc3MgQWN0aW9uIGV4dGVuZHMgSW50ZXJtZWRpYXRlU3RhdGUgOjpcbiAgICBjb25zdHJ1Y3Rvcigga2V5LCBjb25kaXRpb25zPXt9LCBlZmZlY3RzPXt9LCBjb3N0PTAgKSA6OlxuICAgICAgICBzdXBlciBAIGtleSwgY29uZGl0aW9uc1xuICAgICAgICB0aGlzLmVmZmVjdHMgPSBlZmZlY3RzXG4gICAgICAgIHRoaXMuY29zdCA9IGNvc3RcbiAgICAgICAgdGhpcy5jaGFpbiA9IFtdXG5cbiAgICBzYXRpc2ZpZXMoIGFuSW50ZXJtZWRpYXRlU3RhdGUgKSA6OlxuICAgICAgICBsZXQgc3RhdGUgPSBhbkludGVybWVkaWF0ZVN0YXRlLmNvbmRpdGlvbnNcbiAgICAgICAgXG4gICAgICAgIGZvciBsZXQgZUtleSBpbiB0aGlzLmVmZmVjdHMgOjpcbiAgICAgICAgICAgIGxldCBlVmFsID0gdGhpcy5lZmZlY3RzW2VLZXldXG5cbiAgICAgICAgICAgIGZvciBsZXQgc0tleSBpbiBzdGF0ZSA6OlxuICAgICAgICAgICAgICAgIGxldCBzVmFsID0gc3RhdGVbc0tleV1cblxuICAgICAgICAgICAgICAgIGlmIGVLZXkgPT0gc0tleSAmJiBlVmFsID09IHNWYWwgOjogcmV0dXJuIHRydWVcblxuICAgICAgICByZXR1cm4gZmFsc2VcblxuICAgIGNsb25lKCkgOjogcmV0dXJuIE9iamVjdC5hc3NpZ24gQCBuZXcgQWN0aW9uKCksIHRoaXNcblxuXG5jbGFzcyBHb2FsIGV4dGVuZHMgSW50ZXJtZWRpYXRlU3RhdGUgOjpcbiAgICBjb25zdHJ1Y3Rvcigga2V5LCBjb25kaXRpb25zPXt9LCBwcmlvcml0eT0wICkgOjpcbiAgICAgICAgc3VwZXIgQCBrZXksIGNvbmRpdGlvbnNcbiAgICAgICAgdGhpcy5wcmlvcml0eSA9IHByaW9yaXR5XG5cbiAgICBjbG9uZSgpIDo6IHJldHVybiBPYmplY3QuYXNzaWduIEAgbmV3IEdvYWwoKSwgdGhpc1xuXG5cbm1vZHVsZS5leHBvcnRzID0gOjpcbiAgICBHT0FQOiBHT0FQXG4gICAgLCBBZ2VudDogQWdlbnRcbiAgICAsIEFjdGlvbjogQWN0aW9uXG4gICAgLCBHb2FsOiBHb2FsXG4iXX0=