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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2NvZGUvcGxhbm5lci5qc3kiXSwibmFtZXMiOlsiQVN0YXIiLCJyZXF1aXJlIiwiSGVhcCIsIkdPQVAiLCJhZ2VudCIsImdvYWwiLCJnZXRHb2FsIiwiZmluYWxBY3Rpb25zIiwiY29uc29sZSIsImxvZyIsImFjdGlvbnMiLCJmb3JFYWNoIiwiYWN0aW9uIiwic2F0aXNmaWVzIiwicHVzaCIsImxlbmd0aCIsImhldXJGbiIsIm5vZGUiLCJyb290IiwiZ29hbEZuIiwic3RhdGVTYXRpc2ZpZXMiLCJzdWNjRm4iLCJjaGFpbiIsImNvc3RGbiIsImNvc3QiLCJwbGFubmVyIiwicGF0aCIsImZpbmQiLCJwb3AiLCJyZXZlcnNlIiwiQWdlbnQiLCJnb2FscyIsInN0YXRlIiwicGVlayIsImFuQWN0aW9uIiwiZmlsdGVyIiwiZWEiLCJhbkludGVybWVkaWF0ZVN0YXRlIiwidGFyZ2V0U3RhdGUiLCJjb25kaXRpb25zIiwidHNLZXkiLCJ0c1ZhbHVlIiwiZm9ybXVsYXRlIiwiSW50ZXJtZWRpYXRlU3RhdGUiLCJrZXkiLCJFcnJvciIsIkFjdGlvbiIsImVmZmVjdHMiLCJlS2V5IiwiZVZhbCIsInNLZXkiLCJzVmFsIiwiT2JqZWN0IiwiYXNzaWduIiwiR29hbCIsInByaW9yaXR5IiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLElBQU1BLFFBQVFDLFFBQVUsa0JBQVYsQ0FBZDtBQUNBLElBQU1DLE9BQU9ELFFBQVUsaUJBQVYsQ0FBYjtJQUdNRSxJO0FBQ0Ysa0JBQWFDLEtBQWIsRUFBcUI7QUFBQTs7QUFDakIsYUFBS0EsS0FBTCxHQUFhQSxLQUFiO0FBQWtCOzs7O29DQUVWO0FBQUE7O0FBQ1IsZ0JBQUlDLE9BQU8sS0FBS0QsS0FBTCxDQUFXRSxPQUFYLEVBQVg7O0FBRUEsZ0JBQUcsT0FBT0QsSUFBUCxLQUFnQixXQUFuQixFQUFpQztBQUFDLHVCQUFPLEVBQVA7QUFBUzs7QUFFM0MsZ0JBQUlFLGVBQWUsRUFBbkI7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Q0FFUmUsbUIsRUFBc0I7QUFDN0IsZ0JBQUlMLFFBQVFLLG9CQUFvQkUsVUFBaEM7O0FBRUEsaUJBQUksSUFBSVMsSUFBUixJQUFnQixLQUFLRCxPQUFyQixFQUErQjtBQUMzQixvQkFBSUUsT0FBTyxLQUFLRixPQUFMLENBQWFDLElBQWIsQ0FBWDs7QUFFQSxxQkFBSSxJQUFJRSxJQUFSLElBQWdCbEIsS0FBaEIsRUFBd0I7QUFDcEIsd0JBQUltQixPQUFPbkIsTUFBTWtCLElBQU4sQ0FBWDs7QUFFQSx3QkFBR0YsUUFBUUUsSUFBUixJQUFnQkQsUUFBUUUsSUFBM0IsRUFBa0M7QUFBQywrQkFBTyxJQUFQO0FBQVc7QUFBQTtBQUFBOztBQUV0RCxtQkFBTyxLQUFQO0FBQVk7OztnQ0FFUjtBQUFHLG1CQUFPQyxPQUFPQyxNQUFQLENBQWdCLElBQUlQLE1BQUosRUFBaEIsRUFBOEIsSUFBOUIsQ0FBUDtBQUF5Qzs7OztFQXBCbkNILGlCOztJQXVCZlcsSTs7O0FBQ0Ysa0JBQWFWLEdBQWIsRUFBOEM7QUFBQSxZQUE1QkwsVUFBNEIsdUVBQWpCLEVBQWlCO0FBQUEsWUFBYmdCLFFBQWEsdUVBQUosQ0FBSTs7QUFBQTs7QUFBQSxpSEFDbENYLEdBRGtDLEVBQzdCTCxVQUQ2Qjs7QUFFMUMsZUFBS2dCLFFBQUwsR0FBZ0JBLFFBQWhCLENBRjBDO0FBRWxCOzs7O2dDQUVwQjtBQUFHLG1CQUFPSCxPQUFPQyxNQUFQLENBQWdCLElBQUlDLElBQUosRUFBaEIsRUFBNEIsSUFBNUIsQ0FBUDtBQUF1Qzs7OztFQUxuQ1gsaUI7O0FBUW5CYSxPQUFPQyxPQUFQLEdBQWlCO0FBQ2J0RCxVQUFNQSxJQURPO0FBRVgyQixXQUFPQSxLQUZJO0FBR1hnQixZQUFRQSxNQUhHO0FBSVhRLFVBQU1BLElBSkssRUFBakIiLCJmaWxlIjoicGxhbm5lci5qcyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IEFTdGFyID0gcmVxdWlyZSBAICcuLi9kaXN0L2FzdGFyLmpzJ1xuY29uc3QgSGVhcCA9IHJlcXVpcmUgQCAnLi4vZGlzdC9oZWFwLmpzJ1xuXG5cbmNsYXNzIEdPQVAgOjpcbiAgICBjb25zdHJ1Y3RvciggYWdlbnQgKSA6OlxuICAgICAgICB0aGlzLmFnZW50ID0gYWdlbnRcblxuICAgIGZvcm11bGF0ZSgpIDo6XG4gICAgICAgIGxldCBnb2FsID0gdGhpcy5hZ2VudC5nZXRHb2FsKClcblxuICAgICAgICBpZiB0eXBlb2YgZ29hbCA9PT0gJ3VuZGVmaW5lZCcgOjogcmV0dXJuIFtdXG5cbiAgICAgICAgbGV0IGZpbmFsQWN0aW9ucyA9IFtdXG5cbiAgICAgICAgY29uc29sZS5sb2cgQCAnRm9ybXVsYXRpbmcgcGxhbiBmb3IgJyArIGdvYWxcblxuICAgICAgICAvLyBUT0RPIGFsbG93IGZvciBjb21wb3NpdGUgb2YgYWN0aW9ucyB0byBhY2NvbXBsaXNoIGdvYWxcbiAgICAgICAgdGhpcy5hZ2VudC5hY3Rpb25zLmZvckVhY2ggQCAoIGFjdGlvbiApID0+IDo6XG4gICAgICAgICAgICBpZiBhY3Rpb24uc2F0aXNmaWVzIEAgZ29hbCA6OiBmaW5hbEFjdGlvbnMucHVzaCBAIGFjdGlvblxuXG4gICAgICAgIGlmIGZpbmFsQWN0aW9ucy5sZW5ndGggPT09IDAgOjogcmV0dXJuIFtdXG5cbiAgICAgICAgbGV0IGhldXJGbiA9ICggbm9kZSwgcm9vdCApID0+IDBcbiAgICAgICAgbGV0IGdvYWxGbiA9IG5vZGUgPT4gdGhpcy5hZ2VudC5zdGF0ZVNhdGlzZmllcyBAIG5vZGVcbiAgICAgICAgbGV0IHN1Y2NGbiA9IG5vZGUgPT4gbm9kZS5jaGFpblxuICAgICAgICBsZXQgY29zdEZuID0gbm9kZSA9PiBub2RlLmNvc3RcblxuICAgICAgICBjb25zb2xlLmxvZyBAICdTdGFydGluZyBzZWFyY2ggd2l0aCBhY3Rpb24gJyArIGZpbmFsQWN0aW9uc1swXVxuXG4gICAgICAgIGxldCBwbGFubmVyID0gbmV3IEFTdGFyIEAgaGV1ckZuLCBnb2FsRm4sIHN1Y2NGbiwgY29zdEZuXG4gICAgICAgIGxldCBwYXRoID0gcGxhbm5lci5maW5kIEAgZmluYWxBY3Rpb25zLnBvcCgpXG4gICAgICAgIHBhdGgucmV2ZXJzZSgpXG5cbiAgICAgICAgaWYgcGF0aC5sZW5ndGggPT09IDAgOjpcbiAgICAgICAgICAgIGNvbnNvbGUubG9nIEAgJ05vIHBsYW4gZm91bmQhJ1xuICAgICAgICBlbHNlIDo6XG4gICAgICAgICAgICBjb25zb2xlLmxvZyBAICdQbGFuOidcbiAgICAgICAgICAgIHBhdGguZm9yRWFjaCBAIGFjdGlvbiA9PiBjb25zb2xlLmxvZyBAICdcXHQnICsgYWN0aW9uXG5cbiAgICAgICAgcmV0dXJuIDo6IGdvYWwsIHBhdGggXG5cblxuY2xhc3MgQWdlbnQgOjpcbiAgICBjb25zdHJ1Y3RvcigpIDo6XG4gICAgICAgIHRoaXMucGxhbm5lciA9IG5ldyBHT0FQIEAgdGhpc1xuICAgICAgICB0aGlzLmdvYWxzID0gbmV3IEhlYXAoKVxuICAgICAgICB0aGlzLmFjdGlvbnMgPSBbXVxuICAgICAgICB0aGlzLnN0YXRlID0ge31cblxuICAgIGdldEdvYWwoKSA6OiByZXR1cm4gdGhpcy5nb2Fscy5wZWVrKClcblxuICAgIGFkZEFjdGlvbiggYW5BY3Rpb24gKSA6OlxuICAgICAgICB0aGlzLmFjdGlvbnMuZm9yRWFjaCBAIGFjdGlvbiA9PiA6OlxuICAgICAgICAgICAgaWYgYW5BY3Rpb24uc2F0aXNmaWVzIEAgYWN0aW9uIDo6IGFjdGlvbi5jaGFpbi5wdXNoIEAgYW5BY3Rpb25cbiAgICAgICAgICAgIGlmIGFjdGlvbi5zYXRpc2ZpZXMgQCBhbkFjdGlvbiA6OiBhbkFjdGlvbi5jaGFpbi5wdXNoIEAgYWN0aW9uXG5cbiAgICAgICAgdGhpcy5hY3Rpb25zLnB1c2ggQCBhbkFjdGlvblxuXG4gICAgICAgIHJldHVybiBhbkFjdGlvblxuXG4gICAgcmVtb3ZlQWN0aW9uKCBhbkFjdGlvbiApIDo6XG4gICAgICAgIHRoaXMuYWN0aW9ucyA9IHRoaXMuYWN0aW9ucy5maWx0ZXIgQCBlYSA9PiBhbkFjdGlvbiAhPT0gZWFcbiAgICAgICAgdGhpcy5hY3Rpb25zLmZvckVhY2ggQCBhY3Rpb24gPT4gOjogYWN0aW9uLmNoYWluID0gYWN0aW9uLmNoYWluLmZpbHRlciBAIGVhID0+IGFuQWN0aW9uICE9PSBlYVxuXG4gICAgICAgIHJldHVybiBhbkFjdGlvblxuXG4gICAgc3RhdGVTYXRpc2ZpZXMoIGFuSW50ZXJtZWRpYXRlU3RhdGUgKSA6OlxuICAgICAgICBsZXQgdGFyZ2V0U3RhdGUgPSBhbkludGVybWVkaWF0ZVN0YXRlLmNvbmRpdGlvbnNcblxuICAgICAgICBmb3IgbGV0IHRzS2V5IGluIHRhcmdldFN0YXRlIDo6XG4gICAgICAgICAgICBsZXQgdHNWYWx1ZSA9IHRhcmdldFN0YXRlW3RzS2V5XVxuXG4gICAgICAgICAgICBpZiB0aGlzLnN0YXRlW3RzS2V5XSAhPSB0c1ZhbHVlIDo6IHJldHVybiBmYWxzZVxuXG4gICAgICAgIHJldHVybiB0cnVlXG5cbiAgICBnZXRQbGFuKCkgOjogcmV0dXJuIHRoaXMucGxhbm5lci5mb3JtdWxhdGUoKVxuICAgICAgICBcblxuXG5jbGFzcyBJbnRlcm1lZGlhdGVTdGF0ZSA6OlxuICAgIGNvbnN0cnVjdG9yKCBrZXksIGNvbmRpdGlvbnM9e30gKSA6OlxuICAgICAgICB0aGlzLmtleSA9IGtleVxuICAgICAgICB0aGlzLmNvbmRpdGlvbnMgPSBjb25kaXRpb25zXG5cbiAgICB0b1N0cmluZygpIDo6IHJldHVybiB0aGlzLmtleVxuXG4gICAgc2F0aXNmaWVzKCBhbkludGVybWVkaWF0ZVN0YXRlICkgOjogcmV0dXJuIG5ldyBFcnJvciBAICdBbiBJbnRlcm1lZGlhdGVTdGF0ZSBtdXN0IGltcGxlbWVudCBAc2F0aXNmaWVzKCBhbkludGVybWVkaWF0ZVN0YXRlICkuJ1xuXG4gICAgY2xvbmUoKSA6OiByZXR1cm4gbmV3IEVycm9yIEAgJ0FuIEludGVybWVkaWF0ZVN0YXRlIG11c3QgaW1wbGVtZW50IEBjbG9uZSgpLidcblxuXG5jbGFzcyBBY3Rpb24gZXh0ZW5kcyBJbnRlcm1lZGlhdGVTdGF0ZSA6OlxuICAgIGNvbnN0cnVjdG9yKCBrZXksIGNvbmRpdGlvbnM9e30sIGVmZmVjdHM9e30sIGNvc3Q9MCApIDo6XG4gICAgICAgIHN1cGVyIEAga2V5LCBjb25kaXRpb25zXG4gICAgICAgIHRoaXMuZWZmZWN0cyA9IGVmZmVjdHNcbiAgICAgICAgdGhpcy5jb3N0ID0gY29zdFxuICAgICAgICB0aGlzLmNoYWluID0gW11cblxuICAgIHNhdGlzZmllcyggYW5JbnRlcm1lZGlhdGVTdGF0ZSApIDo6XG4gICAgICAgIGxldCBzdGF0ZSA9IGFuSW50ZXJtZWRpYXRlU3RhdGUuY29uZGl0aW9uc1xuICAgICAgICBcbiAgICAgICAgZm9yIGxldCBlS2V5IGluIHRoaXMuZWZmZWN0cyA6OlxuICAgICAgICAgICAgbGV0IGVWYWwgPSB0aGlzLmVmZmVjdHNbZUtleV1cblxuICAgICAgICAgICAgZm9yIGxldCBzS2V5IGluIHN0YXRlIDo6XG4gICAgICAgICAgICAgICAgbGV0IHNWYWwgPSBzdGF0ZVtzS2V5XVxuXG4gICAgICAgICAgICAgICAgaWYgZUtleSA9PSBzS2V5ICYmIGVWYWwgPT0gc1ZhbCA6OiByZXR1cm4gdHJ1ZVxuXG4gICAgICAgIHJldHVybiBmYWxzZVxuXG4gICAgY2xvbmUoKSA6OiByZXR1cm4gT2JqZWN0LmFzc2lnbiBAIG5ldyBBY3Rpb24oKSwgdGhpc1xuXG5cbmNsYXNzIEdvYWwgZXh0ZW5kcyBJbnRlcm1lZGlhdGVTdGF0ZSA6OlxuICAgIGNvbnN0cnVjdG9yKCBrZXksIGNvbmRpdGlvbnM9e30sIHByaW9yaXR5PTAgKSA6OlxuICAgICAgICBzdXBlciBAIGtleSwgY29uZGl0aW9uc1xuICAgICAgICB0aGlzLnByaW9yaXR5ID0gcHJpb3JpdHlcblxuICAgIGNsb25lKCkgOjogcmV0dXJuIE9iamVjdC5hc3NpZ24gQCBuZXcgR29hbCgpLCB0aGlzXG5cblxubW9kdWxlLmV4cG9ydHMgPSA6OlxuICAgIEdPQVA6IEdPQVBcbiAgICAsIEFnZW50OiBBZ2VudFxuICAgICwgQWN0aW9uOiBBY3Rpb25cbiAgICAsIEdvYWw6IEdvYWxcbiJdfQ==